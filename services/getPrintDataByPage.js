const axios = require("axios");
const { baseURL, baseParams, headers } = require("../config/apiConfiguration");

const getPrintDataByPage = async (page = "1") => {
  const response = await axios.get("/object", {
    baseURL,
    params: {
      ...baseParams,
      page,
    },
    headers,
  });

  // handle a non-200 response that is not caught by axios
  if (response.data.meta?.statusCode && response.data.meta.statusCode !== 200) {
    const err = new Error(JSON.stringify(response.data));
    err.status = response.data.meta.statusCode;
    throw err;
  }

  return response.data;
};

module.exports = getPrintDataByPage;
