// that contains  methods for CRUD: to get, insert, update and delete
//  shopping list items. Also, make a ./test/shopping-list-service.spec.js
//  file that tests the CRUD methods.

const ShoppingListService = {
  getAllItems(knex) {
    return knex.select("*").from("shopping_list");
  },
};

module.exports = ShoppingListService;
