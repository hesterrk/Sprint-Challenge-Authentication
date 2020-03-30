const supertest = require("supertest");
const server = require("../api/server");
var jwt = require('jsonwebtoken')



test("testing jokes route, no token provided", async () => {
    const res = await supertest(server).get("/api/jokes");
    expect(res.statusCode).toBe(401);
    expect(res.type).toBe("application/json");
    expect(res.unauthorized).toBe(true);
    expect(res.body.message).toMatch(/you shall not pass/i);
  });

  test("testing jokes route, token provided", async () => {
    var token = jwt.sign({
      id: 1
    }, process.env.JWT_SECRET="hello")
    const res = await supertest(server).get("/api/jokes")
    .set('Authorization', token)
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.unauthorized).toBe(false);
  });