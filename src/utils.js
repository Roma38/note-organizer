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

export const filterNotes = (notes, filter, categories) => {
  if (!filter.type) return notes;
  if (filter.type === "labels") {
    return notes.filter(note => note.labels.includes(filter.id));
  }

  if (filter.type === "categories") {
    function recursion(category) {
      categoriesIds = categoriesIds.concat(category.subCategories);
      category.subCategories.forEach(id => {
        const subCategory = categories.find(category => (category.id = id));
        if (category.hasOwnProperty("subCategories")) recursion(subCategory);
      });
    }

    let categoriesIds = [filter.id];
    const category = categories.find(category => (category.id = filter.id));

    if (category.hasOwnProperty("subCategories")) recursion(category);

    return notes.filter(note => {
      for (let index = 0; index < categoriesIds.length; index++) {
        const id = categoriesIds[index];
        if (note.categories.includes(id)) return true;
      }
      return false;
    });
  }
};
