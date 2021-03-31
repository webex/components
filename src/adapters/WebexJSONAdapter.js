import ActivitiesJSONAdapter from './ActivitiesJSONAdapter';
import MeetingsJSONAdapter from './MeetingsJSONAdapter';
import MembershipJSONAdapter from './MembershipJSONAdapter';
import OrganizationsJSONAdapter from './OrganizationsJSONAdapter';
import PeopleJSONAdapter from './PeopleJSONAdapter';
import RoomsJSONAdapter from './RoomsJSONAdapter';

/**
 * Entry point for the JSON component adapter.
 *
 * @param {object} datasource JSON object that contains all component data
 */
export default class WebexJSONAdapter {
  constructor(datasource) {
    this.activitiesAdapter = new ActivitiesJSONAdapter(datasource.activities);
    this.meetingsAdapter = new MeetingsJSONAdapter(datasource.meetings);
    this.membershipsAdapter = new MembershipJSONAdapter(datasource.memberships);
    this.organizationsAdapter = new OrganizationsJSONAdapter(datasource.organizations);
    this.peopleAdapter = new PeopleJSONAdapter(datasource.people);
    this.roomsAdapter = new RoomsJSONAdapter(datasource.rooms);
  }
}
