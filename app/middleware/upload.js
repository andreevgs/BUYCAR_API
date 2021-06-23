const util = require("util");
const path = require("path");
const multer = require("multer");
const sharp = require('sharp');
const sizeOf = require('image-size');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  const match = ["image/png", "image/jpeg", , "image/jpg"];
  if (match.indexOf(file.mimetype) === -1) {
    cb("Only images can be accepted.", false);
  } else {
    cb(null, true);
  }
}

const resizeAndSaveImages = async (req, res, next) => {
  if (!req.files) return next();

  req.body.images = [];
  await Promise.all(
    req.files.map(async file => {
      const filename = file.originalname.replace(/\..+$/, "");
      const newFilename = `buycar-${filename}-${Date.now()}.jpeg`;
      console.log('image size: ', sizeOf(file.buffer));
      await sharp(file.buffer)
        .resize({
          fit: sharp.fit.contain,
          width: 1800
        })
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`uploads/${newFilename}`);

      req.body.images.push(newFilename);
    })
  );
  // console.log('images resized: ', req.body);
  next();
};

// {
//   destination: (req, file, callback) => {
//     callback(null, path.join(`${__dirname}/../../uploads`));
//   },
//   filename: (req, file, callback) => {
//     const match = ["image/png", "image/jpeg"];

//     if (match.indexOf(file.mimetype) === -1) {
//       var message = `<strong>${file.originalname}</strong> is invalid. Only accept png/jpeg.`;
//       return callback(message, null);
//     }

//     var filename = `${Date.now()}-${file.originalname}`;
//     callback(null, filename);
//   }
// });

let uploadFiles = multer({ storage: multerStorage, limits: {fileSize: 15000000}, fileFilter: multerFilter }).array("files", 20);
let uploadFilesMiddleware = util.promisify(uploadFiles);

const upload = {
  uploadFilesMiddleware: uploadFilesMiddleware,
  resizeAndSaveImages: resizeAndSaveImages
};
module.exports = upload;