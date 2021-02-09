const app = require('../../../server.js');
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
const databaseName = "test";

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
});


// beforeAll(async (done) => {
//   server = app.listen(done)
//   req = await supertest.agent(server)
// })

it("Gets the test endpoint", async done => {
    // Sends GET Request to /test endpoint
    try {
      const res = await request.get("/api/projects");  
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("pass!");
    } catch (error) {
      console.log(error)
    }
  
    // ...
    done();
}); 

it("Should save user to database", async done => {
  const res = await request.post("/api/projects").send({
    title: 'test title',
    intro: 'test intro',
    type: 'Article',
    description: 'test description',
    paragraphs: ['para 1', 'para 2'],
    photos: ['photoStr1', 'photoStr2'],
    order: ['paragraph', 'photo', 'paragraph'],
    linkUrl: 'www.link.com',
    linkDescription: 'link description text',
    mainPhoto: 'www.aws/asdlfkjldkjaf',
    text: 'long html string'
  });
  done();
});

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

afterEach(async () => {
  await removeAllCollections();
});
