'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var remark = require('remark');
var style = require('./index.js');

/*
 * Tests.
 */

test('mdast-util-heading-style', function (t) {
    t.throws(
        function () {
            style();
        },
        'should fail without node'
    );

    t.equal(
         style({
            'type': 'heading',
            'children': [
                {
                    'type': 'text',
                    'value': 'foo'
                }
            ]
        }),
        null,
        'should NOT fail on undetectable nodes'
    );

    t.equal(
        style(remark.parse('# ATX').children[0]),
        'atx',
        'should detect atx'
    );

    t.equal(
        style(remark.parse('# ATX #').children[0]),
        'atx-closed',
        'should detect closed atx'
    );

    t.equal(
        style(remark.parse('ATX\n===').children[0]),
        'setext',
        'should detect closed setext'
    );

    t.equal(
        style(remark.parse('### ATX').children[0]),
        null,
        'should work on ambiguous nodes'
    );

    t.equal(
        style(remark.parse('### ATX').children[0], 'atx'),
        'atx',
        'should work on ambiguous nodes (preference to atx)'
    );

    t.equal(
        style(remark.parse('### ATX').children[0], 'setext'),
        'setext',
        'should work on ambiguous nodes (preference to setext)'
    );

    t.equal(
        style(remark.parse('###### ######').children[0]),
        'atx-closed',
        'should work on empty nodes (#1)'
    );

    t.equal(
        style(remark.parse('### ###').children[0]),
        'atx-closed',
        'should work on empty nodes (#2)'
    );

    t.equal(
        style(remark.parse('# #').children[0]),
        'atx-closed',
        'should work on empty nodes (#3)'
    );

    t.equal(
        style(remark.parse('###### ').children[0], 'atx'),
        'atx',
        'should work on empty nodes (#4)'
    );

    t.equal(
        style(remark.parse('### ').children[0], 'atx'),
        'atx',
        'should work on empty nodes (#5)'
    );

    t.equal(
        style(remark.parse('## ').children[0]),
        'atx',
        'should work on empty nodes (#6)'
    );

    t.equal(
        style(remark.parse('###### ').children[0], 'setext'),
        'setext',
        'should work on empty nodes (#7)'
    );

    t.equal(
        style(remark.parse('### ').children[0], 'setext'),
        'setext',
        'should work on empty nodes (#8)'
    );

    t.equal(
        style(remark.parse('## ').children[0], 'setext'),
        'atx',
        'should work on empty nodes (#9)'
    );

    t.end();
});
