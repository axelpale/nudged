## Nudged API Documentation

Welcome to the Nudged interface documentation!
The API follows a functional and immutable paradigm without classes.
Thus all the functions take in and return only plain objects and values
such as `{ x: 1, y: 2 }`. The functions never modify the given objects,
never cause side effects, and never memorize previous calls.
In contrast to object-oriented programming, the features are
implemented as pure functions that are grouped
in modules aka namespaces instead of classes.
See the available modules below.

- [nudged.estimate](#nudgedestimate)
- [nudged.estimators](#nudgedestimators)
- [nudged.point](#nudgedpoint)
- [nudged.transform](#nudgedtransform)
- [nudged.analysis](#nudgedanalysis)
- [nudged.tolerance](#nudgedtolerance)
- [nudged.version](#nudgedversion)

<a name="nudgedestimate"></a>
### nudged.estimate(params)

Estimates a transformation with the selected estimator and constraints.
See [nudged.estimators](#nudgedestimators) for available estimators.

<p style="display: inline">Parameters:</p>

- `params`, an object with properties:
  - `estimator`
    - Required string. The name of the estimator.
    - Defines the freedom of the transform to compute.
    - One of the following:
      'I', 'L', 'X', 'Y', 'T', 'S', 'R', 'TS', 'TR', 'SR', 'TSR'
  - `domain`
    - required array of [points](#nudgedpoint) `{ x, y }`.
    - The points before the transform.
  - `range`
    - required array of [points](#nudgedpoint) `{ x, y }`.
    - The points after the transform.
  - `center`
    - optional [point](#nudgedpoint).
    - Used as the center by the estimators 'S', 'R', and 'SR'.
    - If an estimator other than these is selected,
      the center has no effect to the estimation.
  - `angle`
    - optional number. Angle in radians.
    - Used by the estimator 'L'.
    - If an estimator other than 'L' is selected,
      the angle has no effect to the estimation.

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

Internally, this calls the function of the selected estimator.
Therefore, if you desire maximal efficiency instead of flexibility,
use the estimator functions directly via nudged.estimators,
like for example `[nudged.estimators.R](#nudgedestimatorsR)(domain, range, center)`

Example:

    > const domain = [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 2 }]
    > const range  = [{ x: 1, y: 1 }, { x: 1, y: 3 }, { x: -1, y: 2 }]
    > const center = { x: 0, y: 0 }
    > const tr = nudged.estimate({
    estimator: 'SR',
    domain: domain,
    range: range,
    center: center
    })
    > nudged.transform.getScale(tr)
    1.242259
    > nudged.transform.getRotation(tr)
    1.107148

## nudged.estimators

A collection of estimator functions.
Call these directly instead of the general [nudged.estimate](#nudgedestimate)
for a bit more efficiency by saving one function call.

- [nudged.estimators.I](#nudgedestimatorsI)
- [nudged.estimators.L](#nudgedestimatorsL)
- [nudged.estimators.X](#nudgedestimatorsX)
- [nudged.estimators.Y](#nudgedestimatorsY)
- [nudged.estimators.T](#nudgedestimatorsT)
- [nudged.estimators.S](#nudgedestimatorsS)
- [nudged.estimators.R](#nudgedestimatorsR)
- [nudged.estimators.TS](#nudgedestimatorsTS)
- [nudged.estimators.TR](#nudgedestimatorsTR)
- [nudged.estimators.SR](#nudgedestimatorsSR)
- [nudged.estimators.TSR](#nudgedestimatorsTSR)

<a name="nudgedestimatorsI"></a>
### nudged.estimators.I()

The trivial estimator; The estimate is always the identity transformation.

Example:

    > nudged.estimators.I(domain, range)
    { a: 1, b: 0, x: 0, y: 0 }

<a name="nudgedestimatorsL"></a>
### nudged.estimators.L(domain, range, angle)

Estimate translation along a line at the given angle.

<p style="display: inline">Parameters:</p>

- `domain`
  - array of [points](#nudgedpoint)
- `range`
  - array of [points](#nudgedpoint)
- `angle`
  - number, radians

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedestimatorsX"></a>
### nudged.estimators.X(domain, range)

Estimate horizontal translation that is a translation along x-axis.

<p style="display: inline">Parameters:</p>

- `domain`
  - array of [points](#nudgedpoint)
- `range`
  - array of [points](#nudgedpoint)

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedestimatorsY"></a>
### nudged.estimators.Y(domain, range)

Estimate vertical translation that is a translation along y-axis.

<p style="display: inline">Parameters:</p>

- `domain`
  - array of [points](#nudgedpoint)
- `range`
  - array of [points](#nudgedpoint)

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedestimatorsT"></a>
### nudged.estimators.T(domain, range)

Estimate translation that maps domain points close to range points.

<p style="display: inline">Parameters:</p>

- `domain`
  - array of [points](#nudgedpoint)
- `range`
  - array of [points](#nudgedpoint)

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedestimatorsS"></a>
### nudged.estimators.S(domain, range, center)

Estimate a scaling around the given center.
In other words, estimate
a [homothety](https://en.wikipedia.org/wiki/Homothety).

<p style="display: inline">Parameters:</p>

- `domain`
  - array of [points](#nudgedpoint)
- `range`
  - array of [points](#nudgedpoint)
- `center`
  - a [point](#nudgedpoint), the center of scaling

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedestimatorsR"></a>
### nudged.estimators.R(domain, range, center)

Estimate rotation around a fixed center point

<p style="display: inline">Parameters:</p>

- `domain`
  - array of [points](#nudgedpoint)
- `range`
  - array of [points](#nudgedpoint)
- `center`
  - point, a fixed center to rotate around

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedestimatorsTS"></a>
### nudged.estimators.TS(domain, range)

Estimate translation with scaling.

<p style="display: inline">Parameters:</p>

- `domain`
  - array of [points](#nudgedpoint)
- `range`
  - array of [points](#nudgedpoint)

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedestimatorsTR"></a>
### nudged.estimators.TR(domain, range)

Estimate translation with rotation.

<p style="display: inline">Parameters:</p>

- `domain`
  - array of [points](#nudgedpoint)
- `range`
  - array of [points](#nudgedpoint)

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedestimatorsSR"></a>
### nudged.estimators.SR(domain, range, center)

Estimate optimal transformation given the domain and the range
so that the center point remains fixed.
Example use cases:
1) Transform an image that has one corner fixed with a pin.
2) Allow only scale and rotation by fixing the middle of the object.

<p style="display: inline">Parameters:</p>

- `domain`
  - array of [points](#nudgedpoint)
- `range`
  - array of [points](#nudgedpoint)
- `center`
  - a [point](#nudgedpoint) that must remain constant in the tranformation.

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedestimatorsTSR"></a>
### nudged.estimators.TSR(domain, range)

Estimate a non-reflective similarity transformation.
In other words, an affine transformation where translation,
positive scaling, and rotation are allowed.

<p style="display: inline">Parameters:</p>

- `domain`
  - array of [points](#nudgedpoint)
- `range`
  - array of [points](#nudgedpoint)

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

## nudged.point

A set of operators for 2D point objects ``{ x, y }``.

- [nudged.point.almostEqual](#nudgedpointalmostEqual)
- [nudged.point.create](#nudgedpointcreate)
- [nudged.point.distance](#nudgedpointdistance)
- [nudged.point.equal](#nudgedpointequal)
- [nudged.point.fromArray](#nudgedpointfromArray)
- [nudged.point.offset](#nudgedpointoffset)
- [nudged.point.polarOffset](#nudgedpointpolarOffset)
- [nudged.point.toArray](#nudgedpointtoArray)
- [nudged.point.transform](#nudgedpointtransform)
- [nudged.point.transformMany](#nudgedpointtransformMany)
- [nudged.point.validate](#nudgedpointvalidate)

<a name="nudgedpointalmostEqual"></a>
### nudged.point.almostEqual(p, q, tolerance)

Test if two points are almost equal within the limit
given by the optional tolerance parameter.

<p style="display: inline">Parameters:</p>

- `p`
  - a [point](#nudgedpoint)
- `q`
  - a [point](#nudgedpoint)
- `tolerance`
  - Optional number
  - Defaults to [nudged.tolerance](#nudgedtolerance).
  - Set to `0` for strict comparison.

<p style="display: inline">Return:</p>

- boolean

Example:

    > nudged.point.almostEqual({ x: 0, y: 0 }, { x: 0, y: 1.23e-16 })
    true
    > nudged.point.almostEqual({ x: 0, y: 0 }, { x: 0, y: 0.1 })
    false
    > nudged.point.almostEqual({ x: 0, y: 0 }, { x: 0, y: 0.1 }, 0.2)
    true

<a name="nudgedpointcreate"></a>
### nudged.point.create(x, y)

Create a [point](#nudgedpoint) object.

<p style="display: inline">Parameters:</p>

- `x`
  - a number
- `y`
  - a number

<p style="display: inline">Return:</p>

- a [point](#nudgedpoint) `{ x, y }`

<a name="nudgedpointdistance"></a>
### nudged.point.distance(p, q)

The Euclidean distance between two points.
Also called the Euclidean norm alias L2-norm.

<p style="display: inline">Parameters:</p>

- `p`
  - a [point](#nudgedpoint)
- `q`
  - a [point](#nudgedpoint)

<p style="display: inline">Return:</p>

- number, the distance from p to q (= distance from q to p)

<a name="nudgedpointequal"></a>
### nudged.point.equal(p, q)

Thest if the coordinates of two points are strictly equal.

<p style="display: inline">Parameters:</p>

- `p`
  - a [point](#nudgedpoint)
- `q`
  - a [point](#nudgedpoint)

<p style="display: inline">Return:</p>

- a boolean

<a name="nudgedpointfromArray"></a>
### nudged.point.fromArray(arrp)

Create a [point](#nudgedpoint) `{ x, y }` from an array `[x, y].`

<p style="display: inline">Parameters:</p>

- `arrp`
  - an array with two elements

<p style="display: inline">Return:</p>

- a [point](#nudgedpoint)

<a name="nudgedpointoffset"></a>
### nudged.point.offset(p, dx, dy)

Offset a [point](#nudgedpoint) by scalars dx dy.

<p style="display: inline">Parameters:</p>

- `p`
  - a [point](#nudgedpoint)
- `dx`
  - a horizontal offset
- `dy`
  - a vertical offset

<p style="display: inline">Return:</p>

- a [point](#nudgedpoint), translated by the vector `{ x: dx, y: dy }`

<a name="nudgedpointpolarOffset"></a>
### nudged.point.polarOffset(p, distance, angle)

Create a [point](#nudgedpoint) away from p at the given distance and angle.

<p style="display: inline">Parameters:</p>

- `p`
  - a [point](#nudgedpoint)
- `distance`
  - a number
- `angle`
  - a number, angle in radians.
  - The angle `0` is towards pos. x-axis and grows towards pos. y-axis.

<p style="display: inline">Return:</p>

- a [point](#nudgedpoint)

Example:

    > nudged.point.polarOffset({ x: 1, y: 0 }, 5, Math.PI / 2)
    { x: 1, y: 5 }

<a name="nudgedpointtoArray"></a>
### nudged.point.toArray(p)

Represent a [point](#nudgedpoint) `{ x, y }` in two-element array `[x, y]`

<p style="display: inline">Parameters:</p>

- `p`
  - a [point](#nudgedpoint)

<p style="display: inline">Return:</p>

- an array `[x, y]`

<a name="nudgedpointtransform"></a>
### nudged.point.transform(p, tr)

Transform a [point](#nudgedpoint). The point is first scaled and rotated
around origin and then translated.

<p style="display: inline">Parameters:</p>

- `p`
  - a [point](#nudgedpoint) `{ x, y }`
- `tr`
  - a [transform](#nudgedtransform)

<p style="display: inline">Return:</p>

- a [point](#nudgedpoint), the transformed point

Example:

    > const tr = nudged.transform.ROT90
    > nudged.point.transform({ x: 1, y: 0 }, tr)
    { x: 0, y: 1 }

<a name="nudgedpointtransformMany"></a>
### nudged.point.transformMany(points, tr)

Transform an array of [points](#nudgedpoint)

<p style="display: inline">Parameters:</p>

- `points`
  - an array of [points](#nudgedpoint)
- `tr`
  - a [transform](#nudgedtransform)

<p style="display: inline">Return:</p>

- an array of [points](#nudgedpoint), transformed

Example:

    > const tr = nudged.transform.ROT90
    > const ps = [{ x: 1, y: 0}, { x: 0, y: 1 }]
    > nudged.point.transformMany(ps, tr)
    [{ x: 0, y: 1 }, { x: -1, y: 0 }]

<a name="nudgedpointvalidate"></a>
### nudged.point.validate(p)

Check if the point is a valid point object.

<p style="display: inline">Parameters:</p>

- `p`
  - a [point](#nudgedpoint)

<p style="display: inline">Return:</p>

- a boolean

Example:

    > nudged.point.validate({ x: 1, y: 0 })
    true
    > nudged.point.validate({ x: 1 })
    false

## nudged.transform

A transform is a plain object with the structure `{ a, b, x, y }`.
It defines a transformation matrix, and to be exact, an
[augmented affine](https://en.wikipedia.org/wiki/Affine_transformation#Augmented_matrix)
[non-reflective similarity](https://en.wikipedia.org/wiki/Similarity_(geometry))
transformation matrix.
Such transformation matrices are a compact way to represent
translation, rotation, and scaling in a single 3x3 matrix.
The matrix that the transform represents has the following elements:

    ┌           ┐
    │  a -b  x  │
    │  b  a  y  │
    │  0  0  1  │
    └           ┘

- [nudged.transform.SINGULAR](#nudgedtransformSINGULAR)
- [nudged.transform.IDENTITY](#nudgedtransformIDENTITY)
- [nudged.transform.ROT45](#nudgedtransformROT45)
- [nudged.transform.ROT90](#nudgedtransformROT90)
- [nudged.transform.ROT180](#nudgedtransformROT180)
- [nudged.transform.ROT270](#nudgedtransformROT270)
- [nudged.transform.HALF](#nudgedtransformHALF)
- [nudged.transform.X2](#nudgedtransformX2)
- [nudged.transform.almostEqual](#nudgedtransformalmostEqual)
- [nudged.transform.compose](#nudgedtransformcompose)
- [nudged.transform.create](#nudgedtransformcreate)
- [nudged.transform.equal](#nudgedtransformequal)
- [nudged.transform.fromArray](#nudgedtransformfromArray)
- [nudged.transform.fromPolar](#nudgedtransformfromPolar)
- [nudged.transform.fromRotation](#nudgedtransformfromRotation)
- [nudged.transform.fromScale](#nudgedtransformfromScale)
- [nudged.transform.fromString](#nudgedtransformfromString)
- [nudged.transform.fromTranslation](#nudgedtransformfromTranslation)
- [nudged.transform.getRotation](#nudgedtransformgetRotation)
- [nudged.transform.getScale](#nudgedtransformgetScale)
- [nudged.transform.getTranslation](#nudgedtransformgetTranslation)
- [nudged.transform.multiply](#nudgedtransformmultiply)
- [nudged.transform.inverse](#nudgedtransforminverse)
- [nudged.transform.rotateBy](#nudgedtransformrotateBy)
- [nudged.transform.rotateTo](#nudgedtransformrotateTo)
- [nudged.transform.scaleBy](#nudgedtransformscaleBy)
- [nudged.transform.scaleTo](#nudgedtransformscaleTo)
- [nudged.transform.toArray](#nudgedtransformtoArray)
- [nudged.transform.toMatrix](#nudgedtransformtoMatrix)
- [nudged.transform.toString](#nudgedtransformtoString)
- [nudged.transform.translateBy](#nudgedtransformtranslateBy)
- [nudged.transform.translateTo](#nudgedtransformtranslateTo)
- [nudged.transform.validate](#nudgedtransformvalidate)

### nudged.transform.SINGULAR

Singular transform, resembles multiplication by 0.

### nudged.transform.IDENTITY

Identity transform, resembles multiplication by 1 in the way that
it does not have any effect. You can use it as a starting point
to build other transformations.

    const I = nudged.transform.IDENTITY
    const center = { x: 320, y: 240 }
    const angle = Math.PI / 5
    const rotation = nudged.transform.rotateBy(I, center, angle)


### nudged.transform.ROT45

A prebuilt transform. Rotates around `{ x: 0, y: 0 }` by 45 degrees.

Example:

    > const R = nudged.transform.ROT45
    > nudged.transform.getRotation(R) * 360 / (2 * Math.PI)
    45
    > nudged.point.transform({ x: 1, y: 0 }, R)
    { x: 0.7071..., y: 0.7071... }


### nudged.transform.ROT90

A prebuilt transform. Rotates around `{ x: 0, y: 0 }` by 90 degrees.

### nudged.transform.ROT180

A prebuilt transform. Rotates around `{ x: 0, y: 0 }` by 180 degrees.

### nudged.transform.ROT270

A prebuilt transform. Rotates around `{ x: 0, y: 0 }` by 270 degrees (= 3/4 turn = 3π/2).

### nudged.transform.HALF

A prebuilt transform. Scales towards `{ x: 0, y: 0 }` by the factor of 0.5.

### nudged.transform.X2

A prebuilt transform. Scales away from `{ x: 0, y: 0 }` by the factor of 2.

<a name="nudgedtransformalmostEqual"></a>
### nudged.transform.almostEqual(tr, ts, tolerance)

Are two transforms almost equal?
Due to the limitations of floating point precision,
most operations have a bit of numerical error in their results.
Therefore two matrices that should be equivalent according to the math,
might not have strictly equivalent elements.
For these situations, use transform.almostEqual instead of
the strict [transform.equal](#nudgedtransformequal).

<p style="display: inline">Parameters:</p>

- `tr`
  - a [transform](#nudgedtransform)
- `ts`
  - a [transform](#nudgedtransform)
- `tolerance`
  - optional number, default to [nudged.tolerance](#nudgedtolerance).
  - Set to `0` for strict comparison.

<p style="display: inline">Return:</p>

- a boolean. True if the transforms are equal or almost equal.

For the difference metric, we use a modified L1 norm
that values a, b, x, and y equally. If the sum of the differences
is smaller or equal to the tolerance, consider the transforms equal.

<a name="nudgedtransformcompose"></a>
### nudged.transform.compose(tr, ts)

Multiply the transform tr from
the right with the given transform ts.
In other words, the resulting transform is equivalent to
first transforming with ts and then with tr.
To put it short, transform the *image* of ts by tr.

<p style="display: inline">Parameters:</p>

- `tr`
  - a [transform](#nudgedtransform)
- `ts`
  - a [transform](#nudgedtransform)

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedtransformcreate"></a>
### nudged.transform.create(a, b, x, y)

Create a [transform](#nudgedtransform) object.

<p style="display: inline">Parameters:</p>

- `a`
  - number. Indices m11 & m22.
  - The diagonal of the linear transformation
- `b`
  - number. Indices m12 & -m21.
  - The upper and lower triangle of the linear transformation.
- `x`
  - number. Index m31.
  - The translation towards x.
- `y`
  - number. Index m32.
  - The translation towards y

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform) object

<a name="nudgedtransformequal"></a>
### nudged.transform.equal(tr, ts)

Are transforms equal?
Tests that the elements of the transforms are strictly equal.
For loose equality see [almostEqual](#nudgedtransformalmostequal).

<p style="display: inline">Parameters:</p>

- `tr`
  - a [transform](#nudgedtransform)
- `ts`
  - a [transform](#nudgedtransform)

<p style="display: inline">Return:</p>

- a boolean

<a name="nudgedtransformfromArray"></a>
### nudged.transform.fromArray(arrtr)

Convert a [transform](#nudgedtransform) represented as an 4-element array
to a [transform](#nudgedtransform) object `{ a, b, x, y }`.
Compatible with [nudged.transform.toArray](#nudgedtransformtoArray).

<p style="display: inline">Parameters:</p>

- `arrtr`
  - an array with four number elements `[a, b, x, y]`

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

Example:

    > nudged.transform.fromArray([1, 2, 3, 4])
    { a: 1, b: 2, x: 3, y: 4 }

<a name="nudgedtransformfromPolar"></a>
### nudged.transform.fromPolar(center, scale, rotation)

Create a [nudged.transform](#nudgedtransform) object by using scale and rotation
in respect of a center point.

<p style="display: inline">Parameters:</p>

- `center`
  - a [point](#nudgedpoint)
- `scale`
  - a positive number. The scaling factor.
- `rotation`
  - a number. Rotation in radians from positive x axis towards pos. y axis.

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

Example:

    > const tr = nudged.transform.fromPolar({ x: 4, y: 2 }, 2, 0)
    > const p = { x: 2, y: 1 }
    > nudged.point.transform(p, tr)
    { x: 0, y: 0 }

<a name="nudgedtransformfromRotation"></a>
### nudged.transform.fromRotation(center, radians)

Create a [transform](#nudgedtransform) that rotates around the center by the radians.

<p style="display: inline">Parameters:</p>

- `center`
  - a [point](#nudgedpoint)
- `radians`
  - a number, angle

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

Example:

    > let rot = nudged.transform.fromRotation({ x: 4, y: 2 }, Math.PI / 5)
    > rot
    { a: 0.809..., b: 0.587..., x: 1.939..., y: -1.969... }

<a name="nudgedtransformfromScale"></a>
### nudged.transform.fromScale(center, multiplier)

Create a [transform](#nudgedtransform) that scales in respect of the center point and
the scale multiplier. Such transform is called a
[homothety](https://en.wikipedia.org/wiki/Homothety).

<p style="display: inline">Parameters:</p>

- `center`
  - a [point](#nudgedpoint)
- `multiplier`
  - a number

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

Example:

    > let x2 = nudged.transform.fromScale({ x: 4, y: 2 }, 2)
    > x2
    { a: 2, b: 0, x: -4, y: -2 }

<a name="nudgedtransformfromString"></a>
### nudged.transform.fromString(str)

Create a [transform](#nudgedtransform) from a string that uses
the CSS transform matrix syntax: 'matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0)'

Together with [nudged.transform.toString](#nudgedtransformtoString) this method makes an easy
serialization and deserialization to and from strings.

Note that the function does not yet support other CSS transform functions
such as 'translate' or 'perspective'. It might also give unexpected
results if the matrix exhibits shear or non-uniform scaling.

<p style="display: inline">Parameters:</p>

- `str`
  - a string, the CSS matrix description

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

Throws
  if no valid transform is found

<a name="nudgedtransformfromTranslation"></a>
### nudged.transform.fromTranslation(p)

Create a [transform](#nudgedtransform) that translates `{ 0, 0 }` to the point { x, y }

<p style="display: inline">Parameters:</p>

- `p`
  - a [point](#nudgedpoint)

<p style="display: inline">Return:</p>

- a [point](#nudgedpoint)

Example:

    > let tl = nudged.transform.fromTranslation({ x: 4, y: 2 })
    > tl
    { a: 1, b: 0, x: 4, y: 2 }

<a name="nudgedtransformgetRotation"></a>
### nudged.transform.getRotation(tr)

Get rotation of the transform in radians.
The rotation is measured from the positive x-axis towards
the positive y-axis.

<p style="display: inline">Parameters:</p>

- `tr`
  - a [transform](#nudgedtransform)

<p style="display: inline">Return:</p>

- a number, an angle in radians

Example:

    > const t = nudged.transform.ROT180
    > nudged.transform.getRotation(t)
    3.1415...

<a name="nudgedtransformgetScale"></a>
### nudged.transform.getScale(tr)

Get the scale multiplier of the transformation.

<p style="display: inline">Parameters:</p>

- `tr`
  - a [transform](#nudgedtransform)

<p style="display: inline">Return:</p>

- a number, the scaling factor

Example:

    > const t = nudged.transform.HALF
    > nudged.transform.getScale(t)
    0.5

<a name="nudgedtransformgetTranslation"></a>
### nudged.transform.getTranslation(tr)

Get the translating component of the given transform
as a vector `{ x, y }`.

<p style="display: inline">Parameters:</p>

- `tr`
  - a [transform](#nudgedtransform)

<p style="display: inline">Return:</p>

- a [point](#nudgedpoint)

Example:

    > const t = nudged.transform.ROT45
    > nudged.transform.getTranslation(t)
    { x: 0, y: 0 }

### nudged.transform.multiply

Alias of `nudged.transform.compose`.

<a name="nudgedtransforminverse"></a>
### nudged.transform.inverse(tr)

Compute inversed transform. In other words, find transform X
so that TX = XT = I, where T is the given transform.

<p style="display: inline">Parameters:</p>

- `tr`
  - a [transform](#nudgedtransform) to be inverted

Throws
  if the given transformation is singular and cannot be inverted.
  This can occur for example in situations
  where the scale of the transform has dropped to zero.

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedtransformrotateBy"></a>
### nudged.transform.rotateBy(tr, center, radians)

Rotate image of the transform by the given radians
so that the given center point stays fixed.

<p style="display: inline">Parameters:</p>

- `tr`
  - a [transform](#nudgedtransform)
- `center`
  - a [point](#nudgedpoint)
- `radians`
  - a number, angle

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedtransformrotateTo"></a>
### nudged.transform.rotateTo(tr, center, radians)

Rotate image of the transform to the given angle
so that the given center point stays fixed.

<p style="display: inline">Parameters:</p>

- `tr`
  - a [transform](#nudgedtransform)
- `center`
  - a [point](#nudgedpoint)
- `radians`
  - a number, angle to rotate to

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedtransformscaleBy"></a>
### nudged.transform.scaleBy(tr, center, multiplier)

Scale image of the transform by the given multiplier
so that the given center point stays fixed.
The operation is also called
[homothety](https://en.wikipedia.org/wiki/Homothety).

<p style="display: inline">Parameters:</p>

- `tr`
  - a [transform](#nudgedtransform)
- `center`
  - a [point](#nudgedpoint)
- `multiplier`
  - a number

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedtransformscaleTo"></a>
### nudged.transform.scaleTo(tr, center, scale)

Scale the transform tr so that
1) its scale multiplier becomes equal with the given scale.
2) its image stays fixed at the given center point

<p style="display: inline">Parameters:</p>

- `tr`
  - a [transform](#nudgedtransform)
- `center`
  - a [point](#nudgedpoint)
- `scale`
  - a number

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedtransformtoArray"></a>
### nudged.transform.toArray(tr)

Represent the transform as a 4-element array.
This the array is compatible with [nudged.transform.fromArray](#nudgedtransformfromArray).

<p style="display: inline">Parameters:</p>

- `tr`
  - a [transform](#nudgedtransform)

<p style="display: inline">Return:</p>

- an array `[a, b, x, y]`

<a name="nudgedtransformtoMatrix"></a>
### nudged.transform.toMatrix(tr)

Get the similarity transformation matrix
in the format common to other APIs, including:

- [DOMMatrix](https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix)
- [WebKitCSSMatrix](https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix)
- [kld-affine](https://github.com/thelonious/kld-affine)

<p style="display: inline">Parameters:</p>

- `tr`
  - a [transform](#nudgedtransform)

<p style="display: inline">Return:</p>

- an object `{ a, b, c, d, e, g }` that represents the matrix below.


    ┌           ┐
    │  a  c  e  │
    │  b  d  f  │
    │  0  0  1  │
    └           ┘

Example:

    > nudged.transform.toMatrix(tr)
    { a: 0.48, c: -0.52, e: 205.04,
    b: 0.52, d: 0.48, f: 4.83 }

<a name="nudgedtransformtoString"></a>
### nudged.transform.toString(tr)

Return a string of CSS transform-function data type.

Together with [nudged.transform.fromString](#nudgedtransformfromString), this method allows
serialization to and from strings.

Example:

    > let sc = nudged.transform.fromScale({ x: 4, y: 2 }, 2)
    > nudged.transform.toString(sc)
    'matrix(2.00000000,0.00000000,0.00000000,2.00000000,-4.00000000,-2.00000000)'

The matrix values are fixed to 8 decimals. This prevents bugs
caused by the scientific notation e.g. '1e-12'. The default JavaScript
number-to-string conversion might produce scientific notation with
some very large and very small numbers. The scientific notation is not
understood by all CSS parsers. We have experienced problems with
Safari and Opera. Therefore toString must prevent the scientific
notation here and convert to fixed number of decimal places.
See [SO](https://stackoverflow.com/q/1685680/638546) for further details.

<a name="nudgedtransformtranslateBy"></a>
### nudged.transform.translateBy(tr, vec)

Modify transformation so that its image
is translated by the given vector.
Scale and rotation are kept intact.
In other words the resulting transform
first applies the given tr and
applies an additional translation defined by the given vector.

<p style="display: inline">Parameters:</p>

- `tr`
  - a [transform](#nudgedtransform)
- `vec`
  - a vector `{ x, y }`

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedtransformtranslateTo"></a>
### nudged.transform.translateTo(tr, point)

Modify transformation so that it maps `{ x: 0, y: 0 }`
to the given point. The rotation and scale are kept intact.

<p style="display: inline">Parameters:</p>

- `tr`
  - a [transform](#nudgedtransform)
- `point`
  - a [point](#nudgedpoint) `{ x, y }`

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedtransformvalidate"></a>
### nudged.transform.validate(tr)

Check if tr is valid, non-singular affine transformation.
## nudged.analysis

Tools to measure how well the estimated transformations fit the data.

- [nudged.analysis.mse](#nudgedanalysismse)
- [nudged.analysis.residuals](#nudgedanalysisresiduals)
- [nudged.analysis.rss](#nudgedanalysisrss)

<a name="nudgedanalysismse"></a>
### nudged.analysis.mse(tr, domain, range)

Compute mean squared error (MSE) that is
the mean squared distances between
the range points and transformed domain points.

<p style="display: inline">Parameters:</p>

- `tr`
  - an estimated transform
- `domain`
  - an array of [points](#nudgedpoint). The domain used in the estimation.
- `range`
  - an array of [points](#nudgedpoint). The range used in the estimation.

<p style="display: inline">Return:</p>

- a positive number

<a name="nudgedanalysisresiduals"></a>
### nudged.analysis.residuals(tr, domain, range)

Get an array of residuals i.e. the distances
between the range points and transformed domain points.

<p style="display: inline">Parameters:</p>

- `tr`
  - an estimated transform
- `domain`
  - an array of [points](#nudgedpoint). The domain used in the estimation.
- `range`
  - an array of [points](#nudgedpoint). The range used in the estimation.

<p style="display: inline">Return:</p>

- array of numbers, distances

<a name="nudgedanalysisrss"></a>
### nudged.analysis.rss(tr, domain, range)

Compute residual sum of squares (RSS) that is
the sum of the squared distances between
the range points and transformed domain points.

<p style="display: inline">Parameters:</p>

- `tr`
  - an estimated transform
- `domain`
  - an array of [points](#nudgedpoint). The domain used in the estimation.
- `range`
  - an array of [points](#nudgedpoint). The range used in the estimation.

<p style="display: inline">Return:</p>

- a positive number

## nudged.tolerance

Default tolerance to use when coping with floating point arithmetics.
JavaScript floating point numbers have 52 bits in mantissa (IEEE-754).
That is about 16 base10 digits. Therefore the tolerance should be
much larger than 1 * 10^-16. Let say 1 * 10^-10 is a good one.

    > nudged.tolerance
    0.0000000001



## nudged.version

Contains the module version string identical to
the version in *package.json*.
This feature is powered by
[genversion](https://github.com/axelpale/genversion).

    > nudged.version
    '2.3.4'



