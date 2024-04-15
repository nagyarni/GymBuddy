const localStorageMock = {
  getItem: jest.fn().mockImplementation((key) => {
    // Mock JWT token
    if (key === 'token') {
      return 'your-mock-jwt-token-here';
    }

    // Mock user data with exp property
    if (key === 'user') {
      return JSON.stringify({ exp: 123456789 }); // Set exp to a valid timestamp
    }
  }),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

global.localStorage = localStorageMock;