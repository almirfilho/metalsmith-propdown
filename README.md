# metalsmith-propdown [![Build Status][travis-badge]][travis] [![npm][npm-badge]][npm]

> A [metalsmith][metal] plugin to convert a property value from markdown to
> HTML.

Useful if you have other markdown data to convert in a file besides `contents`.  
Requires [metalsmith-collections][collections] plugin to work.
This plugin uses [marked][marked] to make markdown conversions.


## Installation

Install it via NPM:

```bash
$ npm install metalsmith-propdown
```


## Usage

```javascript
const metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const propdown = require('metalsmith-propdown');

metalsmith('working/dir')
  .use(collections({posts: '*.html'}))
  .use(propdown({ // make sure it comes after collections
    collection: 'posts',
    property: 'excerpt'
  }))
```

Will convert content of each `excerpt` property in posts collection files.


## Options

#### `collection`

Type: __String__ _(Required)_  
Name of the configured [metalsmith-collection][collections] to process files
from (see the usage example above).


#### `property`

Type: __String__ _(Required)_  
Property in which value must be converted from markdown to HTML.


#### `markdownOptions`

Type: __Object__ _(Optional)_  
Object containing markdown options passed to [marked][marked].


## Contributing

Fork this repo, install the dependecies, run the tests, submit a pull request.

```bash
$ cd metalsmith-propdown
$ npm install
$ grunt test
```

### No grunt? No problem

You can run any grunt task just with npm scripts: `npm run grunt -- <taskname>`.
The following command is the same as `grunt test`:

```bash
$ npm run grunt -- test
```

### Automated workflow

You can keep the tests running automaticaly every time you make any change to
the code with `dev` workflow:

```bash
$ grunt dev
$ npm run grunt -- dev
```

Always implement tests for whatever you're adding to the project. Thanks!


## License

[MIT][license] © Almir Filho


[travis]: https://travis-ci.org/almirfilho/metalsmith-propdown
[travis-badge]: https://travis-ci.org/almirfilho/metalsmith-propdown.svg?branch=master
[npm]: https://www.npmjs.com/package/metalsmith-propdown
[npm-badge]: https://img.shields.io/npm/v/metalsmith-propdown.svg?maxAge=3600
[metal]: http://www.metalsmith.io/
[collections]: https://github.com/segmentio/metalsmith-collections
[marked]: https://github.com/chjj/marked
[license]: https://github.com/almirfilho/metalsmith-propdown/blob/master/LICENSE
