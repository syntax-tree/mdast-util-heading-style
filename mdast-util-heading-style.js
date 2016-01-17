(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mdastUtilHeadingStyle = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer. All rights reserved.
 * @module mdast:util:heading-style
 * @fileoverview Utility to get the style of an mdast heading.
 */

'use strict';

/**
 * Get the probable style of an atx-heading, depending on
 * preferred style.
 *
 * @example
 *   consolidate(1, 'setext') // 'atx'
 *   consolidate(1, 'atx') // 'atx'
 *   consolidate(3, 'setext') // 'setext'
 *   consolidate(3, 'atx') // 'atx'
 *
 * @private
 * @param {number} depth - Depth of heading.
 * @param {string?} relative - Preferred style.
 * @return {string?} - Type.
 */
function consolidate(depth, relative) {
    return depth < 3 ? 'atx' :
        relative === 'atx' || relative === 'setext' ? relative : null;
}

/**
 * Check the style of a heading.
 *
 * @example
 *   style(); // null
 *
 *   style(remark.parse('# foo').children[0]); // 'atx'
 *
 *   style(remark.parse('# foo #').children[0]); // 'atx-closed'
 *
 *   style(remark.parse('foo\n===').children[0]); // 'setext'
 *
 * @param {Node} node - Node to check.
 * @param {string?} relative - Heading type which we'd wish
 *   this to be.
 * @return {string?} - Type, either `'atx-closed'`,
 *   `'atx'`, or `'setext'`.
 */
function style(node, relative) {
    var last = node.children[node.children.length - 1];
    var depth = node.depth;
    var pos = node && node.position && node.position.end;
    var final = last && last.position && last.position.end;

    if (!pos) {
        return null;
    }

    /*
     * This can only occur for atx and `'atx-closed'`
     * headings.  This might incorrectly match `'atx'`
     * headings with lots of trailing white space as an
     * `'atx-closed'` heading.
     */

    if (!last) {
        if (pos.column - 1 <= depth * 2) {
            return consolidate(depth, relative);
        }

        return 'atx-closed';
    }

    if (final.line + 1 === pos.line) {
        return 'setext';
    }

    if (final.column + depth < pos.column) {
        return 'atx-closed';
    }

    return consolidate(depth, relative);
}

/*
 * Expose.
 */

module.exports = style;

},{}]},{},[1])(1)
});