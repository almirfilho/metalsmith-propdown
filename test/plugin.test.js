const expect = require('chai').expect;
const metalsmith = require('metalsmith');
const author = require('../src/plugin');


describe('Initialization', () => {
  var metal;

  before(() => metal = metalsmith('test/fixtures'));

  it('should be a function', () => {
    expect(author).to.be.a.function;
  });

  it('should return a function', () => {
    expect(author({ collection: 'something' })).to.be.a.function;
  });

  it('should require collection name', () => {
    expect(author).to.throw(Error);
  });

  it('should require collections to be configured', () => {
    metal._metadata = {};
    const call = author({ collection: 'name' }).bind(null, [], metal, () => {});
    expect(call).to.throw(Error);
  });

  it('should throw error if collection doesnt exist', () => {
    metal._metadata.collections = {};
    const call = author({ collection: 'posts' }).bind(null, [], metal, () => {});
    expect(call).to.throw(Error);
  });

  it('should not throw error if collection exist', () => {
    metal._metadata.collections = { articles: [] };
    const call = author({ collection: 'articles' }).bind(null, [], metal, () => {});
    expect(call).not.to.throw(Error);
  });
});
