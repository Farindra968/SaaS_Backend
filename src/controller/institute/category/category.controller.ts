import { Response } from "express";
import { IExtendRequest } from "../../../global";
import {
  createCategories,
  getAllCategories,
} from "../../../services/institute/category/category.service";

// create category
// This function creates a new category in the database for a specific institute.
const createCategory = async (req: IExtendRequest, res: Response) => {
  const instituteNumber: any = req.user?.instituteCode;
  const { categoryName, categoryDescription } = req.body;

  if (!categoryName || !categoryDescription) {
    res
      .status(400)
      .json({ message: "Category name and description are required." });
    return;
  }
  const result = await createCategories(req.body, instituteNumber);
  res.status(201).json({
    message: "Category created successfully",
    data: result,
  });
};

// get all categories
// This function retrieves all categories for a specific institute.
const getAllCategory = async (req: IExtendRequest, res: Response) => {
  const instituteNumber: any = req.user?.instituteCode;

  const result = await getAllCategories(instituteNumber);
  res.status(200).json({
    message: "All categories fetched successfully",
    data: result,
  });
};

export { createCategory };
