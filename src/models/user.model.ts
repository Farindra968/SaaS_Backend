import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  PrimaryKey,
  Validate,
} from "sequelize-typescript";
import { PASSWORD_REGEX } from "../constant/regex";
import { ROLE_ADMIN, ROLE_INSTITUTE, ROLE_STUDENT, ROLE_SUPERADMIN, ROLE_TEACHER } from "../constant/role";

@Table({
  tableName: "Users", // Use plural form for table name because it represents a collection of users
  timestamps: true, // Enable timestamps for createdAt and updatedAt fields
  modelName: "User", // Use singular form for model name because it represents a single user
})
class User extends Model {
  @Column({
    primaryKey: true, // Use PrimaryKey to indicate that this column is the primary key
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4, // Automatically generate a UUID for new records
    allowNull: false, // Ensure this field cannot be null
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare userName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true, // Ensure email is unique
    validate: {
      is: /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/
    }
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  declare phoneNumber: string;

  //define instituteCode
  @Column({
    type: DataType.STRING
  })
  declare instituteCode:string[]

  @Column({
    type: DataType.ENUM(ROLE_SUPERADMIN, ROLE_ADMIN, ROLE_INSTITUTE, ROLE_TEACHER, ROLE_STUDENT), // Use ENUM for user roles
    defaultValue: ROLE_STUDENT, // Default role is student
    allowNull: false, // Ensure role cannot be null
  })
  declare role: string;
}

export default User;
