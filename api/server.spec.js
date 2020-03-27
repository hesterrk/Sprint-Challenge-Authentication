test("server enviroment", () => {
    expect(process.env.DB_ENV).toBe("testing")
  })