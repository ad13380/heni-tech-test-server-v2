require("dotenv").config();

const baseURL = "https://api.harvardartmuseums.org";
const baseParams = {
  apikey: process.env.API_KEY,
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

module.exports = { baseURL, baseParams, headers };
