const range = require('./pokemonRange');

test('returns a valid low range', () => {
  expect(range).toBeGreaterThan(-1);


});

test('returns a valid high range', () => {
  expect(range).toBeLessThan(151);

});


expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

test('acceptable numeric ranges', () => {
  expect(range).toBeWithinRange(0, 150);

});
