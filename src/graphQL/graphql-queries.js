import { Field, Query } from "@tilework/opus";

// QUERIES

// GET CATEGORIES
export const categoriesQuery = new Query("categories", true).addField("name");

// GET CATEGORY BY NAME
export const getCategoryByNameQuery = (categoryName) => {
  return new Query("category")
    .addArgument("input", "CategoryInput", { title: categoryName})
    .addFieldList([
      "name",
      new Field("products").addFieldList([
        "id",
        "name",
        "inStock",
        "gallery",
        "description",
        "category",
        new Field("attributes").addFieldList([
          "id",
          "name",
          "type",
          new Field("items").addFieldList(["id", "displayValue", "value"]),
        ]),
        new Field("prices").addFieldList(["currency", "amount"]),
        "brand",
      ])
    ]);
};

// GET CATEGORIES WITH PRODUCTS
export const categoriesWithProductsQuery = new Query("categories", true)
  .addField("name")
  .addField(
    new Field("products").addFieldList([
      "id",
      "name",
      "inStock",
      "gallery",
      "description",
      "category",
      new Field("attributes").addFieldList([
        "id",
        "name",
        "type",
        new Field("items").addFieldList(["id", "displayValue", "value"]),
      ]),
      new Field("prices").addFieldList(["currency", "amount"]),
      "brand",
    ])
  );

// GET CURRENCIES
export const currenciesQuery = new Query("currencies", true);

// GET PRODUCT BY ID
export const getProductByIdQuery = (productId) => {
  return new Query("product")
    .addArgument("id", "String!", productId)
    .addFieldList([
      "id",
      "name",
      "inStock",
      "gallery",
      "description",
      "category",
      new Field("attributes").addFieldList([
        "id",
        "name",
        "type",
        new Field("items").addFieldList(["id", "displayValue", "value"]),
      ]),
      new Field("prices").addFieldList(["currency", "amount"]),
      "brand",
    ]);
};
