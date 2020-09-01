const MockDate = require('mockdate');

// Fix "now" date-time for tests
MockDate.set('August 1, 2020 10:00:00 UTC');

// Mock Web Media APIs
global.MediaStream = jest.fn();
