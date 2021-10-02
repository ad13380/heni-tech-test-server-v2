const printsController = require("./printsController");
const { mockRequest, mockResponse } = require("jest-mock-req-res");
const getPrintDataByPage = require("../services/getPrintDataByPage");

jest.mock("../services/getPrintDataByPage");

describe("", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("", async () => {
    const res = mockResponse();
    const req = mockRequest({ query: { page: 99 } });
    const next = {};

    await printsController(req, res, next);

    expect(getPrintDataByPage).toHaveBeenCalledWith(99);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("", async () => {
    const res = mockResponse();
    const req = mockRequest({ query: { page: 99 } });
    const next = jest.fn();
    const error = new Error("Unexpected error");
    getPrintDataByPage.mockRejectedValueOnce(error);

    await printsController(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
  });
});
