const knex = require("knex");

const shoppingListService = {
  getAllArticles(knex) {
    return knex.select("*").from("shopping_list");
  },

  insertArticle(knex, newItem) {
    return knex
      .insert(newItem)
      .into("shopping_list")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex.from("shopping_list").select("*").where("id", id).first();
  },

  deleteArticle(knex, id) {
    return knex("shopping_list").where({ id }).delete();
  },

  updateArticle(knex, id, newArticleFields) {
    return knex("shopping_list").where({ id }).update(newArticleFields);
  },
};

module.exports = shoppingListService;

// Make a new file in your knex-practice project for
//  ./src/shopping-list-service.js that contains methods
//   for CRUD: to get, insert, update and delete shopping list items.
//    Also, make a ./test/shopping-list-service.spec.js file that
//    tests the CRUD methods.
