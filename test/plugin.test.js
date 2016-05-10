const expect = require('chai').expect;
const metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const propdown = require('../src/plugin');


describe('Initialization', () => {
  var metal;

  before(() => metal = metalsmith('test/fixtures'));

  it('should be a function', () => {
    expect(propdown).to.be.a.function;
  });

  it('should return a function', () => {
    expect(propdown({
      collection: 'collectionname',
      property: 'propertyname' }
    )).to.be.a.function;
  });

  it('should require collection name', () => {
    expect(propdown.bind(null, { property: 'name' })).to.throw(Error);
  });

  it('should require property name', () => {
    expect(propdown.bind(null, { collection: 'name' })).to.throw(Error);
  });

  it('should require collections to be configured', () => {
    metal._metadata = {};
    const call = propdown({
      collection: 'collectionname',
      property: 'propertyname'
    }).bind(null, [], metal, () => {});

    expect(call).to.throw(Error);
  });

  it('should throw error if collection doesnt exist', () => {
    metal._metadata.collections = {};
    const call = propdown({
      collection: 'posts',
      property: 'propertyname'
    }).bind(null, [], metal, () => {});

    expect(call).to.throw(Error);
  });

  it('should not throw error if collection exist', () => {
    metal._metadata.collections = { articles: [] };
    const call = propdown({
      collection: 'articles',
      property: 'propertyname'
    }).bind(null, [], metal, () => {});

    expect(call).not.to.throw(Error);
  });
});


describe('Generation', () => {
  var metalpipeline = propdownoptions => (
    metalsmith('test')
      .source('fixtures')
      .use(collections({ posts: '*.html' }))
      .use(propdown(propdownoptions))
  );

  it('should do nothing if property doesnt exist in file', done => {
    metalpipeline({
      collection: 'posts',
      property: 'propertyname'
    }).build((err, files) => {
      expect(files['post1.html']).to.have.property('excerpt', 'Some __markdown__ content to _convert_ from post 1.');
      expect(files['post2.html']).to.have.property('excerpt', 'Some __markdown__ \'content\' to _convert_ from post 2.');
      done();
    });
  });

  it('should convert property value from markdown to html', done => {
    metalpipeline({
      collection: 'posts',
      property: 'excerpt'
    }).build((err, files) => {
      expect(files['post1.html']).to.have.property('excerpt').to.contain('<em>', '<strong>', 'post 1');
      expect(files['post2.html']).to.have.property('excerpt').to.contain('<em>', '<strong>', 'post 2');
      done();
    });
  });

  it('should pass markdownOptions to marked (1)', done => {
    metalpipeline({
      collection: 'posts',
      property: 'excerpt',
      markdownOptions: { smartypants: false }
    }).build((err, files) => {
      expect(files['post2.html']).to.have.property('excerpt').to.contain('&#39;');
      done();
    });
  });

  it('should pass markdownOptions to marked (2)', done => {
    metalpipeline({
      collection: 'posts',
      property: 'excerpt',
      markdownOptions: { smartypants: true }
    }).build((err, files) => {
      expect(files['post2.html']).to.have.property('excerpt').to.not.contain('&#39;');
      done();
    });
  });
});
