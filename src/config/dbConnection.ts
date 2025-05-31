import { Sequelize } from "sequelize-typescript";
import envConfig from "./config";

const sequelize = new Sequelize({
  database: envConfig.databaseName,
  username: envConfig.databaseUser,
  password: envConfig.databasePassword,
  host: envConfig.databaseHost,
  port: Number(envConfig.databasePort),
  dialect: "mysql", // or 'postgres', 'sqlite', 'mariadb', 'mssql'
  models: [__dirname + "/../models"], // Path to your models directory
});

// Database connection configuration
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// migration
sequelize
  .sync({force: false}) // Set force to true to drop and recreate tables, false to keep existing data
  // Use {force: true} only during development or when you want to reset the database
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((error) => {
    console.log("Unable to synchronize the database:", error);
  });

export default sequelize;
// Exporting the sequelize instance for use in other parts of the application
// This instance can be used to define models and interact with the database
