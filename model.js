const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("./db_config");

const Post = sequelize.define(
    "app_posts",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subtitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }
);

module.exports = Post;