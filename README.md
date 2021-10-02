# Heni Tech Test Server

This app has been deployed, you visit it here: https://heni-techtest-server.herokuapp.com/api/prints?page=23
(as this was deployed on a Heroku free account, load times may be slow at first)

## Setup

To run this locally please install Node.js and install the dependencies by running:

```
$ npm install
```

To start application, run:

```
$ npm start
```

To run tests, run:

```
$ npm test
```

Note: Please ensure you have a `.env` file following the structure set out in the `.env.template` file

## Harvard Art Museums API Observations

- When the value given for the “page” query parameter is too high (e.g. `page=9999999`), the api will return a “ResponseError" response which will contain a “statusCode" parameter with a value of either 400 or 500, however the status code of the response itself will still be 200, therefore axios will not throw an error.
- Despite the “hasimages” query parameter being set to “1”, the api will sometimes return records that do not contain images. This is because some print images have copyright protection, as documented here (https://github.com/harvardartmuseums/api-docs/issues/9). Therefore, an elastic search query of `imagepermissionlevel:0` is also required
