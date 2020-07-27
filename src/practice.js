require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});
console.log("knex and driver installed correctly");

// const qry = knexInstance
//   .select('product_id', 'name', 'price', 'category')
//   .from('amazong_products')
//   .where({ name: 'Point of view gun' })
//   .first()
//   .toQuery()
//   // .then(result => {
//   //   console.log(result)
//   // })

///console.log(qry)

// const searchTerm = "holo";

// knexInstance
//   .select("product_id", "name", "price", "category")
//   .from("amazong_products")
//   .where("name", "ILIKE", `%${searchTerm}%`)
//   .then((result) => {
//     console.log(result);
//   });
function mostPopularVideosForDays(days) {
  knexInstance
    .select("video_name", "region")
    .count("date_viewed AS views")
    .where(
      "date_viewed",
      ">",
      knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
    )
    .from("whopipe_video_views")
    .groupBy("video_name", "region")
    .orderBy([
      { column: "region", order: "ASC" },
      { column: "views", order: "DESC" },
    ])
    .then((result) => {
      console.log(result);
    });
}

mostPopularVideosForDays(30);
