process.env.NODE_ENV = "test";
const { request } = require("../app");
const app = require("../app");
// const bin = require("../bins/test.json");
// const nock = require("nock");

describe("shortUrl route tests", () => {
  it("should return a status code 200 when entering the app", () => {
    app.get("/", (req, res) => {
      res.sendFile(__dirname + "/views/index.html");
      expect(res.statusCode).toBe(200);
    });
  });
  it("should shorten a valid url", () => {
    app.post("/api/shorturl/new", (req, res) => {
      const { body } = req;
      const url = body.url;
      expect(res.statusMessage).toBe({
        original_url: url,
        short_url: id,
      });
    });
  });
  it("should return an error when entering a non-existing url", () => {
    app.post("/api/shorturl/new", (req, res) => {
      const { body } = req;
      body.url = "https://www.faceboooooook.com/";
      expect(res.statusMessage).toBe({ error: "Invalid Hostname" });
    });
  });
  it("should return a url full data when entering statistic route", () => {
    app.get("api/statistic/5", (req, res) => {
      const { body } = req;
      const url = body.url;
      expect(res.statusMessage).toBe({
        creationDate: 1614955733295,
        redirectCount: 2,
        originalUrl: "https://facebook.com",
        shortUrl: 5,
      });
    });
  });
  //
  //
  //
});
