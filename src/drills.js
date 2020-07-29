require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

// function all() {
//   knexInstance
//     .select("*")
//     .from("shopping_list")
//     .then((result) => {
//       console.log(result);
//     });
// }

// all();

// function drillone(searchterm) {
//   knexInstance
//     .select("*")
//     .from("shopping_list")
//     .where("name", "ILIKE", `%${searchterm}%`)
//     .then((result) => {
//       console.log(result);
//     });
// }

// drillone("sandwich");

function prodspage(page) {
  const limit = 6;
  const offset = limit * (page - 1);

  knexInstance
    .select("*")
    .from("shopping_list")
    .limit(limit)
    .offset(offset)
    .then((result) => {
      console.log("page", { page });
      console.log(result);
    });
}

prodspage(2);

function itemsAfterDate(daysAgo) {
  knexInstance
    .select("*")

    .from("shopping_list")
    .where(
      "date_added",
      ">",
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )

    .then((result) => {
      console.log(result);
    });
}

itemsAfterDate("15");

// function costPerCategory() {
//   knexInstance
//     .select("category")
//     .sum("price as total")
//     .from("shopping_list")
//     .groupBy("category")
//     .then((result) => {
//       console.log("COST PER CATEGORY");
//       console.log(result);
//     });
// }

// costPerCategory();
