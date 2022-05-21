/**
 * @typedef {import('mdast').Root} Root
 */

import assert from 'node:assert'
import test from 'tape'
import {remark} from 'remark'
import {headingStyle} from './index.js'

test('headingStyle', (t) => {
  t.throws(() => {
    // @ts-ignore runtime.
    headingStyle()
  }, 'should fail without node')

  t.equal(
    // @ts-ignore runtime.
    headingStyle({
      type: 'heading',
      children: [{type: 'text', value: 'foo'}]
    }),
    null,
    'should NOT fail on undetectable nodes'
  )

  t.equal(headingStyle(parseFirstNode('# ATX')), 'atx', 'should detect atx')

  t.equal(
    headingStyle(parseFirstNode('# ATX #')),
    'atx-closed',
    'should detect closed atx'
  )

  t.equal(
    headingStyle(parseFirstNode('ATX\n===')),
    'setext',
    'should detect closed setext'
  )

  t.equal(
    headingStyle(parseFirstNode('### ATX')),
    null,
    'should work on ambiguous nodes'
  )

  t.equal(
    headingStyle(parseFirstNode('### ATX'), 'atx'),
    'atx',
    'should work on ambiguous nodes (preference to atx)'
  )

  t.equal(
    headingStyle(parseFirstNode('### ATX'), 'setext'),
    'setext',
    'should work on ambiguous nodes (preference to setext)'
  )

  t.equal(
    headingStyle(parseFirstNode('###### ######')),
    'atx-closed',
    'should work on empty nodes (#1)'
  )

  t.equal(
    headingStyle(parseFirstNode('### ###')),
    'atx-closed',
    'should work on empty nodes (#2)'
  )

  t.equal(
    headingStyle(parseFirstNode('# #')),
    'atx-closed',
    'should work on empty nodes (#3)'
  )

  t.equal(
    headingStyle(parseFirstNode('###### '), 'atx'),
    'atx',
    'should work on empty nodes (#4)'
  )

  t.equal(
    headingStyle(parseFirstNode('### '), 'atx'),
    'atx',
    'should work on empty nodes (#5)'
  )

  t.equal(
    headingStyle(parseFirstNode('## ')),
    'atx',
    'should work on empty nodes (#6)'
  )

  t.equal(
    headingStyle(parseFirstNode('###### '), 'setext'),
    'setext',
    'should work on empty nodes (#7)'
  )

  t.equal(
    headingStyle(parseFirstNode('### '), 'setext'),
    'setext',
    'should work on empty nodes (#8)'
  )

  t.equal(
    headingStyle(parseFirstNode('## '), 'setext'),
    'atx',
    'should work on empty nodes (#9)'
  )

  t.end()
})

/**
 * @param {string} doc
 */
function parseFirstNode(doc) {
  const tree = /** @type {Root} */ (remark.parse(doc))
  const head = tree.children[0]
  assert(head.type === 'heading')
  return head
}
