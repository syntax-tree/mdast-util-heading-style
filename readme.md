# mdast-util-heading-style [![Build Status][travis-badge]][travis] [![Coverage Status][coverage-badge]][coverage]

Utility to get the style of an [**mdast**][mdast] heading.

## Installation

[npm][npm-install]:

```bash
npm install mdast-util-heading-style
```

**mdast-util-heading-style** is also available for [duo][],
and as an AMD, CommonJS, and globals module,
[uncompressed and compressed][releases].

## Usage

```js
var remark = require('remark');
var style = require('mdast-util-heading-style');

style(remark.parse('# ATX').children[0]); // 'atx'
style(remark.parse('# ATX #\n').children[0]); // 'atx-closed'
style(remark.parse('ATX\n===').children[0]); // 'setext'

style(remark.parse('### ATX').children[0]); // null
style(remark.parse('### ATX').children[0], 'setext'); // 'setext'
```

## API

### `style(node[, relative])`

Get the heading style of a node.

**Parameters**:

*   `node` ([`Node`][mdast-node]);

*   `relative` (`string`, optional) — Style to use for ambiguous headings
    (atx-headings with a level of three or more could also be setext).

**Returns**: `string` (`'atx'`, `'atx-closed'`, or `'setext'`)
— When an ambiguous heading is found, either `relative` or `null` is
returned.

## License

[MIT][license] © [Titus Wormer][home]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/mdast-util-heading-style.svg

[travis]: https://travis-ci.org/wooorm/mdast-util-heading-style

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/mdast-util-heading-style.svg

[coverage]: https://codecov.io/github/wooorm/mdast-util-heading-style

[mdast]: https://github.com/wooorm/mdast

[mdast-node]: https://github.com/wooorm/mdast#node

[npm-install]: https://docs.npmjs.com/cli/install

[duo]: http://duojs.org/#getting-started

[releases]: https://github.com/wooorm/mdast-util-heading-style/releases

[license]: LICENSE

[home]: http://wooorm.com
