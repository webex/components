import person from './../data/people';
import PeopleJSONAdapter from './PeopleJSONAdapter';

describe('People Adapter Interface', () => {
  let peopleJSONAdapter, peopleJSON;

  beforeEach(() => {
    peopleJSON = {};
    peopleJSON[person.ID] = person;
    peopleJSONAdapter = new PeopleJSONAdapter(peopleJSON);
  });

  test('getPerson() returns an observable', () => {
    expect(rxjs.isObservable(peopleJSONAdapter.getPerson())).toBeTruthy();
  });

  test('getPerson() returns a person data', (done) => {
    peopleJSONAdapter.getPerson(person.ID).subscribe((data) => {
      expect(data).toEqual(person);
      done();
    });
  });

  test('getPerson() throws a proper error message', (done) => {
    const personID = 'personID';

    peopleJSONAdapter.getPerson(personID).subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe(`Could not find person with ID "${personID}"`);
        done();
      }
    );
  });

  test('getPerson() completes the observable', (done) => {
    peopleJSONAdapter.getPerson(person.ID).subscribe(
      () => {},
      () => {},
      () => {
        expect(true).toBeTruthy();
        done();
      }
    );
  });

  afterEach(() => {
    peopleJSONAdapter = null;
  });
});
