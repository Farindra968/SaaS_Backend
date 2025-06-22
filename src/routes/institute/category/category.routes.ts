import express, { Router } from 'express';
import Middleware from '../../../middleware/middleware';
import asyncHandler from '../../../utils/asyncHandler';
import CategoryController from '../../../controller/institute/category/category.controller';

const router: Router = express.Router();

router.route("/").post(Middleware.isLoggedIn, asyncHandler(CategoryController.createCategory)).get(Middleware.isLoggedIn, CategoryController.getAllCategory)

// dynamic route
router.route("/:categoryId").delete(Middleware.isLoggedIn, asyncHandler(CategoryController.deleteCategory))

export default router;