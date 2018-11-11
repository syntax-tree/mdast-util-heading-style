# mdast-util-heading-style

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Chat][chat-badge]][chat]

Get the style of [**mdast**][mdast] headings.

## Installation

[npm][]:

```bash
npm install mdast-util-heading-style
```

## Usage

```js
var style = require('mdast-util-heading-style')
var remark = require('remark')()

style(remark.parse('# ATX').children[0]) // => 'atx'
style(remark.parse('# ATX #\n').children[0]) // => 'atx-closed'
style(remark.parse('ATX\n===').children[0]) // => 'setext'

style(remark.parse('### ATX').children[0]) // => null
style(remark.parse('### ATX').children[0], 'setext') // => 'setext'
```

## API

### `style(node[, relative])`

Get the heading style of a node.

###### Parameters

*   `node` ([`Node`][node]) — Node to parse
*   `relative` (`string`, optional) — Style to use for ambiguous headings
    (atx-headings with a level of three or more could also be setext)

###### Returns

`string` (`'atx'`, `'atx-closed'`, or `'setext'`) — When an ambiguous
heading is found, either `relative` or `null` is returned.

## Contribute

See [`contributing.md` in `syntax-tree/mdast`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/syntax-tree/mdast-util-heading-style.svg

[build]: https://travis-ci.org/syntax-tree/mdast-util-heading-style

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/mdast-util-heading-style.svg

[coverage]: https://codecov.io/github/syntax-tree/mdast-util-heading-style

[downloads-badge]: https://img.shields.io/npm/dm/mdast-util-heading-style.svg

[downloads]: https://www.npmjs.com/package/mdast-util-heading-style

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/remark

[license]: license

[author]: https://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[mdast]: https://github.com/syntax-tree/mdast

[node]: https://github.com/syntax-tree/unist#node

[contributing]: https://github.com/syntax-tree/mdast/blob/master/contributing.md

[coc]: https://github.com/syntax-tree/mdast/blob/master/code-of-conduct.md
