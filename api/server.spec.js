const supertest = require("supertest");
const server = require("./server");
const db = require("../database/dbConfig");

beforeEach(async () => {
  await db.seed.run();
});


test("home route", async () => {
  const res = await supertest(server).get("/");
  expect(res.statusCode).toBe(200);
  expect(res.type).toBe("application/json");
  expect(res.body.message).toBe("all working");
  expect(res.body.message).toHaveLength(11);
  expect(res.body.message).toMatch(/all/i);
});



test("server enviroment", () => {
    expect(process.env.DB_ENV).toBe("testing")
  })