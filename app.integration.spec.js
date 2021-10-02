const supertest = require("supertest");
const app = require("./app");
const request = supertest(app);
const axios = require("axios");
const { when } = require("jest-when");

jest.mock("./config/apiConfiguration", () => {
  return {
    baseURL: "https://api.harvardartmuseums.org",
    baseParams: {
      apikey: "superSecretKey",
      classification: "Prints",
      size: "10",
      sort: "rank",
      sortorder: "desc",
      hasimage: "1",
      q: "(verificationlevel:4)AND(imagepermissionlevel:0)AND(accesslevel:1)",
    },
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  };
});
jest.mock("axios");

const baseURL = "https://api.harvardartmuseums.org";
const baseParams = {
  apikey: "superSecretKey",
  classification: "Prints",
  size: "10",
  sort: "rank",
  sortorder: "desc",
  hasimage: "1",
  q: "(verificationlevel:4)AND(imagepermissionlevel:0)AND(accesslevel:1)",
};
const headers = {
  Accept: "application/json",
  "content-type": "application/json",
};

describe("app", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should be running successfully", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    expect(response.text).toEqual("This server is working");
  });

  describe("when returning print data", () => {
    beforeEach(() => {
      when(axios.get)
        .calledWith("/object", {
          baseURL,
          params: {
            ...baseParams,
            page: "1",
          },
          headers,
        })
        .mockResolvedValueOnce({ data: [{ id: 1 }, { id: 2 }] });
      when(axios.get)
        .calledWith("/object", {
          baseURL,
          params: {
            ...baseParams,
            page: "2",
          },
          headers,
        })
        .mockResolvedValueOnce({ data: [{ id: 3 }, { id: 4 }] });
    });

    it("should return data for page 1 when no page is specified", async () => {
      const response = await request.get("/api/prints");

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual([{ id: 1 }, { id: 2 }]);
    });

    it("should return data for the specified page", async () => {
      const response = await request.get("/api/prints?page=2");

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual([{ id: 3 }, { id: 4 }]);
    });
  });

  it("should return an error for a bad request with the appropraite status code", async () => {
    axios.get.mockResolvedValueOnce({
      data: { name: "ResponseError", meta: { statusCode: 400 } },
    });
    const response = await request.get("/api/prints");
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      message: '{"name":"ResponseError","meta":{"statusCode":400}}',
    });
  });

  it("should return a 404 response for an invalid url", async () => {
    const response = await request.get("/api/printsss");

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ message: "Not found" });
  });

  it("should return a 500 response for an internal error", async () => {
    axios.get.mockRejectedValueOnce(new Error("This is unexpected"));
    const response = await request.get("/api/prints");
    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({ message: "This is unexpected" });
  });
});
