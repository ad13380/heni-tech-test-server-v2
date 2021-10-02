const supertest = require("supertest");
const app = require("./app");
const request = supertest(app);

describe("app", () => {
  it("should be running successfully", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    expect(response.text).toEqual("This server is working");
  });
});
