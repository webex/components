import people from './../data/people';
import PeopleJSONAdapter from './PeopleJSONAdapter';

describe('People JSON Adapter Interface', () => {
  let peopleJSONAdapter, personID;

  beforeEach(() => {
    [personID] = Object.keys(people);
    peopleJSONAdapter = new PeopleJSONAdapter(people);
  });

  test('getPerson() returns an observable', () => {
    expect(rxjs.isObservable(peopleJSONAdapter.getPerson())).toBeTruthy();
  });

  test('getPerson() returns a person data', (done) => {
    peopleJSONAdapter.getPerson(personID).subscribe((data) => {
      expect(data).toEqual(people[personID]);
      done();
    });
  });

  test('getPerson() throws a proper error message', (done) => {
    const wrongPersonID = 'wrongPersonID';

    peopleJSONAdapter.getPerson(wrongPersonID).subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe(`Could not find person with ID "${wrongPersonID}"`);
        done();
      }
    );
  });

  test('getPerson() completes the observable', (done) => {
    peopleJSONAdapter.getPerson(personID).subscribe(
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
