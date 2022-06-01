import people from '../data/people';
import PeopleJSONAdapter from './PeopleJSONAdapter';

describe('People JSON Adapter Interface', () => {
  let personID;
  let peopleJSONAdapter;

  beforeEach(() => {
    [personID] = Object.keys(people);
    peopleJSONAdapter = new PeopleJSONAdapter(people);
  });

  afterEach(() => {
    peopleJSONAdapter = null;
  });

  describe('getMe()', () => {
    test('returns default person data', (done) => {
      peopleJSONAdapter.getMe().subscribe((data) => {
        expect(data).toEqual(people[personID]);
        done();
      });
    });
  });

  describe('getPerson()', () => {
    test('returns a person data', (done) => {
      peopleJSONAdapter.getPerson(personID).subscribe((data) => {
        expect(data).toEqual(people[personID]);
        done();
      });
    });

    test('throws a proper error message', (done) => {
      const wrongPersonID = 'wrongPersonID';

      peopleJSONAdapter.getPerson(wrongPersonID).subscribe(
        () => {},
        (error) => {
          expect(error.message).toBe(`Could not find person with ID "${wrongPersonID}"`);
          done();
        },
      );
    });

    test('completes the observable', (done) => {
      peopleJSONAdapter.getPerson(personID).subscribe(
        () => {},
        () => {},
        () => {
          expect(true).toBeTruthy();
          done();
        },
      );
    });
  });

  describe('searchPeople()', () => {
    test('returns people list on search', (done) => {
      peopleJSONAdapter.searchPeople(personID).subscribe((data) => {
        expect(data).toEqual(people[personID]);
        done();
      });
    });

    test('throws an error message', (done) => {
      const wrongPersonName = 'wrongPersonName';

      peopleJSONAdapter.searchPeople(wrongPersonName).subscribe(
        () => {},
        (error) => {
          expect(error.message).toBe(`could not find the person with query${wrongPersonName}`);
          done();
        },
      );
    });

    test('completes the observable', (done) => {
      peopleJSONAdapter.searchPeople(personID).subscribe(
        () => {},
        () => {},
        () => {
          expect(true).toBeTruthy();
          done();
        },
      );
    });
  });
});
