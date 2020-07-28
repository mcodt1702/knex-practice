require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

function drillone(searchterm) {
  knexInstance
    .select("*")
    .from("shopping_list")
    .where("name", "ILIKE", `%${searchterm}%`)
    .then((result) => {
      console.log(result);
    });
}

drillone("salad");

function prodspage(pagenumber) {
  const productsPerPage = pagenumber;
  const offset = productsPerPage * (pagenumber - 1);

  knexInstance
    .select("*")
    .from("shopping_list")
    .limit(productsPerPage)
    .offset(offset)
    .then((result) => {
      console.log("page", { productsPerPage });
      console.log(result);
    });
}

prodspage(6);

function costPerCategory() {
  knexInstance
    .select("category")
    .sum("price as total")
    .from("shopping_list")
    .groupBy("category")
    .then((result) => {
      console.log("COST PER CATEGORY");
      console.log(result);
    });
}

costPerCategory();
