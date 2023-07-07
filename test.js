/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Heading} Heading
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {headingStyle} from 'mdast-util-heading-style'

test('headingStyle', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(
      Object.keys(await import('mdast-util-heading-style')).sort(),
      ['headingStyle']
    )
  })

  await t.test('should fail without node', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      headingStyle()
    })
  })

  await t.test('should NOT fail on undetectable nodes', async function () {
    assert.equal(
      // @ts-expect-error: check that an error is thrown at runtime.
      headingStyle({
        type: 'heading',
        children: [{type: 'text', value: 'foo'}]
      }),
      undefined
    )
  })

  await t.test('should detect atx', async function () {
    assert.equal(headingStyle(parseFirstNode('# ATX')), 'atx')
  })

  await t.test('should detect closed atx', async function () {
    assert.equal(headingStyle(parseFirstNode('# ATX #')), 'atx-closed')
  })

  await t.test('should detect closed setext', async function () {
    assert.equal(headingStyle(parseFirstNode('ATX\n===')), 'setext')
  })

  await t.test('should work on ambiguous nodes', async function () {
    assert.equal(headingStyle(parseFirstNode('### ATX')), undefined)
  })

  await t.test(
    'should work on ambiguous nodes (preference to atx)',
    async function () {
      assert.equal(headingStyle(parseFirstNode('### ATX'), 'atx'), 'atx')
    }
  )

  await t.test(
    'should work on ambiguous nodes (preference to setext)',
    async function () {
      assert.equal(headingStyle(parseFirstNode('### ATX'), 'setext'), 'setext')
    }
  )

  await t.test('should work on empty nodes (#1)', async function () {
    assert.equal(headingStyle(parseFirstNode('###### ######')), 'atx-closed')
  })

  await t.test('should work on empty nodes (#2)', async function () {
    assert.equal(headingStyle(parseFirstNode('### ###')), 'atx-closed')
  })

  await t.test('should work on empty nodes (#3)', async function () {
    assert.equal(headingStyle(parseFirstNode('# #')), 'atx-closed')
  })

  await t.test('should work on empty nodes (#4)', async function () {
    assert.equal(headingStyle(parseFirstNode('###### '), 'atx'), 'atx')
  })

  await t.test('should work on empty nodes (#5)', async function () {
    assert.equal(headingStyle(parseFirstNode('### '), 'atx'), 'atx')
  })

  await t.test('should work on empty nodes (#6)', async function () {
    assert.equal(headingStyle(parseFirstNode('## ')), 'atx')
  })

  await t.test('should work on empty nodes (#7)', async function () {
    assert.equal(headingStyle(parseFirstNode('###### '), 'setext'), 'setext')
  })

  await t.test('should work on empty nodes (#8)', async function () {
    assert.equal(headingStyle(parseFirstNode('### '), 'setext'), 'setext')
  })

  await t.test('should work on empty nodes (#9)', async function () {
    assert.equal(headingStyle(parseFirstNode('## '), 'setext'), 'atx')
  })
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
  // To do: remove cast when `from-markdown` is released.
  const tree = /** @type {Root} */ (fromMarkdown(doc))
  const head = tree.children[0]
  assert(head.type === 'heading')
  return head
}
