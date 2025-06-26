import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

const generateRandomPassword = async (name: string) => {
  //1. capitalized first word farindra = Farindra
  let userName = name.replace(/\s+/g, "") // removes all spaces

  let capitalized = userName.charAt(0).toUpperCase() + userName.slice(1);

  //2. generatng random number = Farinda1245
  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  const uuid = randomUUID().slice(0, 10);

  // 4. hashing the passwoed == Farindra%^&&^22555
  const hasspassword = {
    hasspassword: await bcrypt.hash(
      `${capitalized}${uuid}${randomNumber}@`,
      12
    ),
    plaintext: `${capitalized}${uuid}${randomNumber}@`,
  };

  return hasspassword;
};

export default generateRandomPassword;
