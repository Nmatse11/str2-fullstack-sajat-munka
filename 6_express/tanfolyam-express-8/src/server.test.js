const app = require('./server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const config = require('config');
const Person = require('./models/person.model');

describe('REST API integration tests', () => {
  const inserData = [
    {
      firstName: 'John',
      lastName: 'Test',
      email: 'john@test.com'
    },
    {
      firstName: 'Kate',
      lastName: 'Test',
      email: 'kate@test.com'
    }
  ];

  // Minden teszteset előtt lefut
  // done- elő van készítve a tesztelés, indulhat a folyamat
  /*beforeEach(done => {

    // A szerver csatlakozás egy az egyben átmásolva a server.js-ből
    const { username, password, host } = config.get('database');

    mongoose.connect(`mongodb+srv://${username}:${password}@${host}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => {
        // Ezzel jelezzük a tesztrendeszernek, hogy kész van a beállítás, szerver csatlakozás kész - kezdődhet a tesztelés
        done();
      })
      .catch(err => {
        logger.error(err);
        process.exit();
      })

  });

  // Minden teszteset után fut le
  // Adatbázis kapcsolat megszüntetés
  afterEach(done => {
    // testjson-ben át kell írni az adatbázis nevét, hogy ne az éles adatbázist dobja el a függvény
    mongoose.connection.db.dropDatabase(() => {
      // sikeres eldobás, lezásár után hívjuk meg a done-t, ekkora van kész
      mongoose.connection.close(() => done())
    })
  })

  test('GET /person', () => {
    // teszt adatok beszúrása
    return Person.insertMany(inserData)
      // a teszt adatok lekérése az app person url-t
      // 200-as válaszkódot várunk
      .then(() => supertest(app).get('/person').expect(200))
      // válasz tesztelése
      .then(response => {
        // igaz-e hogy tömböt kaptunk vissza
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(inserData.length);

        // tesztadatok elleneőrzése
        response.body.forEach((person, index) => {
          expect(person.firstName).toBe(inserData[index].firstName)
          expect(person.lastName).toBe(inserData[index].lastName)
          expect(person.email).toBe(inserData[index].email)
        });
      });
  });

  // id alapján tesztelés
  test('GET /person/:id', () => {
    let firstPostId;
    return Person.insertMany(inserData)
      // kell az id, amit a MongoDB ad neki
      .then(people => {
        firstPostId = people[0]._id
        return supertest(app).get(`/person/${firstPostId}`).expect(200)
      })
      .then(response => {
        const person = response.body
        expect(person.firstName).toBe(inserData[0].firstName)
        expect(person.lastName).toBe(inserData[0].lastName)
        expect(person.email).toBe(inserData[0].email)
      });
  });*/

});