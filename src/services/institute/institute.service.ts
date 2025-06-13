import sequelize from "../../config/dbConnection";

interface IInstitute {
  instituteName: string;
  instituteEmail: string;
  institutePhoneNo: string;
  instituteAddress: string;
  instituteVatNo?: string | null;
  institutePanNo?: string | null;
}

const createInstitute = async (instituteNumber:Number, data: IInstitute) => {

await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber} (
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

  // teacher
  await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber} (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    teacherName VARCHAR(255) NOT NULL,
    teacherEmail VARCHAR(255) NOT NULL UNIQUE,
    teacherPhoneNo VARCHAR(255) NOT NULL UNIQUE,
    teacherAddress VARCHAR(255) NOT NULL UNIQUE,
    createdAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);

  await sequelize.query(
    `INSERT INTO institute_${instituteNumber} (instituteName, instituteEmail, institutePhoneNo, instituteAddress, instituteVatNo, institutePanNo) VALUES (?, ?, ?, ?, ?, ?)`,
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

};

export { createInstitute };
