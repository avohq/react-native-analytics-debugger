jest.mock('react-native/Libraries/Settings/Settings.ios.js', () => ({
  get: jest.fn(() => null),
  set: jest.fn()
}));

jest.mock('react-native/Libraries/Utilities/BackHandler.ios.js', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));
