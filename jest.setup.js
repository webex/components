import mockDevices from './src/data/devices';

const MockDate = require('mockdate');

// Fix "now" date-time for tests but keep local timezone
MockDate.set('August 1, 2020 10:00:00');

Date.prototype.toLocaleTimeString = () => ('August 1, 2020 10:00:00');

// Mock Web Media APIs
global.MediaStream = jest.fn(function() {
  this.getTracks = () => [];
  return this;
});

global.navigator.mediaDevices = {
  enumerateDevices: jest.fn(() => Promise.resolve(mockDevices)),
  getDisplayMedia: jest.fn(() => Promise.resolve(new MediaStream())),
  getUserMedia: jest.fn(() => Promise.resolve(new MediaStream())),
};

global.Math.random = () => 0.5;
