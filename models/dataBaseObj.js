let id = 1;
class DataBase {
  constructor(redirectCount, originalUrl, shortUrl = id) {
    this.creationDate = new Date().getTime();
    this.redirectCount = redirectCount;
    this.originalUrl = originalUrl;
    this.shortUrl = shortUrl;
    id++;
  }
}
module.exports = DataBase;
