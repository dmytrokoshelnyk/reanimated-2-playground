export const getSharedElIdForImageCard = (card, subCategory, type) =>
  `category.${card.category}.${subCategory.id}.${type}`;
