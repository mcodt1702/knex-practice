const ArticlesService = require("../src/articles-service");
require("dotenv").config();

const knex = require("knex");

let db;
before(() => {
  db = knex({
    client: "pg",
    connection: process.env.TEST_DB_URL,
  });
});

describe(`Articles service object`, function () {
  it(`should run the tests`, () => {
    expect(true).to.eql(false);
  });
});

describe(`getAllArticles()`, () => {
  it(`resolves all articles from 'blogful_articles' table`, () => {
    // test that ArticlesService.getAllArticles gets data from table
  });
});
