export default class MeetingControl {
  /**
   * Creates a new instance of the MeetingControl.
   *
   * @param {object} adapter  Meeting adapter object
   * @param {string} controlID  The id of the control
   */
  constructor(adapter, controlID) {
    this.adapter = adapter;
    this.ID = controlID;
  }
}
