module.exports = (sequelize, Sequelize) => {
  const News = sequelize.define("news_articles", {
    title: {
      type: Sequelize.TEXT
    },
    description: {
      type: Sequelize.TEXT
    },
    cover: {
      type: Sequelize.TEXT
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return News;
};
