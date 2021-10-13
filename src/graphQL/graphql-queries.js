import { Field, Query } from "@tilework/opus";

// QUERIES

// GET CATEGORIES
export const categoriesQuery = new Query("categories", true).addField("name");

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
export const getProductByIdQuery = new Query("product")
  .addArgument("id", "string", "huarache-x-stussy-le")
  .addFieldList(["id", "name"]);
