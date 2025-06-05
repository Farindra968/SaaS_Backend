import User from "../../../models/user.model";
import bcrypt from "bcryptjs";

const authRegister = async (data: any) => {
  // Password hashing
  const hassPassword = bcrypt.hashSync(data.password, 12);

  const register = await User.create({
    userName: data.userName,
    email: data.email,
    // in password inserting hash password in database
    password: hassPassword,
    phoneNumber: data.phoneNumber,
  });
  if (!register) {
    throw {statusCode: 400, message:"User Registeration fieod"};
  }
  return register;
};

const authLogin = async (data: any) => {
  const user = await User.findOne({ where: { email: data.email } });

  if (!user) throw { statusCode: 404, message: "User  not found" };

  //comparing the data password (hash /excrypt) to user input password
  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw { statusCode: 404, message: "Invalid email or password" };
  }

  // Optionally, generate JWT or handle session here

  return user;
};

export default { authRegister, authLogin };
