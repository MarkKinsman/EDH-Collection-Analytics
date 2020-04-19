var assert = require('chai').assert;
describe('Wrapper', function () {
 it('should return number of charachters in a string', function () {
        assert("Hello".length === 5);
    });
 it('should return first charachter of the string', function () {
        assert.equal("Hello".charAt(0), 'H');
    });
});