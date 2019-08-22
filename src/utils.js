export const generateCategoryOptions = categories => {
  const categoriesOptions = [];
  let divider = "- ";

  function recursion(subCategories, categories, categoriesOptions, divider) {
    subCategories.forEach(subCategoryId => {
      const subCategory = categories.find(
        category => category.id === subCategoryId
      );
      categoriesOptions.push({
        key: subCategory.id,
        text: divider + subCategory.name,
        value: subCategory.id
      });
      if (subCategory.hasOwnProperty("subCategories")) {
        let newDivider = divider + "- ";
        recursion(
          subCategory.subCategories,
          categories,
          categoriesOptions,
          newDivider
        );
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
        recursion(
          category.subCategories,
          categories,
          categoriesOptions,
          divider
        );
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
    let categoriesIds = [filter.id];

    for (let i = 0; i < categoriesIds.length; i++) {
      const category = categories.find(
        // eslint-disable-next-line no-loop-func
        item => item.id === categoriesIds[i]
      );
      if (category.subCategories) {
        categoriesIds = [...categoriesIds, ...category.subCategories];
      }
    }

    return notes.filter(note => {
      for (let index = 0; index < categoriesIds.length; index++) {
        const id = categoriesIds[index];
        if (note.categories.includes(id)) return true;
      }
      return false;
    });
  }
};
