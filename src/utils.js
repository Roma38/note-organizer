export const recursion = (subCategories, categories, categoriesOptions) => {
  subCategories.forEach(subCategoryId => {
    const subCategory = categories.find(
      category => category.id === subCategoryId
    );
    categoriesOptions.push({
      key: subCategory.id,
      text: subCategory.name,
      value: subCategory.id
    });
    if (subCategory.hasOwnProperty("subCategories")) {
      recursion(subCategory.subCategories, categories, categoriesOptions);
    }
  });
};

export const generateCategoryOptions = categories => {
  const categoriesOptions = [];
  categories
    .filter(category => !category.hasOwnProperty("parentId"))
    .forEach(category => {
      categoriesOptions.push({
        key: category.id,
        text: category.name,
        value: category.id
      });
      if (category.hasOwnProperty("subCategories")) {
        recursion(category.subCategories, categories, categoriesOptions);
      }
    });
  return categoriesOptions;
};
