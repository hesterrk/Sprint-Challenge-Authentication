const supertest = require("supertest");
const server = require("../api/server");
var jwt = require('jsonwebtoken')



test("testing jokes route, no auth header", async () => {
    const res = await supertest(server).get("/api/jokes");
    expect(res.statusCode).toBe(401);
    expect(res.type).toBe("application/json");
    expect(res.unauthorized).toBe(true);
    expect(res.body.message).toMatch(/you shall not pass/i);
  });