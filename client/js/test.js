var request = require("supertest")("http://localhost:8080");

describe("Express Test", function() {
  it("Status code 200", function(done) {
    request
      .get("/")
      .expect(200)
      .end(done);
  });
});
