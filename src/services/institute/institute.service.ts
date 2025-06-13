import sequelize from "../../config/dbConnection";
import generateRandomInsituteNumber from "../../utils/generateRandomInsituteNumber";

interface IInstitute {
  instituteName: string;
  instituteEmail: string;
  institutePhoneNo: string;
  instituteAddress: string;
  instituteVatNo?: string;
  institutePanNo?: string;
}

const createInstitute = async (data: IInstitute) => {
  const instituteNumber = generateRandomInsituteNumber();
  const tableName = `institute_${instituteNumber}`;

  await sequelize.query(`CREATE TABLE IF NOT EXISTS ${tableName} (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    instituteName VARCHAR(255) NOT NULL,
    instituteEmail VARCHAR(255) NOT NULL UNIQUE,
    institutePhoneNo VARCHAR(255) NOT NULL UNIQUE,
    instituteAddress VARCHAR(255),
    instituteVatNo VARCHAR(255),
    institutePanNo VARCHAR(255),
    createdAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`);

  await sequelize.query(
    `INSERT INTO ${tableName} (instituteName, instituteEmail, institutePhoneNo, instituteAddress, instituteVatNo, institutePanNo) VALUES (?, ?, ?, ?, ?, ?)`,
    {
      replacements: [
        data.instituteName,
        data.instituteEmail,
        data.institutePhoneNo,
        data.instituteAddress,
        data.instituteVatNo || null,
        data.institutePanNo || null,
      ],
    }
  );

  return { tableName };
};

export { createInstitute };
