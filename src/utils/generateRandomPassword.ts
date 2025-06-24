import bcrypt from "bcryptjs";

const generateRandomPassword = async (name: string) => {
  //1. capitalized first word farindra = Farindra
  let capitalized = name.charAt(0).toUpperCase() + name.slice(1);

  //2. generatng random number = Farinda1245
  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  //3. generating random symbol = #%^^&*^%$###
  const symbols = "!@#$%^&*()";
  const randomSymbol = Math.floor(Math.random() + symbols.length);

  // 4. hashing the passwoed == Farindra%^&&^22555
  const hasspassword = {
    hasspassword: await bcrypt.hash(
      `${capitalized}${randomSymbol}${randomNumber}*`,
      12
    ),
    plaintext: `${capitalized}${randomSymbol}${randomNumber}*`,
  };

  return hasspassword;
};

export default generateRandomPassword;
