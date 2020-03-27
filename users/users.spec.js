const supertest = require("supertest");

const server = require("../api/server");

const db = require("../database/dbConfig");

var jwt = require("jsonwebtoken");

beforeEach(async () => {
  await db.seed.run();
});

const usersModel = require("./users-model");

test("getting list of all users without authorisation", async () => {
  const res = await supertest(server).get("/api/users");
  expect(res.statusCode).toBe(401);
  expect(res.type).toBe("application/json");
});

test("getting list of all users with authorisation", async () => {
  var token = jwt.sign(
    {
      id: 1
    },
    (process.env.JWT_SECRET = "hello")
  );
  const res = await supertest(server)
    .get("/api/users")
    .set("Authorization", token);
  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBe(3);
});

test("register route", async () => {
  const res = await supertest(server)
    .post("/api/auth/register")
    .send({ username: "Hanna", password: "1234" });
  expect(res.type).toBe("application/json");
  expect(res.unauthorized).toBe(false);
  expect(res.statusCode).toBe(201);
});

test("login route, no token", async () => {
  const res = await supertest(server)
    .post("/api/auth/login")
    .send({ username: "Hanna", password: "1234" });
  expect(res.type).toBe("application/json");
  expect(res.statusCode).toBe(401);
  expect(res.unauthorized).toBe(true);
  expect(res.body.message).toMatch(/invalid credentials/i);
});

test("testing find in users model", async () => {
    const res = await usersModel.find();
    console.log(res);
    expect(res.length).toBe(3);
  });
  
  test("testing find by id in users model", async () => {
    const res = await usersModel.findById(1);
    expect(res.username).toBe("Hester");
    expect(res.username.length).toBe(6);
  });
  
  test("testing add in users model", async () => {
    const res = await usersModel.add({ username: "Lucy", password: "123456" });
    expect(res.username).toBe("Lucy");
  });
  
  test("testing remove in users model", async () => {
    const del = await usersModel.remove(1);
    const users = await db("users").select();
    expect(users).toHaveLength(2);
    expect(del).toBe(1);
  });










