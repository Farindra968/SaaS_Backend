import { Request, Response } from "express";
import { createInstitute } from "../../services/institute/institute.service";

class InstituteController {
  static async createInstitute(req: Request, res: Response) {
    try {
      const {
        instituteName,
        instituteEmail,
        institutePhoneNo,
        instituteAddress,
      } = req.body;
      const instituteVatNo = req.body.instituteVatNo || null;
      const institutePanNo = req.body.institutePanNo || null;

      //validation
      if (
        !instituteName ||
        !instituteEmail ||
        !institutePhoneNo ||
        !instituteAddress
      ) {
        res.status(400).json({
          message: "Institute Name, Email, Phone Numbeer, Address required",
        });
        return;
      }
      // if both instituteVatNo and institutePanNo
      if (!instituteVatNo && !institutePanNo) {
        res.status(400).json({
          message: "Either Institute VAT Number or PAN Number must be provided",
        });
      }
      const data = await createInstitute(req.body);
      if (!data) {
        res.status(400).send("Failed");
        return;
      }
      res.status(200).json({
        message: "Institute created successfully",
        data,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default InstituteController;
