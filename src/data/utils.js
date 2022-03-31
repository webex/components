// eslint-disable-next-line import/no-extraneous-dependencies
import {faker} from '@faker-js/faker';

/**
 * Creates a mock activity
 *
 * @param {object} o An activity
 * @returns {object} An activity object
 */
export function createActivity(o) {
  return {
    roomID: 'room5',
    personID: `user${faker.datatype.number({
      min: 1,
      max: 5,
    })}`,
    text: `${o.ID} ${faker.lorem.paragraphs(1)}`,
    created: faker.date.recent(14).toISOString(),
    ...o,
  };
}

/**
 * Creates a mock attachment.
 *
 * @returns {object} An attachment
 */
export function createAttachment() {
  return {
    id: faker.datatype.uuid(),
    fileSize: faker.datatype.number(),
    displayName: faker.random.word(),
    mimeType: 'image/gif',
    url: faker.image.city(600, 600, true),
    type: 'images',
  };
}

let idCount = 0;

/**
 * Creates an array of mock activities.
 *
 * @param {number} count The number of activities to create
 * @param {string} prefix The prefix for id
 * @param {object} o The shape to pass to createActivity
 * @returns {Array} Of mock activities
 */
export function createActivities(count = 25, prefix = 'activity', o = {}) {
  const out = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < count; i++) {
    // eslint-disable-next-line no-plusplus
    idCount++;
    const act = createActivity({
      ID: `${prefix}-${idCount}`,
      parentID: faker.datatype.boolean() ? `activity-${faker.datatype.number({min: 1, max: idCount})}` : null,
      attachments: faker.datatype.boolean() ? [createAttachment()] : [],
      ...o,
    });

    out.push(act);
  }

  return out;
}

const mockActivities = createActivities(50, 'activity', {parentID: null});
const mockReplyActivities = createActivities(50, 'activity-reply');
const allActivityIds = mockActivities.map((a) => a.ID);

const activityMap = {};

[...mockActivities, ...mockReplyActivities].forEach((act) => {
  activityMap[act.ID] = act;
});

export {
  mockActivities, allActivityIds, mockReplyActivities, activityMap,
};
