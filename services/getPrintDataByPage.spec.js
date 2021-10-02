const getPrintDataByPage = require("./getPrintDataByPage");
const axios = require("axios");

jest.mock("axios");
jest.mock("../config/apiConfiguration", () => {
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

describe("getPrintDataByPage", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should successfully return the print data for a given page", async () => {
    axios.get.mockResolvedValueOnce({
      data: { info: {}, records: [{ id: 1 }, { id: 2 }] },
    });

    const response = await getPrintDataByPage(99);

    expect(axios.get).toHaveBeenCalledWith("/object", {
      baseURL: "https://api.harvardartmuseums.org",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      params: {
        apikey: "superSecretKey",
        classification: "Prints",
        hasimage: "1",
        page: 99,
        q: "(verificationlevel:4)AND(imagepermissionlevel:0)AND(accesslevel:1)",
        size: "10",
        sort: "rank",
        sortorder: "desc",
      },
    });
    expect(response).toStrictEqual({
      info: {},
      records: [{ id: 1 }, { id: 2 }],
    });
  });

  it("should throw for a bad api resonse that axios doesn't throw", async () => {
    axios.get.mockResolvedValueOnce({
      data: { name: "ResponseError", meta: { statusCode: 400 } },
    });

    await expect(async () => {
      await getPrintDataByPage(99);
    }).rejects.toThrow('{"name":"ResponseError","meta":{"statusCode":400}}');
  });
});
