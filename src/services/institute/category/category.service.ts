import sequelize from "../../../config/dbConnection";

interface ICategoryData {
  categoryName: string;
  categoryDescription: string;
}

// create category
// This function creates a new category in the database for a specific institute.
const createCategories = async (
  data: ICategoryData,
  instituteNumber: Number
) => {
  await sequelize.query(
    ` INSERT INTO courseCategory_${instituteNumber} (categoryName, categoryDescription) VALUES(?,?)`,
    {
      replacements: [data.categoryName, data.categoryDescription],
    }
  );
};

// get all categories
// This function retrieves all categories for a specific institute.
const getAllCategories = async (instituteNumber: string) => {
  const [result] = await sequelize.query(
    `SELECT * FROM courseCategory_${instituteNumber}`
  );
  return result;
};

// delete category
const deleteCategories = async (instituteNumber: Number, categoryId: any) => {
  await sequelize.query(
    `DELETE FROM courseCategory_${instituteNumber} WHERE id = ?`,
    {
      replacements: [categoryId],
    }
  );
};

export { createCategories, getAllCategories, deleteCategories };
