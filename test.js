/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Heading} Heading
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {headingStyle} from './index.js'

test('headingStyle', () => {
  assert.throws(() => {
    // @ts-ignore runtime.
    headingStyle()
  }, 'should fail without node')

  assert.equal(
    // @ts-ignore runtime.
    headingStyle({
      type: 'heading',
      children: [{type: 'text', value: 'foo'}]
    }),
    null,
    'should NOT fail on undetectable nodes'
  )

  assert.equal(
    headingStyle(parseFirstNode('# ATX')),
    'atx',
    'should detect atx'
  )

  assert.equal(
    headingStyle(parseFirstNode('# ATX #')),
    'atx-closed',
    'should detect closed atx'
  )

  assert.equal(
    headingStyle(parseFirstNode('ATX\n===')),
    'setext',
    'should detect closed setext'
  )

  assert.equal(
    headingStyle(parseFirstNode('### ATX')),
    null,
    'should work on ambiguous nodes'
  )

  assert.equal(
    headingStyle(parseFirstNode('### ATX'), 'atx'),
    'atx',
    'should work on ambiguous nodes (preference to atx)'
  )

  assert.equal(
    headingStyle(parseFirstNode('### ATX'), 'setext'),
    'setext',
    'should work on ambiguous nodes (preference to setext)'
  )

  assert.equal(
    headingStyle(parseFirstNode('###### ######')),
    'atx-closed',
    'should work on empty nodes (#1)'
  )

  assert.equal(
    headingStyle(parseFirstNode('### ###')),
    'atx-closed',
    'should work on empty nodes (#2)'
  )

  assert.equal(
    headingStyle(parseFirstNode('# #')),
    'atx-closed',
    'should work on empty nodes (#3)'
  )

  assert.equal(
    headingStyle(parseFirstNode('###### '), 'atx'),
    'atx',
    'should work on empty nodes (#4)'
  )

  assert.equal(
    headingStyle(parseFirstNode('### '), 'atx'),
    'atx',
    'should work on empty nodes (#5)'
  )

  assert.equal(
    headingStyle(parseFirstNode('## ')),
    'atx',
    'should work on empty nodes (#6)'
  )

  assert.equal(
    headingStyle(parseFirstNode('###### '), 'setext'),
    'setext',
    'should work on empty nodes (#7)'
  )

  assert.equal(
    headingStyle(parseFirstNode('### '), 'setext'),
    'setext',
    'should work on empty nodes (#8)'
  )

  assert.equal(
    headingStyle(parseFirstNode('## '), 'setext'),
    'atx',
    'should work on empty nodes (#9)'
  )
})

/**
 * Get the heading.
 *
 * @param {string} doc
 *   Input markdown.
 * @returns {Heading}
 *   Heading node.
 */
function parseFirstNode(doc) {
  const tree = fromMarkdown(doc)
  const head = tree.children[0]
  assert(head.type === 'heading')
  return head
}
