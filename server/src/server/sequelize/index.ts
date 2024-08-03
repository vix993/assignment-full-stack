import { Sequelize } from "sequelize-typescript";
import { Buyer } from "../db/Buyer";
import { ProcurementRecord } from "../db/ProcurementRecord";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env["SQLITE_DB"] || "./db.sqlite3",
});

sequelize.addModels([Buyer, ProcurementRecord]);

export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default sequelize;
