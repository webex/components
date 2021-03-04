const MockDate = require('mockdate');

// Fix "now" date-time for tests but keep local timezone
MockDate.set('August 1, 2020 10:00:00');

// Mock Web Media APIs
global.MediaStream = jest.fn();
