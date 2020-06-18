import {
  ActivitiesJSONAdapter,
  MeetingsJSONAdapter,
  MembershipJSONAdapter,
  PeopleJSONAdapter,
  RoomsJSONAdapter,
} from './';

export default class WebexJSONAdapter {
  /**
   * Creates a new instance of the WebexAdapter.
   * The primary datasource model comes from the following structure:
   * WebexJSONAdapter = {
   *  activitiesJSONAdapter: activitiesData,
   *  peopleJSONAdapter: peopleData,
   *  roomsJSONAdapter: roomsData
   * }
   *
   * @param {Object} datasource The primary datasource the json adapter will be using.
   */
  constructor(datasource) {
    this.activitiesAdapter = new ActivitiesJSONAdapter(datasource.activities);
    this.meetingsAdapter = new MeetingsJSONAdapter(datasource.meetings);
    this.peopleAdapter = new PeopleJSONAdapter(datasource.people);
    this.roomsAdapter = new RoomsJSONAdapter(datasource.rooms);
    this.membershipsAdapter = new MembershipJSONAdapter(datasource.members);
  }
}
