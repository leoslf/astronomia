/* eslint key-spacing: 0 */

import assert from 'assert'
import float from './support/float.js'
import { elliptic, planetposition, julian, sexagesimal as sexa, data } from '../src/index.js'

describe('elliptic', function () {
  const earth = new planetposition.Planet(data.vsop87Bearth)

  it('position()', function () {
    // Example 33.a, p. 225.0  VSOP87 result p. 227.0
    const venus = new planetposition.Planet(data.vsop87Bvenus)
    const eq = elliptic.position(venus, earth, 2448976.5)
    assert.strictEqual(new sexa.RA(eq.ra).toString(3), '21ʰ4ᵐ41.454ˢ')
    assert.strictEqual(new sexa.Angle(eq.dec).toString(2), '-18°53′16.84″')
  })

  it('Elements.position()', function () {
    // Example 33.b, p. 232.0
    const k = new elliptic.Elements({
      axis:  2.2091404,
      ecc:   0.8502196,
      inc:   11.94524 * Math.PI / 180,
      node:  334.75006 * Math.PI / 180,
      argP:  186.23352 * Math.PI / 180,
      timeP: julian.CalendarGregorianToJD(1990, 10, 28.54502)
    })
    const j = julian.CalendarGregorianToJD(1990, 10, 6)
    const pos = k.position(j, earth)
    const α = pos.ra // ascension
    const δ = pos.dec // declination
    const ψ = pos.elongation // elongation
    assert.strictEqual(new sexa.RA(α).toString(1), '10ʰ34ᵐ14.2ˢ')
    assert.strictEqual(new sexa.Angle(δ).toString(0), '19°9′31″')
    assert.strictEqual(float(ψ * 180 / Math.PI).toFixed(2), 40.51)
  })

  it('velocity()', function () {
    // Example 33.c, p. 238
    assert.strictEqual(float(elliptic.velocity(17.9400782, 1)).toFixed(2), 41.53)
  })

  it('vPerihelion()', function () {
    // Example 33.c, p. 238
    assert.strictEqual(float(elliptic.vPerihelion(17.9400782, 0.96727426)).toFixed(2), 54.52)
  })

  it('vAphelion()', function () {
    assert.strictEqual(float(elliptic.vAphelion(17.9400782, 0.96727426)).toFixed(2), 0.91)
  })

  it('length1()', function () {
    // Example 33.d, p. 239
    assert.strictEqual(float(elliptic.length1(17.9400782, 0.96727426)).toFixed(2), 77.06)
  })

  it('length2()', function () {
    // Example 33.d, p. 239
    assert.strictEqual(float(elliptic.length2(17.9400782, 0.96727426)).toFixed(2), 77.09)
  })

  /*
  it('length3()', function () {
    // Example 33.d, p. 239
    assert.strictEqual(float(elliptic.length3(17.9400782, 0.96727426)).toFixed(2), 77.07)
  })
  */

  it('length4()', function () {
    // Example 33.d, p. 239
    assert.strictEqual(float(elliptic.length4(17.9400782, 0.96727426)).toFixed(2), 77.07)
  })
})
