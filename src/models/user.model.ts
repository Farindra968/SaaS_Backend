import { Table, Column, Model, DataType, AllowNull, PrimaryKey } from "sequelize-typescript"

@Table({
    tableName: "Users", // Use plural form for table name because it represents a collection of users
    timestamps: true, // Enable timestamps for createdAt and updatedAt fields
    modelName: "User" // Use singular form for model name because it represents a single user
})

class User extends Model {

    @Column({
        primaryKey: true, // Use PrimaryKey to indicate that this column is the primary key
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4, // Automatically generate a UUID for new records
        allowNull: false // Ensure this field cannot be null
    })
    declare id: string

    @Column({
        type: DataType.STRING,
    })
    declare userName: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true // Ensure email is unique
    })
    declare email: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare password: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare phoneNumber: number

    @Column({
        type: DataType.ENUM("teacher", "student", "admin", "superadmin"), // Use ENUM for user roles
        defaultValue: "student", // Default role is student
        allowNull: false // Ensure role cannot be null
    })
    declare role: string
}

export default User;