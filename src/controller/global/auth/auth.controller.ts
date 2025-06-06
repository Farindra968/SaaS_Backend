import { Request, Response } from "express";
import authService from "../../../services/global/auth/auth.service";
import { PASSWORD_REGEX } from "../../../constant/regex";
import { jsonToken } from "../../../utils/jwttoken";

const authRegister = async (req: Request, res: Response): Promise<void> => {
  const { userName, email, password, confirmpassword, phoneNumber } = req.body;
  try {
    // Validate required fields
    if (!userName) {
      res.status(400).send("User name is required");
      return;
    }
    if (!email) {
      res.status(400).send("Email is required");
      return;
    }
    if (!password) {
      res.status(400).send("Password is required");
      return;
    }
    if (!phoneNumber) {
      res.status(400).send("Phone number is required");
      return;
    }
    if (!confirmpassword) {
      res.status(400).send("Confirm password is required");
      return;
    }
    /// Check if password and confirm password match
    if (password !== confirmpassword) {
      res.status(400).send("Passwords do not match");
      return;
    }

    // Password regex validator
    if (!PASSWORD_REGEX.test(password)) {
      res
        .status(422)
        .send(
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
      return;
    }

    const data = await authService.authRegister(req.body);
    // Optionally, you can generate a JWT token here and send it back in the response
    const token = jsonToken({
      id: data.id,
      email: data.email,
      userName: data.userName,
      role: data.role,
    })
    // saving json token in cookie
    res.cookie("token", token)
    res.json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const authLogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    // Validate required fields
    if (!email) {
      res.status(400).send("Email is required");
      return;
    }
    if (!password) {
      res.status(400).send("Password is required");
      return;
    }
    const data = await authService.authLogin(req.body);
    // Optionally, you can generate a JWT token here and send it back in the response
    const token = jsonToken({
      id: data.id,
      email: data.email,
      userName: data.userName,
      role: data.role,
    })
    // saving json token in cookie
    res.cookie("token", token)
    res.json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

export { authRegister, authLogin };
