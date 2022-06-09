// HTTP-kéréseket szimulálnak
const { mockRequest, mockResponse } = require("jest-mock-req-res");
const createError = require("http-errors");

const personController = require('./person.controller');
const personService = require('./person.service');

// innen tudja, hogy a mocks mappából kell vennie a person service-t
jest.mock('./person.service');

// teszt esetek
describe('person controller', () => {
  const mockData = [{
    "id": 1,
    "first_name": "Fiorenze",
    "last_name": "Dyneley",
    "email": "fdyneley0@narod.ru"
  }, {
    "id": 2,
    "first_name": "Owen",
    "last_name": "Jirka",
    "email": "ojirka1@squidoo.com"
  }, {
    "id": 3,
    "first_name": "Terra",
    "last_name": "Hurdman",
    "email": "thurdman2@reverbnation.com"
  }, {
    "id": 4,
    "first_name": "Thomasin",
    "last_name": "de Keep",
    "email": "tdekeep3@fc2.com"
  }, {
    "id": 5,
    "first_name": "Lawrence",
    "last_name": "Tearle",
    "email": "ltearle4@infoseek.co.jp"
  }];

  let response;
  const nextFunction = jest.fn();

  // minden teszteset előtt lefut
  /*beforeEach(() => {
    // a teszteléshez a mockData adatait szeretném használni
    personService.__setMockData(mockData);
    // mockolható teszt válasz
    response = mockResponse();
  });

  // Unit teszt
  test("find one with valid id", () => {
    const PERSON_ID = 1;

    // HTTP request-hez hasonlóan működik
    const request = mockRequest({
      params: {
        id: PERSON_ID
      }
    });

    return personController.findOne(request, response, nextFunction)
      .then(() => {
        // tesztelés - meghívásra került-e?
        expect(personService.findOne).toBeCalledWith(PERSON_ID);
        // tesztelés - meghívásra került-e a response.json metódusa az általunk megadott adattal?
        expect(response.json).toBeCalledWith(
          mockData.find(p => p.id === PERSON_ID)
        );
      });
  });*/
});