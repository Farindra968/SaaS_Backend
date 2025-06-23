import { Response } from "express";
import { IExtendRequest } from "../../../global";
import {
  createCategories,
  getAllCategories,
  deleteCategories,
} from "../../../services/institute/category/category.service";

class CategoryController {

// create category
// This function creates a new category in the database for a specific institute.
static async createCategory (req: IExtendRequest, res: Response) {
  const instituteNumber: any = req.user?.instituteCode;
  console.log(`this is category course ===========> ${instituteNumber}`)
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
static async getAllCategory(req: IExtendRequest, res: Response) {
  try {
    const instituteNumber: any = req.user?.instituteCode;
    console.log(`========>${req.user?.instituteCode}`);
    const result = await getAllCategories(instituteNumber);
    res.status(200).json({
      code: instituteNumber,
      message: "All categories fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};


// delete category
// const deleteCategory = async (req: IExtendRequest, res: Response) => {
static async deleteCategory (req: IExtendRequest, res: Response) {
  const instituteNumber: any = req.user?.instituteCode;
  const { categoryId } = req.params;

  if (!categoryId) {
    res.status(400).json({ message: "Category ID is required." });
    return;
  }
  const result = await deleteCategories(instituteNumber, categoryId);
  res.status(200).json({
    message: "Category deleted successfully",
    data: result,
  });
};


}


export default CategoryController