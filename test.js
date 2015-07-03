'use strict';

/* eslint-env mocha */

/*
 * Dependencies.
 */

var style = require('./index.js');
var mdast = require('mdast');
var assert = require('assert');

// console.log(JSON.stringify(mdast.parse('# #'), 0, 2));

/*
 * Tests.
 */

describe('mdast-util-heading-style', function () {
    it('should fail without node', function () {
        assert.throws(function () {
            style();
        });
    });

    it('should NOT fail on undetectable nodes', function () {
        assert.equal(null, style({
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
        assert.equal(
            style(mdast.parse('# ATX').children[0]),
            'atx'
        );

        assert.equal(
            style(mdast.parse('# ATX #').children[0]),
            'atx-closed'
        );

        assert.equal(
            style(mdast.parse('ATX\n===').children[0]),
            'setext'
        );
    });

    it('should work on ambiguous nodes', function () {
        assert.equal(
            style(mdast.parse('### ATX').children[0]),
            null
        );

        assert.equal(
            style(mdast.parse('### ATX').children[0], 'atx'),
            'atx'
        );

        assert.equal(
            style(mdast.parse('### ATX').children[0], 'setext'),
            'setext'
        );
    });

    it('should work on empty nodes', function () {
        assert.equal(
            style(mdast.parse('###### ######').children[0]),
            'atx-closed'
        );

        assert.equal(
            style(mdast.parse('### ###').children[0]),
            'atx-closed'
        );

        assert.equal(
            style(mdast.parse('# #').children[0]),
            'atx-closed'
        );

        assert.equal(
            style(mdast.parse('###### ').children[0], 'atx'),
            'atx'
        );

        assert.equal(
            style(mdast.parse('### ').children[0], 'atx'),
            'atx'
        );

        assert.equal(
            style(mdast.parse('# ').children[0], 'setext'),
            'atx'
        );

        assert.equal(
            style(mdast.parse('###### ').children[0], 'setext'),
            'setext'
        );

        assert.equal(
            style(mdast.parse('### ').children[0], 'setext'),
            'setext'
        );

        assert.equal(
            style(mdast.parse('# ').children[0], 'setext'),
            'atx'
        );
    });
});
