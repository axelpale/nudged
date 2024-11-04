<a name="top"></a>
# Nudged API Documentation

Welcome to Nudged interface documentation!
The nudged [API](https://en.wikipedia.org/wiki/API) follows
a [functional and immutable](https://en.wikipedia.org/wiki/Functional_programming) paradigm without classes.
Thus all the functions take in and return plain objects and values
such as `{ x: 1, y: 2 }`. The functions never modify the given objects,
never cause side effects, and never memorize previous calls.
In contrast to object-oriented programming, the features are
implemented as pure functions that are grouped
in modules aka namespaces instead of classes.
See the available modules below.


<a name="nudged"></a>
## [nudged](#nudged)

The estimators and related tools are grouped into namespaces.
The `estimate` function and `estimators` namespace provide the core
features for computing transformations between [point](#nudgedpoint) sets.
The `point` and `transform` namespaces provide basic tools to work with
the estimated transformations and 2D points.
The `analysis` provides tools to assess the quality of computed estimates
and to detect outliers in [point](#nudgedpoint) pairs.


- [nudged.analysis](#nudgedanalysis)
- [nudged.estimate](#nudgedestimate)
- [nudged.estimators](#nudgedestimators)
- [nudged.point](#nudgedpoint)
- [nudged.tolerance](#nudgedtolerance)
- [nudged.transform](#nudgedtransform)
- [nudged.version](#nudgedversion)


<a name="nudgedanalysis"></a>
## [nudged](#nudged).[analysis](#nudgedanalysis)

These tools help you to measure how well the estimated transformation fits the data.


- [nudged.analysis.mse](#nudgedanalysismse)
- [nudged.analysis.residuals](#nudgedanalysisresiduals)
- [nudged.analysis.rss](#nudgedanalysisrss)


<a name="nudgedanalysismse"></a>
## [nudged](#nudged).[analysis](#nudgedanalysis).[mse](#nudgedanalysismse)(tr, domain, range)

Compute mean squared error (MSE) that is
the mean squared distances between
the range points and transformed domain points.
The MSE is a standard measure for how well the
transformation fits the data.
The smaller the MSE the better the fit.

<p style="margin-bottom: 0">Parameters</p>

- *tr*
  - an estimated [transform](#nudgedtransform)
- *domain*
  - an array of points. The domain used in the estimation.
- *range*
  - an array of points. The range used in the estimation.


<p style="margin-bottom: 0">Return</p>

- a positive number


<a name="nudgedanalysisresiduals"></a>
## [nudged](#nudged).[analysis](#nudgedanalysis).[residuals](#nudgedanalysisresiduals)(tr, domain, range)

Get an array of residuals. A residual is the distance
between a domain [point](#nudgedpoint) after the given transformation and
its associated range [point](#nudgedpoint). You can use an array of residuals
to detect possible outliers and to build custom analysis methods.

<p style="margin-bottom: 0">Parameters</p>

- *tr*
  - an estimated [transform](#nudgedtransform)
- *domain*
  - an array of points. The domain used in the estimation.
- *range*
  - an array of points. The range used in the estimation.


<p style="margin-bottom: 0">Return</p>

- array of numbers, distances


<a name="nudgedanalysisrss"></a>
## [nudged](#nudged).[analysis](#nudgedanalysis).[rss](#nudgedanalysisrss)(tr, domain, range)

Compute the residual sum of squares (RSS) that is
the sum of the squared distances between
the range points and transformed domain points.

<p style="margin-bottom: 0">Parameters</p>

- *tr*
  - an estimated [transform](#nudgedtransform)
- *domain*
  - an array of points. The domain used in the estimation.
- *range*
  - an array of points. The range used in the estimation.


<p style="margin-bottom: 0">Return</p>

- a positive number


Note that the RSS tends to grow linearly with the number of points.
If you need an error measure that is independent of the number of points
then consider using [nudged.analysis.mse](#nudgedanalysismse) instead.

<a name="nudgedestimate"></a>
## [nudged](#nudged).[estimate](#nudgedestimate)(params)

Estimates a transformation with the selected estimator and constraints.
See [nudged.estimators](#nudgedestimators) for available estimators.

<p style="margin-bottom: 0">Parameters:</p>

- *params*, an object with properties:
  - *estimator*
    - Required string. The name of the estimator.
    - Defines the freedom of the [transform](#nudgedtransform) to compute.
    - Must be one of the following: 'I', 'L', 'X', 'Y', 'T', 'S', 'R', 'TS', 'TR', 'SR', 'TSR'
  - *domain*
    - required array of points `{ x, y }`.
    - The points before the [transform](#nudgedtransform).
  - *range*
    - required array of points `{ x, y }`.
    - The points after the [transform](#nudgedtransform).
  - *center*
    - optional [point](#nudgedpoint).
    - Used as the center by the estimators 'S', 'R', and 'SR'.
    - If an estimator other than these is selected, the center has no effect to the estimation.
  - *angle*
    - optional number. Angle in radians.
    - Used by the estimator 'L'.
    - If an estimator other than 'L' is selected, the angle has no effect to the estimation.


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


Internally, this calls the function of the selected estimator.
Therefore, if you desire maximal efficiency instead of flexibility,
use the estimator functions directly via [nudged.estimators](#nudgedestimators),
like for example `nudged.estimators.R(domain, range, center)`

Example
```
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
```

<a name="nudgedestimators"></a>
## [nudged](#nudged).[estimators](#nudgedestimators)

A collection of estimator functions.
Call these directly instead of the general [nudged.estimate](#nudgedestimate)
for a bit more efficiency by saving one function call.


- [nudged.estimators.I](#nudgedestimatorsi)
- [nudged.estimators.L](#nudgedestimatorsl)
- [nudged.estimators.R](#nudgedestimatorsr)
- [nudged.estimators.S](#nudgedestimatorss)
- [nudged.estimators.SR](#nudgedestimatorssr)
- [nudged.estimators.T](#nudgedestimatorst)
- [nudged.estimators.TR](#nudgedestimatorstr)
- [nudged.estimators.TS](#nudgedestimatorsts)
- [nudged.estimators.TSR](#nudgedestimatorstsr)
- [nudged.estimators.X](#nudgedestimatorsx)
- [nudged.estimators.Y](#nudgedestimatorsy)


<a name="nudgedestimatorsi"></a>
## [nudged](#nudged).[estimators](#nudgedestimators).[I](#nudgedestimatorsi)()

The trivial estimator; The estimate is always the identity transformation.

Example
```
> nudged.estimators.I(domain, range)
{ a: 1, b: 0, x: 0, y: 0 }
```

Why this trivial estimator exists? If the estimator type becomes a variable in your application
then it can be convenient to be able to disable estimation by just switching the estimator type to `I`.

<a name="nudgedestimatorsl"></a>
## [nudged](#nudged).[estimators](#nudgedestimators).[L](#nudgedestimatorsl)(domain, range, angle)

Estimate translation along a line at the given angle.

<p style="margin-bottom: 0">Parameters:</p>

- *domain*
  - array of points
- *range*
  - array of points
- *angle*
  - number, radians


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


<a name="nudgedestimatorsr"></a>
## [nudged](#nudged).[estimators](#nudgedestimators).[R](#nudgedestimatorsr)(domain, range, center)

Estimate rotation around a fixed center [point](#nudgedpoint).

<p style="margin-bottom: 0">Parameters</p>

- *domain*
  - array of points
- *range*
  - array of points
- *center*
  - [point](#nudgedpoint), a fixed center to rotate around


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


<a name="nudgedestimatorss"></a>
## [nudged](#nudged).[estimators](#nudgedestimators).[S](#nudgedestimatorss)(domain, range, center)

Estimate a scaling around the given center.
In other words, estimate
a [homothety](https://en.wikipedia.org/wiki/Homothety).

<p style="margin-bottom: 0">Parameters</p>

- *domain*
  - array of points
- *range*
  - array of points
- *center*
  - a [point](#nudgedpoint), the center of scaling


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


<a name="nudgedestimatorssr"></a>
## [nudged](#nudged).[estimators](#nudgedestimators).[SR](#nudgedestimatorssr)(domain, range, center)

Estimate optimal transformation given the domain and the range
so that the center [point](#nudgedpoint) remains fixed.
Example use cases:
1) Transform an image that has one corner fixed with a pin.
2) Allow only scale and rotation by fixing the middle of the object.

<p style="margin-bottom: 0">Parameters</p>

- *domain*
  - array of points
- *range*
  - array of points
- *center*
  - a [point](#nudgedpoint) that must remain constant in the tranformation.


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


<a name="nudgedestimatorst"></a>
## [nudged](#nudged).[estimators](#nudgedestimators).[T](#nudgedestimatorst)(domain, range)

Estimate translation that maps domain points close to range points.

<p style="margin-bottom: 0">Parameters:</p>

- *domain*
  - array of points
- *range*
  - array of points


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


<a name="nudgedestimatorstr"></a>
## [nudged](#nudged).[estimators](#nudgedestimators).[TR](#nudgedestimatorstr)(domain, range)

Estimate translation with rotation.

<p style="margin-bottom: 0">Parameters</p>

- *domain*
  - array of points
- *range*
  - array of points


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


<a name="nudgedestimatorsts"></a>
## [nudged](#nudged).[estimators](#nudgedestimators).[TS](#nudgedestimatorsts)(domain, range)

Estimate translation with scaling.

<p style="margin-bottom: 0">Parameters</p>

- *domain*
  - array of points
- *range*
  - array of points


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


<a name="nudgedestimatorstsr"></a>
## [nudged](#nudged).[estimators](#nudgedestimators).[TSR](#nudgedestimatorstsr)(domain, range)

Estimate a non-reflective similarity transformation.
In other words, an affine transformation where translation,
positive scaling, and rotation are allowed.

<p style="margin-bottom: 0">Parameters</p>

- *domain*
  - array of points
- *range*
  - array of points


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


<a name="nudgedestimatorsx"></a>
## [nudged](#nudged).[estimators](#nudgedestimators).[X](#nudgedestimatorsx)(domain, range)

Estimate horizontal translation that is a translation along x-axis.

<p style="margin-bottom: 0">Parameters</p>

- *domain*
  - array of points
- *range*
  - array of points


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


<a name="nudgedestimatorsy"></a>
## [nudged](#nudged).[estimators](#nudgedestimators).[Y](#nudgedestimatorsy)(domain, range)

Estimate vertical translation that is a translation along y-axis.

<p style="margin-bottom: 0">Parameters</p>

- *domain*
  - array of points
- *range*
  - array of points


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


<a name="nudgedpoint"></a>
## [nudged](#nudged).[point](#nudgedpoint)

A set of operators for 2D [point](#nudgedpoint) objects `{ x, y }`.


- [nudged.point.almostEqual](#nudgedpointalmostequal)
- [nudged.point.create](#nudgedpointcreate)
- [nudged.point.distance](#nudgedpointdistance)
- [nudged.point.equal](#nudgedpointequal)
- [nudged.point.fromArray](#nudgedpointfromarray)
- [nudged.point.offset](#nudgedpointoffset)
- [nudged.point.polarOffset](#nudgedpointpolaroffset)
- [nudged.point.toArray](#nudgedpointtoarray)
- [nudged.point.transform](#nudgedpointtransform)
- [nudged.point.transformMany](#nudgedpointtransformmany)
- [nudged.point.validate](#nudgedpointvalidate)


<a name="nudgedpointalmostequal"></a>
## [nudged](#nudged).[point](#nudgedpoint).[almostEqual](#nudgedpointalmostequal)(p, q, tolerance)

Test if two points are almost equal within the limit
given by the optional tolerance parameter.

<p style="margin-bottom: 0">Parameters:</p>

- *p*
  - a [point](#nudgedpoint)
- *q*
  - a [point](#nudgedpoint)
- *tolerance*
  - Optional number
  - Defaults to [nudged.tolerance](#nudgedtolerance).
  - Set to `0` for strict comparison.


<p style="margin-bottom: 0">Return</p>

- *boolean*


Example
```
> nudged.point.almostEqual({ x: 0, y: 0 }, { x: 0, y: 1.23e-16 })
true
> nudged.point.almostEqual({ x: 0, y: 0 }, { x: 0, y: 0.1 })
false
> nudged.point.almostEqual({ x: 0, y: 0 }, { x: 0, y: 0.1 }, 0.2)
true
```

<a name="nudgedpointcreate"></a>
## [nudged](#nudged).[point](#nudgedpoint).[create](#nudgedpointcreate)(x, y)

Create a [point](#nudgedpoint) object.

<p style="margin-bottom: 0">Parameters</p>

- *x*
  - a number
- *y*
  - a number


<p style="margin-bottom: 0">Return</p>

- a [point](#nudgedpoint) `{ x, y }`


<a name="nudgedpointdistance"></a>
## [nudged](#nudged).[point](#nudgedpoint).[distance](#nudgedpointdistance)(p, q)

The Euclidean distance between two points.
Also called the Euclidean norm alias L2-norm.

<p style="margin-bottom: 0">Parameters</p>

- *p*
  - a [point](#nudgedpoint)
- *q*
  - a [point](#nudgedpoint)


<p style="margin-bottom: 0">Return</p>

- number, the distance from p to q (= distance from q to p)


<a name="nudgedpointequal"></a>
## [nudged](#nudged).[point](#nudgedpoint).[equal](#nudgedpointequal)(p, q)

Test if the coordinates of two points are strictly equal.

<p style="margin-bottom: 0">Parameters:</p>

- *p*
  - a [point](#nudgedpoint)
- *q*
  - a [point](#nudgedpoint)


<p style="margin-bottom: 0">Return</p>

- a boolean


Note that strict numerical equality is rarely true in practice
because of rounding errors caused by floating [point](#nudgedpoint) arithmetics.
Consider using [nudged.point.almostEqual](#nudgedpointalmostequal) instead.

<a name="nudgedpointfromarray"></a>
## [nudged](#nudged).[point](#nudgedpoint).[fromArray](#nudgedpointfromarray)(arrp)

Create a [point](#nudgedpoint) `{ x, y }` from an array `[x, y]`.

<p style="margin-bottom: 0">Parameters</p>

- *arrp*
  - an array with two elements.


<p style="margin-bottom: 0">Return</p>

- a [point](#nudgedpoint)


<p style="margin-bottom: 0">Throws</p>

- if the array has unexpected number of elements.


<a name="nudgedpointoffset"></a>
## [nudged](#nudged).[point](#nudgedpoint).[offset](#nudgedpointoffset)(p, dx, dy)

Offset a [point](#nudgedpoint) by scalars dx, dy.
This is equivalent to translation by the vector `{ x: dx, y: dy }`.

<p style="margin-bottom: 0">Parameters:</p>

- *p*
  - a [point](#nudgedpoint)
- *dx*
  - a number, the horizontal offset
- *dy*
  - a number, the vertical offset


<p style="margin-bottom: 0">Return</p>

- a [point](#nudgedpoint)


<a name="nudgedpointpolaroffset"></a>
## [nudged](#nudged).[point](#nudgedpoint).[polarOffset](#nudgedpointpolaroffset)(p, distance, angle)

Create a [point](#nudgedpoint) away from p at the given distance and angle.

<p style="margin-bottom: 0">Parameters</p>

- *p*
  - a [point](#nudgedpoint), the pole.
- *distance*
  - a number
- *angle*
  - a number, angle in radians.
  - The angle *0* corresponds to the positive x-axis and *π/2* to the positive y-axis.


<p style="margin-bottom: 0">Return</p>

- a [point](#nudgedpoint)


Example
```
> nudged.point.polarOffset({ x: 1, y: 0 }, 5, Math.PI / 2)
{ x: 1, y: 5 }
```

<a name="nudgedpointtoarray"></a>
## [nudged](#nudged).[point](#nudgedpoint).[toArray](#nudgedpointtoarray)(p)

Convert a [point](#nudgedpoint) `{ x, y }` into a two-element array `[x, y]`.

<p style="margin-bottom: 0">Parameters</p>

- *p*
  - a [point](#nudgedpoint)


<p style="margin-bottom: 0">Return</p>

- an array `[x, y]`


<a name="nudgedpointtransform"></a>
## [nudged](#nudged).[point](#nudgedpoint).[transform](#nudgedpointtransform)(p, tr)

Transform a [point](#nudgedpoint). The [point](#nudgedpoint) is first scaled and rotated
around origin and then translated.
This corresponds to a matrix multiplication *Mv*
where *M* is a 3x3 transformation matrix
and *v* is a 3x1 augmented 2D vector.

<p style="margin-bottom: 0">Parameters</p>

- *p*
  - a [point](#nudgedpoint) `{ x, y }`
- *tr*
  - a [transform](#nudgedtransform)


<p style="margin-bottom: 0">Return</p>

- a [point](#nudgedpoint), the transformed [point](#nudgedpoint)


Example
```
> const tr = nudged.transform.ROT90
> nudged.point.transform({ x: 1, y: 0 }, tr)
{ x: 0, y: 1 }
```

<a name="nudgedpointtransformmany"></a>
## [nudged](#nudged).[point](#nudgedpoint).[transformMany](#nudgedpointtransformmany)(p, tr)

Transform an array of points.

<p style="margin-bottom: 0">Parameters</p>

- *points*
  - an array of points
- *tr*
  - a [transform](#nudgedtransform)


<p style="margin-bottom: 0">Return</p>

- an array of points, transformed


Example
```
> const tr = nudged.transform.ROT90
> const ps = [{ x: 1, y: 0}, { x: 0, y: 1 }]
> nudged.point.transformMany(ps, tr)
[{ x: 0, y: 1 }, { x: -1, y: 0 }]
```

<a name="nudgedpointvalidate"></a>
## [nudged](#nudged).[point](#nudgedpoint).[validate](#nudgedpointvalidate)(p)

Check if the [point](#nudgedpoint) is a valid [point](#nudgedpoint) object.
Valid [point](#nudgedpoint) objects must have properties `x` and `y` that are finite numbers.
Valid [point](#nudgedpoint) objects are allowed to have custom properties.

<p style="margin-bottom: 0">Parameters</p>

- *p*
  - a [point](#nudgedpoint)


<p style="margin-bottom: 0">Return</p>

- a boolean, true if `p` is a valid [point](#nudgedpoint).


Examples
```
> nudged.point.validate({ x: 1, y: 0 })
true
> nudged.point.validate({ x: 1 })
false
```

<a name="nudgedtolerance"></a>
## [nudged](#nudged).[tolerance](#nudgedtolerance)

Default tolerance to use when coping with floating [point](#nudgedpoint) arithmetics.
JavaScript floating [point](#nudgedpoint) numbers have 52 bits in mantissa (IEEE-754).
That is about 16 base10 digits. Therefore the tolerance should be
much larger than 1 * 10^-16. Let say 1 * 10^-10 is a good one.

```
> nudged.tolerance
0.0000000001
```

<a name="nudgedtransform"></a>
## [nudged](#nudged).[transform](#nudgedtransform)

This namespace provides functions to create and modify *transforms*.

A *transform* is a plain object with the structure `{ a, b, x, y }`.
It defines a transformation matrix, and to be exact, an
[augmented affine](https://en.wikipedia.org/wiki/Affine_transformation#Augmented_matrix)
[non-reflective similarity](https://en.wikipedia.org/wiki/Similarity_(geometry))
transformation matrix.
Such transformation matrices are a compact way to represent
translation, rotation, and scaling in a single 3x3 matrix.
The matrix that the [transform](#nudgedtransform) represents has the following elements:

```
┌           ┐
│  a -b  x  │
│  b  a  y  │
│  0  0  1  │
└           ┘
```


- [nudged.transform.almostEqual](#nudgedtransformalmostequal)
- [nudged.transform.compose](#nudgedtransformcompose)
- [nudged.transform.create](#nudgedtransformcreate)
- [nudged.transform.equal](#nudgedtransformequal)
- [nudged.transform.fromArray](#nudgedtransformfromarray)
- [nudged.transform.fromPolar](#nudgedtransformfrompolar)
- [nudged.transform.fromRotation](#nudgedtransformfromrotation)
- [nudged.transform.fromScale](#nudgedtransformfromscale)
- [nudged.transform.fromString](#nudgedtransformfromstring)
- [nudged.transform.fromTranslation](#nudgedtransformfromtranslation)
- [nudged.transform.getRotation](#nudgedtransformgetrotation)
- [nudged.transform.getScale](#nudgedtransformgetscale)
- [nudged.transform.getTranslation](#nudgedtransformgettranslation)
- [nudged.transform.HALF](#nudgedtransformhalf)
- [nudged.transform.IDENTITY](#nudgedtransformidentity)
- [nudged.transform.inverse](#nudgedtransforminverse)
- [nudged.transform.ROT180](#nudgedtransformrot180)
- [nudged.transform.ROT270](#nudgedtransformrot270)
- [nudged.transform.ROT45](#nudgedtransformrot45)
- [nudged.transform.ROT90](#nudgedtransformrot90)
- [nudged.transform.rotateBy](#nudgedtransformrotateby)
- [nudged.transform.rotateTo](#nudgedtransformrotateto)
- [nudged.transform.scaleBy](#nudgedtransformscaleby)
- [nudged.transform.scaleTo](#nudgedtransformscaleto)
- [nudged.transform.SINGULAR](#nudgedtransformsingular)
- [nudged.transform.toArray](#nudgedtransformtoarray)
- [nudged.transform.toMatrix](#nudgedtransformtomatrix)
- [nudged.transform.toString](#nudgedtransformtostring)
- [nudged.transform.translateBy](#nudgedtransformtranslateby)
- [nudged.transform.translateTo](#nudgedtransformtranslateto)
- [nudged.transform.validate](#nudgedtransformvalidate)
- [nudged.transform.X2](#nudgedtransformx2)


<a name="nudgedtransformalmostequal"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[almostEqual](#nudgedtransformalmostequal)(tr, ts, tolerance)

Are two transforms almost equal?
Due to the limitations of floating [point](#nudgedpoint) precision,
most operations have a bit of numerical error in their results.
Therefore two matrices that should be equivalent according to the math,
might not have strictly equivalent elements.
For these situations, use [transform](#nudgedtransform).almostEqual instead of
the strict [transform.equal](#nudgedtransformequal).

<p style="margin-bottom: 0">Parameters:</p>

- *tr*
  - a [transform](#nudgedtransform)
- *ts*
  - a [transform](#nudgedtransform)
- *tolerance*
  - optional number, default to [nudged.tolerance](#nudgedtolerance).
  - Set to `0` for strict comparison.


<p style="margin-bottom: 0">Return</p>

- a boolean. True if the transforms are equal or almost equal.


For the difference metric, we use a modified L1 norm
that values a, b, x, and y equally. If the sum of the differences
is smaller or equal to the tolerance, consider the transforms equal.

<a name="nudgedtransformcompose"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[compose](#nudgedtransformcompose)(tr, ts)

Multiply the [transform](#nudgedtransform) tr from
the right with the given [transform](#nudgedtransform) ts.
In other words, the resulting [transform](#nudgedtransform) is equivalent to
first transforming with ts and then with tr.
To put it short, [transform](#nudgedtransform) the *image* of ts by tr.

<p style="margin-bottom: 0">Parameters</p>

- *tr*
  - a [transform](#nudgedtransform)
- *ts*
  - a [transform](#nudgedtransform)


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


<a name="nudgedtransformcreate"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[create](#nudgedtransformcreate)(a, b, x, y)

Create a [transform](#nudgedtransform) object `{ a, b, x, y }`.

<p style="margin-bottom: 0">Parameters</p>

- *a*
  - a number. Corresponds to the indices m11 and m22, the diagonal of the 2x2 linear transformation matrix.
- *b*
  - a number. Corresponds to the indices m12 & -m21, the upper and lower triangles of the linear transformation matrix.
- *x*
  - a number. Corresponds to the index m31, the translation towards x.
- *y*
  - a number. Corresponds to the index m32, the translation towards y


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform) object


<a name="nudgedtransformequal"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[equal](#nudgedtransformequal)(tr, ts)

Test that the transforms are strictly equal.
Transforms are strictly equal if every corresponding element is `===` equal.
Note that in practice, rounding errors of floating [point](#nudgedpoint) arithmetics often break
strict equality.
For loose equality, see [almostEqual](#nudgedtransformalmostequal).

<p style="margin-bottom: 0">Parameters:</p>

- *tr*
  - a [transform](#nudgedtransform)
- *ts*
  - a [transform](#nudgedtransform)


<p style="margin-bottom: 0">Return</p>

- a boolean


<a name="nudgedtransformfromarray"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[fromArray](#nudgedtransformfromarray)(arrtr)

Convert a [transform](#nudgedtransform) represented by an 4-element array `[a, b, x, y]`
to a [transform](#nudgedtransform) object `{ a, b, x, y }`.
Compatible with [nudged.transform.toArray](#nudgedtransformtoarray).

<p style="margin-bottom: 0">Parameters</p>

- *arrtr*
  - an array containing four numbers.


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


Example
```
> nudged.transform.fromArray([1, 2, 3, 4])
{ a: 1, b: 2, x: 3, y: 4 }
```

<a name="nudgedtransformfrompolar"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[fromPolar](#nudgedtransformfrompolar)(center, scale, rotation)

Create a [nudged.transform](#nudgedtransform) object by using scale and rotation
in respect of a center [point](#nudgedpoint).

<p style="margin-bottom: 0">Parameters:</p>

- *center*
  - a [point](#nudgedpoint)
- *scale*
  - a positive number. The scaling factor.
- *rotation*
  - a number. Rotation in radians from positive x axis towards pos. y axis.


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


Example
```
> const tr = nudged.transform.fromPolar({ x: 4, y: 2 }, 2, 0)
> const p = { x: 2, y: 1 }
> nudged.point.transform(p, tr)
{ x: 0, y: 0 }
```

<a name="nudgedtransformfromrotation"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[fromRotation](#nudgedtransformfromrotation)(center, radians)

Create a [transform](#nudgedtransform) that rotates around the center by the radians.

<p style="margin-bottom: 0">Parameter</p>

- *center*
  - a [point](#nudgedpoint)
- *radians*
  - a number, angle


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


Example:
```
> let rot = nudged.transform.fromRotation({ x: 4, y: 2 }, Math.PI / 5)
> rot
{ a: 0.809..., b: 0.587..., x: 1.939..., y: -1.969... }
```

<a name="nudgedtransformfromscale"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[fromScale](#nudgedtransformfromscale)(center, multiplier)

Create a [transform](#nudgedtransform) that scales in respect of the center [point](#nudgedpoint) and
the scale multiplier. Such [transform](#nudgedtransform) is called a
[homothety](https://en.wikipedia.org/wiki/Homothety).

<p style="margin-bottom: 0">Parameter</p>

- *center*
  - a [point](#nudgedpoint)
- *multiplier*
  - a number


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


Example:
```
> let x2 = nudged.transform.fromScale({ x: 4, y: 2 }, 2)
> x2
{ a: 2, b: 0, x: -4, y: -2 }
```

<a name="nudgedtransformfromstring"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[fromString](#nudgedtransformfromstring)(str)

Create a [transform](#nudgedtransform) from a string that uses
the CSS [transform](#nudgedtransform) matrix syntax: `matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0)`

Together with [nudged.transform.toString](#nudgedtransformtostring) this method makes an easy
serialization and deserialization to and from strings.

Note that the function does not yet support other CSS [transform](#nudgedtransform) functions
such as 'translate' or 'perspective'. It might also give unexpected
results if the matrix exhibits shear or non-uniform scaling.

<p style="margin-bottom: 0">Parameters:</p>

- *str*
  - a string, the CSS matrix description


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


<p style="margin-bottom: 0">Throws</p>

- if no valid [transform](#nudgedtransform) is found


<a name="nudgedtransformfromtranslation"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[fromTranslation](#nudgedtransformfromtranslation)(p)

Create a [transform](#nudgedtransform) that translates `{ 0, 0 }` to the [point](#nudgedpoint) `{ x, y }`.

<p style="margin-bottom: 0">Parameters</p>

- *p*
  - a [point](#nudgedpoint)


<p style="margin-bottom: 0">Return</p>

- a [point](#nudgedpoint)


Example
```
> let tl = nudged.transform.fromTranslation({ x: 4, y: 2 })
> tl
{ a: 1, b: 0, x: 4, y: 2 }
```

<a name="nudgedtransformgetrotation"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[getRotation](#nudgedtransformgetrotation)(tr)

Get rotation of the [transform](#nudgedtransform) in radians.
The rotation is measured from the positive x-axis towards
the positive y-axis.

<p style="margin-bottom: 0">Parameters</p>

- *tr*
  - a [transform](#nudgedtransform)


<p style="margin-bottom: 0">Return</p>

- a number, an angle in radians


Example
```
> const t = nudged.transform.ROT180
> nudged.transform.getRotation(t)
3.1415...
```

<a name="nudgedtransformgetscale"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[getScale](#nudgedtransformgetscale)(tr)

Get the scale multiplier of the transformation.

<p style="margin-bottom: 0">Parameters</p>

- *tr*
  - a [transform](#nudgedtransform)


<p style="margin-bottom: 0">Return</p>

- a number, the scaling factor


Example
```
> const t = nudged.transform.HALF
> nudged.transform.getScale(t)
0.5
```

<a name="nudgedtransformgettranslation"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[getTranslation](#nudgedtransformgettranslation)(tr)

Get the translating component of the given [transform](#nudgedtransform)
as a vector `{ x, y }`.

<p style="margin-bottom: 0">Parameters</p>

- *tr*
  - a [transform](#nudgedtransform)


<p style="margin-bottom: 0">Return</p>

- a [point](#nudgedpoint)


Example
```
> const t = nudged.transform.ROT45
> nudged.transform.getTranslation(t)
{ x: 0, y: 0 }
```

<a name="nudgedtransformhalf"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[HALF](#nudgedtransformhalf)

A prebuilt [transform](#nudgedtransform). Scales towards `{ x: 0, y: 0 }` by the factor of 0.5.

<a name="nudgedtransformidentity"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[IDENTITY](#nudgedtransformidentity)

The identity [transform](#nudgedtransform), resembles multiplication by 1 in the way that
it does not have any effect. You can use it as a starting [point](#nudgedpoint)
to build other transformations. For example:

```
const I = nudged.transform.IDENTITY
const center = { x: 320, y: 240 }
const angle = Math.PI / 5
const rotation = nudged.transform.rotateBy(I, center, angle)
```

<a name="nudgedtransforminverse"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[inverse](#nudgedtransforminverse)(tr)

Compute inversed [transform](#nudgedtransform). In other words, find [transform](#nudgedtransform) *X*
so that *TX = XT = I*, where *T* is the given [transform](#nudgedtransform).

<p style="margin-bottom: 0">Parameters</p>

- *tr*
  - a [transform](#nudgedtransform) to be inverted


<p style="margin-bottom: 0">Throws</p>

- if the given transformation is singular and cannot be inverted.
- This can occur for example in situations
- where the scale of the [transform](#nudgedtransform) has dropped to zero.


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


<a name="nudgedtransformrot180"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[ROT180](#nudgedtransformrot180)

A prebuilt [transform](#nudgedtransform). Rotates around `{ x: 0, y: 0 }` by 180 degrees.

<a name="nudgedtransformrot270"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[ROT270](#nudgedtransformrot270)

A prebuilt [transform](#nudgedtransform). Rotates around `{ x: 0, y: 0 }` by 270 degrees (= 3/4 turn = 3π/2).

<a name="nudgedtransformrot45"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[ROT45](#nudgedtransformrot45)

A prebuilt [transform](#nudgedtransform). Rotates around `{ x: 0, y: 0 }` by 45 degrees.

Example:

```
> const R = nudged.transform.ROT45
> nudged.transform.getRotation(R) * 360 / (2 * Math.PI)
45
> nudged.point.transform({ x: 1, y: 0 }, R)
{ x: 0.7071..., y: 0.7071... }
```

<a name="nudgedtransformrot90"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[ROT90](#nudgedtransformrot90)

A prebuilt [transform](#nudgedtransform). Rotates around `{ x: 0, y: 0 }` by 90 degrees.

<a name="nudgedtransformrotateby"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[rotateBy](#nudgedtransformrotateby)(tr, center, radians)

Rotate image of the [transform](#nudgedtransform) by the given radians
so that the given center [point](#nudgedpoint) stays fixed.

<p style="margin-bottom: 0">Parameter</p>

- *tr*
  - a [transform](#nudgedtransform)
- *center*
  - a [point](#nudgedpoint)
- *radians*
  - a number, angle


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


<a name="nudgedtransformrotateto"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[rotateTo](#nudgedtransformrotateto)(tr, center, radians)

Rotate the image of the [transform](#nudgedtransform) to the given angle
so that the given center [point](#nudgedpoint) stays fixed.
The angle is relative to the x-axis of the domain of the transformation.
After the rotation, x-axis of the image and a line at the angle are equal or parallel.

<p style="margin-bottom: 0">Parameter</p>

- *tr*
  - a [transform](#nudgedtransform)
- *center*
  - a [point](#nudgedpoint)
- *radians*
  - a number, the angle to rotate to.


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


<a name="nudgedtransformscaleby"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[scaleBy](#nudgedtransformscaleby)(tr, center, multiplier)

Scale the image of the [transform](#nudgedtransform) by the given multiplier
so that the given center [point](#nudgedpoint) stays fixed.
The operation is also called
[homothety](https://en.wikipedia.org/wiki/Homothety).

<p style="margin-bottom: 0">Parameter</p>

- *tr*
  - a [transform](#nudgedtransform)
- *center*
  - a [point](#nudgedpoint)
- *multiplier*
  - a number


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


<a name="nudgedtransformscaleto"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[scaleTo](#nudgedtransformscaleto)(tr, center, scale)

Scale the [transform](#nudgedtransform) tr so that:
1) its scale multiplier becomes equal with the given scale.
2) its image stays fixed at the given center [point](#nudgedpoint).

<p style="margin-bottom: 0">Parameters</p>

- *tr*
  - a [transform](#nudgedtransform)
- *center*
  - a [point](#nudgedpoint)
- *scale*
  - a number


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


<a name="nudgedtransformsingular"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[SINGULAR](#nudgedtransformsingular)

A prebuilt singular [transform](#nudgedtransform) `{ a: 0, b: 0, x: 0, y: 0 }`.
It resembles multiplication by 0.

<a name="nudgedtransformtoarray"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[toArray](#nudgedtransformtoarray)(tr)

Represent the [transform](#nudgedtransform) as a 4-element array.
This the array is compatible with [nudged.transform.fromArray](#nudgedtransformfromarray).

<p style="margin-bottom: 0">Parameters</p>

- *tr*
  - a [transform](#nudgedtransform)


<p style="margin-bottom: 0">Return</p>

- an array `[a, b, x, y]`


<a name="nudgedtransformtomatrix"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[toMatrix](#nudgedtransformtomatrix)(tr)

Get the similarity transformation matrix
in the format common to other APIs, including:

[DOMMatrix](https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix)
[WebKitCSSMatrix](https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix)
[kld-affine](https://github.com/thelonious/kld-affine)

<p style="margin-bottom: 0">Parameters</p>

- *tr*
  - a [transform](#nudgedtransform)


<p style="margin-bottom: 0">Return</p>

- an object `{ a, b, c, d, e, g }` that represents the matrix below.


```
┌           ┐
│  a  c  e  │
│  b  d  f  │
│  0  0  1  │
└           ┘
```

Example
```
> nudged.transform.toMatrix(tr)
{ a: 0.48, c: -0.52, e: 205.04,
  b: 0.52, d: 0.48, f: 4.83 }
```

<a name="nudgedtransformtostring"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[toString](#nudgedtransformtostring)(tr)

Return a string of CSS [transform](#nudgedtransform)-function data type.

Together with [nudged.transform.fromString](#nudgedtransformfromstring), this method allows
serialization to and from strings.

Example
```
> let sc = nudged.transform.fromScale({ x: 4, y: 2 }, 2)
> nudged.transform.toString(sc)
'matrix(2.00000000,0.00000000,0.00000000,2.00000000,-4.00000000,-2.00000000)'
```

The matrix values are fixed to 8 decimals. This prevents bugs
caused by the scientific notation e.g. '1e-12'. The default JavaScript
number-to-string conversion might produce scientific notation with
some very large and very small numbers. The scientific notation is not
understood by all CSS parsers. We have experienced problems with
Safari and Opera. Therefore toString must prevent the scientific
notation here and convert to fixed number of decimal places.
See [SO](https://stackoverflow.com/q/1685680/638546) for further details.

<a name="nudgedtransformtranslateby"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[translateBy](#nudgedtransformtranslateby)(tr, vec)

Modify transformation so that its image
is translated by the given vector.
Scale and rotation are kept intact.
In other words the resulting [transform](#nudgedtransform)
first applies the given tr and
applies an additional translation defined by the given vector.

<p style="margin-bottom: 0">Parameters</p>

- *tr*
  - a [transform](#nudgedtransform)
- *vec*
  - a vector `{ x, y }`


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


<a name="nudgedtransformtranslateto"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[translateTo](#nudgedtransformtranslateto)(tr, point)

Modify transformation so that it maps `{ x: 0, y: 0 }` to the given [point](#nudgedpoint).
The rotation and scale are kept intact.

<p style="margin-bottom: 0">Parameters</p>

- *tr*
  - a [transform](#nudgedtransform)
- [point](#nudgedpoint)
  - a [point](#nudgedpoint) `{ x, y }`.


<p style="margin-bottom: 0">Return</p>

- a [transform](#nudgedtransform)


<a name="nudgedtransformvalidate"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[validate](#nudgedtransformvalidate)(tr)

Check if the value is a valid, non-singular affine transformation.
A valid non-singular affine transformation must have properties
`a`, `b`, `x`, and `y` and the sum of `a` and `b` must not approach zero.

<p style="margin-bottom: 0">Parameters:</p>

- *tr*
  - a [transform](#nudgedtransform)


<p style="margin-bottom: 0">Return</p>

- a boolean


<a name="nudgedtransformx2"></a>
## [nudged](#nudged).[transform](#nudgedtransform).[X2](#nudgedtransformx2)

A prebuilt [transform](#nudgedtransform). Scales away from `{ x: 0, y: 0 }` by the factor of 2.

<a name="nudgedversion"></a>
## [nudged](#nudged).[version](#nudgedversion)

Contains the module version string identical to
the version tag in *package.json*.
This feature is powered by
[genversion](https://github.com/axelpale/genversion).

Example:

```
> nudged.version
'2.3.4'
```
