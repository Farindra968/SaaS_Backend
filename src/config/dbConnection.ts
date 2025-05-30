import { Sequelize } from "sequelize";
import envConfig from "./config";

const sequelize = new Sequelize({
    database: envConfig.databaseName,
    username: envConfig.databaseUser,
    password: envConfig.databasePassword,
    host: envConfig.databaseHost,
    port: Number(envConfig.databasePort),
    dialect: "mysql", // or 'postgres', 'sqlite', 'mariadb', 'mssql'
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


  export default sequelize;
// Exporting the sequelize instance for use in other parts of the application
// This instance can be used to define models and interact with the database