import sequelize from "../../config/dbConnection";
import { ROLE_INSTITUTE } from "../../constant/role";
import User from "../../models/user.model";

interface IInstitute {
  instituteName: string;
  instituteEmail: string;
  institutePhoneNo: string;
  instituteAddress: string;
  instituteVatNo?: string | null;
  institutePanNo?: string | null;
}

const createInstitute = async (
  instituteNumber: Number,
  data: IInstitute,
  user: any
) => {
  await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber} (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    instituteName VARCHAR(255) NOT NULL,
    instituteEmail VARCHAR(255) NOT NULL UNIQUE,
    institutePhoneNo VARCHAR(255) NOT NULL UNIQUE ,
    instituteAddress VARCHAR(255),
    instituteVatNo VARCHAR(255),
    institutePanNo VARCHAR(255),
    createdAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`);
  // add instituteNumber as instituteCode in user model
  if (user) {
    await User.update(
      { role: ROLE_INSTITUTE,
        instituteCode: instituteNumber },
      { where: { id: user?.id } }
    );
  }

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
