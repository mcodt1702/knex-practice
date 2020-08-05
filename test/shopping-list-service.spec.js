const knex = require("knex");
const shoppingListService = require("../src/shopping-list-service");

let db;
let testItems = [
  {
    id: 1,
    name: "Fish tricks",
    price: "13.10",
    date_added: new Date("2029-01-22T16:28:32.615Z"),
    checked: false,
    category: "Main",
  },
  {
    id: 2,
    name: "Not Dogs",
    price: "4.99",
    date_added: new Date("2029-01-22T16:28:32.615Z"),
    checked: true,
    category: "Snack",
  },
  {
    id: 3,
    name: "Bluffalo Wings",
    price: "5.50",
    date_added: new Date("2029-01-22T16:28:32.615Z"),
    checked: false,
    category: "Snack",
  },
  {
    id: 4,
    name: "SubstiTuna Salad",
    price: "1.24",
    date_added: new Date("2029-01-22T16:28:32.615Z"),
    checked: false,
    category: "Lunch",
  },
  {
    id: 5,
    name: "Tofurkey",
    price: "2.50",
    date_added: new Date("2029-01-22T16:28:32.615Z"),
    checked: false,
    category: "Breakfast",
  },
];

before(() => {
  db = knex({
    client: "pg",
    connection: process.env.TEST_DB_URL,
  });
});

before(() => db("shopping_list").truncate());
afterEach(() => db("shopping_list").truncate());
after(() => db.destroy());

context(`Shopping list service object with DATA`, () => {
  beforeEach(() => {
    return db.into("shopping_list").insert(testItems);
  });

  it(`resolves all articles from 'shopping_list' table`, () => {
    return shoppingListService.getAllArticles(db).then((actual) => {
      expect(actual).to.eql(
        testItems.map((article) => ({
          ...article,
          date_added: new Date(article.date_added),
        }))
      );
    });
  });

  it(`getById() resolves an article by id from 'shopping_list' table`, () => {
    const thirdId = 3;
    const thirdTestArticle = testItems[thirdId - 1];
    return shoppingListService.getById(db, thirdId).then((actual) => {
      expect(actual).to.eql({
        id: thirdId,
        name: thirdTestArticle.name,
        price: thirdTestArticle.price,
        date_added: thirdTestArticle.date_added,
        checked: thirdTestArticle.checked,
        category: thirdTestArticle.category,
      });
    });
  });

  it(`deleteArticle() removes an article by id from 'shopping_list' table`, () => {
    const articleId = 3;
    return shoppingListService
      .deleteArticle(db, articleId)
      .then(() => shoppingListService.getAllArticles(db))
      .then((allArticles) => {
        // copy the test articles array without the "deleted" article
        const expected = testItems.filter(
          (article) => article.id !== articleId
        );
        expect(allArticles).to.eql(expected);
      });
  });

  it(`updateArticle() updates an article from the 'shopping_list' table`, () => {
    const idOfArticleToUpdate = 3;
    const newArticleData = {
      name: "updated name",
      price: "1.00",
      date_added: new Date(),
      checked: false,
      category: "Breakfast",
    };
    return shoppingListService
      .updateArticle(db, idOfArticleToUpdate, newArticleData)
      .then(() => shoppingListService.getById(db, idOfArticleToUpdate))
      .then((article) => {
        expect(article).to.eql({
          id: idOfArticleToUpdate,
          ...newArticleData,
        });
      });
  });
});

context(`Given 'shopping_list' has NO DATA`, () => {
  it(`getAllArticles() resolves an empty array`, () => {
    return shoppingListService.getAllArticles(db).then((actual) => {
      expect(actual).to.eql([]);
    });
  });

  it(`insertArticle() inserts a new article and resolves the new article with an 'id'`, () => {
    const newItem = {
      name: "Test new name",
      price: "2.50",
      date_added: new Date("2029-01-22T16:28:32.615Z"),
      checked: false,
      category: "Breakfast",
    };
    return shoppingListService.insertArticle(db, newItem).then((actual) => {
      expect(actual).to.eql({
        id: 1,
        name: "Test new name",
        price: "2.50",
        date_added: new Date("2029-01-22T16:28:32.615Z"),
        checked: false,
        category: "Breakfast",
      });
    });
  });
});
