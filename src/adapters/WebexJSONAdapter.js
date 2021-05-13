import {WebexAdapter} from '@webex/component-adapter-interfaces';
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
export default class WebexJSONAdapter extends WebexAdapter {
  constructor(datasource) {
    super(datasource);

    this.activitiesAdapter = new ActivitiesJSONAdapter(datasource.activities);
    this.meetingsAdapter = new MeetingsJSONAdapter(datasource.meetings);
    this.membershipsAdapter = new MembershipJSONAdapter(datasource.memberships);
    this.organizationsAdapter = new OrganizationsJSONAdapter(datasource.organizations);
    this.peopleAdapter = new PeopleJSONAdapter(datasource.people);
    this.roomsAdapter = new RoomsJSONAdapter(datasource.rooms);
  }

  /**
   * Connects the adapter to its datasource.
   *
   * @returns {Promise} A promise that resolves when the adapter finishes connecting
   */
  connect() {
    return Promise.resolve(this);
  }

  /**
   * Disconnects the adapter from its datasource.
   *
   * @returns {Promise} A promise that resolves when the adapter finishes disconnecting
   */
  disconnect() {
    return Promise.resolve(this);
  }
}
