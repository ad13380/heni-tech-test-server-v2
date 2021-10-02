const getPrintDataByPage = require("../services/getPrintDataByPage");

const printsController = async (req, res, next) => {
  try {
    const pageData = await getPrintDataByPage(req.query.page);
    res.status(200).send(pageData);
  } catch (err) {
    next(err);
  }
};

module.exports = printsController;
