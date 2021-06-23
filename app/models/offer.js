module.exports = (sequelize, Sequelize) => {
    const Offer = sequelize.define("offers", {
        status: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        cost: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        mileage_km: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        mileage_m: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        text: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        is_abs: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_esp: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_traction_control: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_immobilizer: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_side_airbags: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_rear_airbags: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_front_airbags: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_signaling: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_volume_sensor: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_heated_mirrors: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_windshield_heating: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_steering_wheel_heating: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_seat_heating: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_engine_autostart: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_multimedia_steering_wheel_control: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_power_seats: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_rear_power_windows: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_front_power_windows: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_aux_ipod: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_bluetooth: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_cd_mp3: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_usb: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_multimedia_screen: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_native_navigation: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_fog_lights: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_rain_sensor: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_light_sensor: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_control_dead_zones: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_alloy_wheels: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_roof_rails: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
    
        },
        is_hitch: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_warranty: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_carplay: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_androidauto: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_power_socket: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_rear_screens: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_power_steering_wheel: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_electric_control_steering_wheel: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_electric_miror_drive: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_electric_dashboard: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_electric_trunk_drive: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_broken: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_right_hand_drive: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_headlights_washer: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_third_row_of_seats: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_seats_ventilation: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        is_spare_wheel: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    });
    return Offer;
};