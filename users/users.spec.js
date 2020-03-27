const supertest = require("supertest");

const server = require("../api/server");

const db = require("../database/dbConfig");

var jwt = require('jsonwebtoken')


beforeEach(async () => {
  await db.seed.run();
});

const userModel = require('./users-model')

test("getting list of all users without authorisation", async () => {
    const res = await supertest(server).get("/api/users")
    expect(res.statusCode).toBe(401);
    expect(res.type).toBe("application/json");
  });


test("getting list of all users with authorisation", async () => {
    var token = jwt.sign({
      id: 1
    }, process.env.JWT_SECRET="hello")
      const res = await supertest(server).get("/api/users")
      .set('Authorization', token)
      expect(res.statusCode).toBe(200)
      expect(res.body.length).toBe(3)
    });


    test("register route, no token", async () => {
        const res = await supertest(server)
          .post("/api/auth/register")
          .send({ username: "Hanna", password: "1234" });
        expect(res.type).toBe("application/json");
      });



      test("register route, token generated", async () => {
        var token = jwt.sign({
          id: 1
        }, process.env.JWT_SECRET="hello")
          const res = await supertest(server).post("/api/auth/register")
          .send({ username: "Hanna", password: "1234" })
          .set('Authorization', token)
          expect(res.statusCode).toBe(201)
        });

        test("login route, no token", async () => {
            const res = await supertest(server)
              .post("/api/auth/login")
              .send({ username: "Hanna", password: "1234" });
            expect(res.type).toBe("application/json");
            expect(res.statusCode).toBe(401);
            expect(res.body.message).toMatch(/invalid credentials/i);
            
          });
