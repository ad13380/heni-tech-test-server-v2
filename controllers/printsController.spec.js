const printsController = require("./printsController");
const { mockRequest, mockResponse } = require("jest-mock-req-res");
const getPrintDataByPage = require("../services/getPrintDataByPage");

jest.mock("../services/getPrintDataByPage");

describe("printsController", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should call getPrintDataByPage() with the correct page number and return the response", async () => {
    const res = mockResponse();
    const req = mockRequest({ query: { page: 99 } });
    const next = {};
    getPrintDataByPage.mockResolvedValueOnce([{ id: 1 }, { id: 2 }]);

    await printsController(req, res, next);

    expect(getPrintDataByPage).toHaveBeenCalledWith(99);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith([{ id: 1 }, { id: 2 }]);
  });

  it("should catch an api errror and make a call to next()", async () => {
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
