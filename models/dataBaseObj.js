let id = 1;
class DataBase {
  constructor(originalUrl, shortUrl = id, redirectCount = 0) {
    this.creationDate = new Date().getTime();
    this.redirectCount = redirectCount;
    this.originalUrl = originalUrl;
    this.shortUrl = shortUrl;
    id++;
  }
}
module.exports = DataBase;
