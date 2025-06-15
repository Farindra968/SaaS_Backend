import { Request, Response } from "express";
import { createInstitute } from "../../services/institute/institute.service";
import generateRandomInsituteNumber from "../../utils/generateRandomInsituteNumber";
import { IExtendRequest } from "../../global";



class InstituteController {
  static async createInstitute(req: IExtendRequest, res: Response) {
    try {
      const {
        instituteName,
        instituteEmail,
        institutePhoneNo,
        instituteAddress,
      } = req.body;
      const userData = req.user;
      console.log(`This is user data = ${userData}`)
      const instituteVatNo = req.body.instituteVatNo || null;
      const institutePanNo = req.body.institutePanNo || null;

      // Validation
      if (
        !instituteName ||
        !instituteEmail ||
        !institutePhoneNo ||
        !instituteAddress
      ) {
        res.status(400).json({
          message: "Institute Name, Email, Phone Number & Address are required",
        });
        return;
      }

      if (!instituteVatNo && !institutePanNo) {
        res.status(400).json({
          message: "Either Institute VAT Number or PAN Number must be provided",
        });
        return;
      }

      // Generate unique institute number
      const instituteNumber = generateRandomInsituteNumber();

      // Pass req.body directly (ensure your service expects this shape)
      const data = await createInstitute(instituteNumber, req.body);

      res.status(201).json({
        message: "Institute created successfully",
        data,
        instituteNumber,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default InstituteController;
