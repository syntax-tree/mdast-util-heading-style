# mdast-util-heading-style [![Build Status](https://img.shields.io/travis/wooorm/mdast-util-heading-style.svg)](https://travis-ci.org/wooorm/mdast-util-heading-style) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/mdast-util-heading-style.svg)](https://codecov.io/github/wooorm/mdast-util-heading-style)

Utility to get the style of an [**mdast**](https://github.com/wooorm/mdast)
heading.

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install mdast-util-heading-style
```

**mdast-util-heading-style** is also available for [duo](http://duojs.org/#getting-started),
and as an AMD, CommonJS, and globals module, [uncompressed](mdast-util-heading-style.js) and
[compressed](mdast-util-heading-style.min.js).

## Usage

```js
var remark = require('remark');
var style = require('mdast-util-heading-style');

style(remark.parse('# ATX').children[0]); // 'atx'
style(remark.parse('# ATX #\n').children[0]); // 'atx-closed'
style(remark.parse('ATX\n===').children[0]); // 'setext'

style(remark.parse('### ATX').children[0]); // null
style(remark.parse('### ATX').children[0], 'setext'); // 'atx'
```

## API

### style(node\[, relative])

Get the heading style of a node.

Parameters:

*   `node` ([`Node`](https://github.com/wooorm/mdast/blob/master/doc/nodes.md));

*   `relative` (`string`, optional) — Style to use for ambiguous headings
    (atx-headings with a level of three or more could also be setext).

Return: `string` (`'atx'`, `'atx-closed'`, or `'setext'`). When an ambiguous
heading is found, either `relative` or `null` is returned.

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
