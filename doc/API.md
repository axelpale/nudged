## nudged

- [nudged.estimate](#nudgedestimate)
- [nudged.estimators](#nudgedestimators)
- [nudged.point](#nudgedpoint)
- [nudged.transform](#nudgedtransform)
- [nudged.analysis](#nudgedanalysis)
- [nudged.tolerance](#nudgedtolerance)
- [nudged.version](#nudgedversion)


<a name="nudgedestimate"></a>
### nudged.estimate(params)

Estimate a [transform](#nudgedtransform)ation of the given type and constraints.
Internally, calls the estimator of the given type.
For maximal efficiency, use the estimator functions directly.

<p style="display: inline">Parameters:</p>

- `params`, an object with properties:
  - `estimator`
    - Required string. The freedom of the transform.
    - One of the following:
      'I', 'L', 'X', 'Y', 'T', 'S', 'R', 'TS', 'TR', 'SR', 'TSR'
  - `domain`
    - required array of points `{ x, y }`.
    - The points before the transform.
  - `range`
    - required array of points `{ x, y }`.
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

- a [transform](#nudgedtransform) object

## nudged.estimators

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


A collection of estimator functions.
Call these directly instead of the general nudged.estimate
for a bit more efficiency by saving one function call.
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
  - array of points
- `range`
  - array of points
- `angle`
  - number, radians

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedestimatorsX"></a>
### nudged.estimators.X(domain, range)

Estimate horizontal translation that is a translation along x-axis.

<p style="display: inline">Parameters:</p>

- `domain`
  - array of points
- `range`
  - array of points

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedestimatorsY"></a>
### nudged.estimators.Y(domain, range)

Estimate vertical translation that is a translation along y-axis.

<p style="display: inline">Parameters:</p>

- `domain`
  - array of points
- `range`
  - array of points

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedestimatorsT"></a>
### nudged.estimators.T(domain, range)

Estimate translation that maps domain points close to range points.

<p style="display: inline">Parameters:</p>

- `domain`
  - array of points
- `range`
  - array of points

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedestimatorsS"></a>
### nudged.estimators.S(domain, range, center)

Estimate a scaling around the given center.
In other words, estimate a homothety.

<p style="display: inline">Parameters:</p>

- `domain`
  - array of points
- `range`
  - array of points
- `center`
  - a [point](#nudgedpoint), the center of scaling

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedestimatorsR"></a>
### nudged.estimators.R(domain, range, center)

Estimate rotation around a fixed center point

<p style="display: inline">Parameters:</p>

- `domain`
  - array of points
- `range`
  - array of points
- `center`
  - point, a fixed center to rotate around

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedestimatorsTS"></a>
### nudged.estimators.TS(domain, range)

Estimate translation with scaling.

<p style="display: inline">Parameters:</p>

- `domain`
  - array of points
- `range`
  - array of points

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedestimatorsTR"></a>
### nudged.estimators.TR(domain, range)

Estimate translation with rotation.

<p style="display: inline">Parameters:</p>

- `domain`
  - array of points
- `range`
  - array of points

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
  - array of points
- `range`
  - array of points
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
  - array of points
- `range`
  - array of points

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

## nudged.point

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


A set of operators for 2D point objects ``{ x, y }``.

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

Create a [point](#nudgedpoint) `{ x, y }` from an array `[x, y]`.

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

Transform an array of points

<p style="display: inline">Parameters:</p>

- `points`
  - an array of points
- `tr`
  - a [transform](#nudgedtransform)

<p style="display: inline">Return:</p>

- an array of points, transformed

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

- [nudged.transform.almostEqual](#nudgedtransformalmostEqual)
- [nudged.transform.compose](#nudgedtransformcompose)
- [nudged.transform.create](#nudgedtransformcreate)
- [nudged.transform.equal](#nudgedtransformequal)
- [nudged.transform.fromPolar](#nudgedtransformfromPolar)
- [nudged.transform.fromArray](#nudgedtransformfromArray)
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



A transform is a plain object with the structure `{ a, b, x, y }`.
It represents a [transform](#nudgedtransform)ation matrix, and to be exact,
an affine non-reflective similarity transformation matrix.
Such transformation matrices are a compact way to represent
translation, rotation, and scaling in a single 3x3 matrix.
The matrix that the transform represents has the following elements:

    ┌           ┐
    │  a -b  x  │
    │  b  a  y  │
    │  0  0  1  │
    └           ┘

### nudged.transform.SINGULAR

Singular transform, resembles multiplication by 0.

### nudged.transform.IDENTITY

Identity transform, resembles multiplication by 1.

### nudged.transform.ROT45

Rotate around `{ x: 0, y: 0 }` by 45 degrees.

### nudged.transform.ROT90

Rotate around `{ x: 0, y: 0 }` by 90 degrees.

### nudged.transform.ROT180

Rotate around `{ x: 0, y: 0 }` by 180 degrees.

### nudged.transform.ROT270

Rotate around `{ x: 0, y: 0 }` by 270 degrees (= 3/4 turn = 3π/2).

### nudged.transform.HALF

Scale towards `{ x: 0, y: 0 }` by the factor of 0.5.

### nudged.transform.X2

Scale away from `{ x: 0, y: 0 }` by the factor of 2.

<a name="nudgedtransformalmostEqual"></a>
### nudged.transform.almostEqual(tr, ts, tolerance)

Are two transforms almost equal? Return true if a matrix norm
of the difference is smaller than the tolerance.
For the difference metric, we use a modified L1 norm
that values a, b, x, and y equally.

<p style="display: inline">Parameters:</p>

- `tr`
  - a [transform](#nudgedtransform)
- `ts`
  - a [transform](#nudgedtransform)
- `tolerance`
  - optional number, default to [nudged.tolerance](#nudgedtolerance).
  - Set to `0` for strict comparison.

<a name="nudgedtransformcompose"></a>
### nudged.transform.compose(tr, ts)

Multiply transformation matrix tr from
the right with the given transformation matrix ts.
In other words, transform the image of ts by tr.

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

<p style="display: inline">Parameters:</p>

- `tr`
  - a [transform](#nudgedtransform)
- `ts`
  - a [transform](#nudgedtransform)

<p style="display: inline">Return:</p>

- a boolean

<a name="nudgedtransformfromPolar"></a>
### nudged.transform.fromPolar(scale, rotation, tx, ty)

Create a nudged.transform object by using scale magnitude,
rotation angle, and translation.

<p style="display: inline">Parameters:</p>

- `scale`
  - number, the scaling factor
- `rotation`
  - number, rotation in radians from positive x axis towards pos. y axis.
- `tx`
  - translation toward pos. x
- `ty`
  - translation toward pos. y

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform) object

Precondition
  scale must be positive

<a name="nudgedtransformfromArray"></a>
### nudged.transform.fromArray(arrtr)

Convert a [transform](#nudgedtransform) represented as an 4-element array (as in Nudged v1)
to a [transform](#nudgedtransform) object `{ a, b, x, y }` (as in nudged v2).

<p style="display: inline">Parameters:</p>

- `arrtr`
  - an array with four number elements `[a, b, x, y]`

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedtransformgetRotation"></a>
### nudged.transform.getRotation(tr)

Get rotation of the transform in radians.

<p style="display: inline">Parameters:</p>

- `tr`
  - a [transform](#nudgedtransform)

<p style="display: inline">Return:</p>

- a number, an angle in radians

<a name="nudgedtransformgetScale"></a>
### nudged.transform.getScale(tr)

Get the scale multiplier of the transformation.

<p style="display: inline">Parameters:</p>

- `tr`
  - a [transform](#nudgedtransform)

<p style="display: inline">Return:</p>

- a number, the scaling factor

<a name="nudgedtransformgetTranslation"></a>
### nudged.transform.getTranslation(tr)

Get translation as a [point](#nudgedpoint) `{ x, y }`.

<p style="display: inline">Parameters:</p>

- `tr`
  - a [transform](#nudgedtransform)

<p style="display: inline">Return:</p>

- a [point](#nudgedpoint)

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
  if the given transformation is singular and cannot be inverted

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedtransformrotateBy"></a>
### nudged.transform.rotateBy(tr, center, radians)

Rotate image of the transform by the given radians
so that the given center point stays fixed.

Parameter
  tr
    a [transform](#nudgedtransform)
  center
    a [point](#nudgedpoint)
  radians
    a number, angle

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedtransformrotateTo"></a>
### nudged.transform.rotateTo(tr, center, radians)

Rotate image of the transform to the given angle
so that the given center point stays fixed.

Parameter
  tr
    a [transform](#nudgedtransform)
  center
    a [point](#nudgedpoint)
  radians
    a number, angle to rotate to

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedtransformscaleBy"></a>
### nudged.transform.scaleBy(tr, center, multiplier)

Scale image of the transform by the given multiplier
so that the given center point stays fixed.
The operation is also called homothety.

Parameter
  tr
    a [transform](#nudgedtransform)
  center
    a [point](#nudgedpoint)
  multiplier
    a number

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedtransformscaleTo"></a>
### nudged.transform.scaleTo(tr, center, scale)

Scale the transform tr so that
1) its scale multiplier becomes equal with the given scale.
2) its image stays fixed at the given center point

Parameter
  tr
    a [transform](#nudgedtransform)
  center
    a [point](#nudgedpoint)
  scale
    a number

<p style="display: inline">Return:</p>

- a [transform](#nudgedtransform)

<a name="nudgedtransformtoArray"></a>
### nudged.transform.toArray(tr)

Return an array representation of the transformation.

Compatible with nudged.createFromArray(...)

<a name="nudgedtransformtoMatrix"></a>
### nudged.transform.toMatrix(tr)

Get the similarity transformation matrix
in the format common to other APIs, including:
- kld-affine
- MDN documentation in some parts

<p style="display: inline">Return:</p>

- object o, having properties a, b, c, d, e, f:
- [ a  -b   x ]   [ o.a  o.c  o.e ]
- `[ b   a   y ]` = [ o.b  o.d  o.f ]
- `[ 0   0   1 ]`   [  -    -    -  ]

<a name="nudgedtransformtoString"></a>
### nudged.transform.toString(tr)

Return a string of CSS transform-function data type.

Together with nudged.createFromString(...), this method allows
serialization to and from strings.

NOTE When JavaScript converts numbers to strings, the string might
end up using the scientific notation (e.g. 1e-12). Not all browsers
support scientific notation in CSS. We have experienced problems
with Safari and Opera. Therefore toString must prevent the scientific
notation here and convert to fixed number of decimal places.

See also: https://stackoverflow.com/q/1685680/638546

<a name="nudgedtransformtranslateBy"></a>
### nudged.transform.translateBy(tr, vec)

Modify transformation so that its image
is translated by the given vector.
In other words it transforms points
further by the given vector.
Scale and rotation are kept intact.

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
  - an array of points. The domain used in the estimation.
- `range`
  - an array of points. The range used in the estimation.

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
  - an array of points. The domain used in the estimation.
- `range`
  - an array of points. The range used in the estimation.

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
  - an array of points. The domain used in the estimation.
- `range`
  - an array of points. The range used in the estimation.

<p style="display: inline">Return:</p>

- a positive number

## nudged.tolerance



Default tolerance to use when coping with floating point arithmetics.
JavaScript floating point numbers have 52 bits in mantissa (IEEE-754).
That is about 16 base10 digits. Therefore the tolerance should be
much larger than 1 * 10^-16. Let say 1 * 10^-10 is a good one.

    > [nudged.tolerance](#nudgedtolerance)
    0.0000000001

## nudged.version

A string, the package version tag.



