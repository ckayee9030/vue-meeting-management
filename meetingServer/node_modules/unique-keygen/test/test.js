
const expect = require('chai').expect
const uniqueKey = require('../src/index.js');

describe('Test', () => {

  it('Rigrous test', () => {
    expect(1).to.equal(1);
  });

  it('should generate a key of length 5', () => {
    expect(uniqueKey(5).length).to.equal(5);
  });

  it('should not generate any key', () => {
    expect(uniqueKey(-1).length).to.equal(0);
  });

});

