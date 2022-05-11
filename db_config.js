const Sequelize = require("sequelize");
const PostModel = require("./model");

const db = new Sequelize('postgres://postgres:1234@localhost:5432/postgres')
const initApp = async () => {
  console.log("Testing the database connection..");
  try {
      await db.authenticate();
      console.log("Connection has been established successfully.");
      PostModel.sync({
        alter: true,
    });
      app.listen(port, () => {
          console.log(`Server is up and running at: http://localhost:${port}`);
      });
  } catch (error) {
      console.error("Unable to connect to the database:", error.original);
  }
};

initApp();
module.exports = db;