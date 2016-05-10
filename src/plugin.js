const marked = require('marked');


module.exports = options => {
  options = options || {};

  if(!options.collection) throw new Error('`collection` option is required.');
  if(!options.property) throw new Error('`property` option is required.');

  return function(files, metalsmith, done){
    var metadata = metalsmith.metadata();

    if(!metadata.collections)
      throw new Error('there are no collections configured - see metalsmith-collections plugin.');

    if(!(options.collection in metadata.collections))
      throw new Error(`the collection '${options.collection}' does not exist.`);

    const collection = options.collection;
    const property = options.property;

    metadata.collections[collection].forEach(file => {
      if(property in file) file[property] = marked(file[property]);
    });

    done();
  };
};
