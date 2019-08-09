import person from './../data/person';
import PeopleJSONAdapter from './PeopleJSONAdapter';

describe('People Adapter Interface', () => {
  let peopleJSONAdapter;

  beforeEach(() => {
    peopleJSONAdapter = new PeopleJSONAdapter();
  });

  test('getPerson() returns an observable', () => {
    expect(rxjs.isObservable(peopleJSONAdapter.getPerson())).toBeTruthy();
  });

  test('getPerson() returns a person data', (done) => {
    peopleJSONAdapter.getPerson(person.id).subscribe((data) => {
      expect(data).toEqual(person);
      done();
    });
  });

  test('getPerson() throws a proper error message', (done) => {
    const personID = 'personID';

    peopleJSONAdapter.getPerson(personID).subscribe(
      () => {},
      (error) => {
        expect(error.message).toBe(`Could not find person with id "${personID}"`);
        done();
      }
    );
  });

  test('getPerson() completes the observable', (done) => {
    peopleJSONAdapter.getPerson(person.id).subscribe(
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
