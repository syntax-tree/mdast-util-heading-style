'use strict';

/* eslint-env mocha */

/*
 * Dependencies.
 */

var style = require('./index.js');
var mdast = require('mdast');
var assert = require('assert');

/*
 * Methods.
 */

var throws = assert.throws;
var equal = assert.strictEqual;

/*
 * Tests.
 */

describe('mdast-util-heading-style', function () {
    it('should fail without node', function () {
        throws(function () {
            style();
        });
    });

    it('should NOT fail on undetectable nodes', function () {
        equal(null, style({
            'type': 'heading',
            'children': [
                {
                    'type': 'text',
                    'value': 'foo'
                }
            ]
        }));
    });

    it('should work', function () {
        equal(style(mdast.parse('# ATX').children[0]), 'atx');

        equal(style(mdast.parse('# ATX #').children[0]), 'atx-closed');

        equal(style(mdast.parse('ATX\n===').children[0]), 'setext');
    });

    it('should work on ambiguous nodes', function () {
        equal(style(mdast.parse('### ATX').children[0]), null);

        equal(style(mdast.parse('### ATX').children[0], 'atx'), 'atx');

        equal(style(mdast.parse('### ATX').children[0], 'setext'), 'setext');
    });

    it('should work on empty nodes', function () {
        equal(
            style(mdast.parse('###### ######').children[0]),
            'atx-closed'
        );

        equal(
            style(mdast.parse('### ###').children[0]),
            'atx-closed'
        );

        equal(
            style(mdast.parse('# #').children[0]),
            'atx-closed'
        );

        equal(
            style(mdast.parse('###### ').children[0], 'atx'),
            'atx'
        );

        equal(
            style(mdast.parse('### ').children[0], 'atx'),
            'atx'
        );

        equal(
            style(mdast.parse('# ').children[0], 'setext'),
            'atx'
        );

        equal(
            style(mdast.parse('###### ').children[0], 'setext'),
            'setext'
        );

        equal(
            style(mdast.parse('### ').children[0], 'setext'),
            'setext'
        );

        equal(
            style(mdast.parse('# ').children[0], 'setext'),
            'atx'
        );
    });
});
