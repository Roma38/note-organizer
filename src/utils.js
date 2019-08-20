export const generateCategoryOptions = categories => {
  const categoriesOptions = [];

  function recursion(subCategories, categories, categoriesOptions) {
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
  }

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

export const filterNotes = (notes, filter) => {



  let result = notes.filter(note => note[filter.type].includes(filter.id));
  if(filter.type === "categories") {
    result.map(note => note.categories);
  }
};
