# nudged

![Nudged logo](doc/nudged-logo-2021.png)

[![NPM Version](https://img.shields.io/npm/v/nudged.svg)](https://www.npmjs.com/package/nudged)
[![Build Status](https://img.shields.io/travis/com/axelpale/nudged)](https://travis-ci.com/github/axelpale/nudged)

*Nudged* is **a JavaScript module** to efficiently estimate translation, scale, and/or rotation between two sets of 2D points. It has already been applied to **user interfaces, multi-touch recognition, geography, and eye tracker calibration**.

### Table of contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Example apps](#example-apps)
- [API](#api)
- [API Docs](doc/API.md)
- [For developers](#for-developers)
- [Acknowledgments](#acknowledgments)
- [Versioning](#versioning)
- [Licence](#licence)


## Introduction

In general, you can apply Nudged in any situation where you want to capture a 2D transformation based on a movement of any number of control points. See the image below for the available transformations Nudged can estimate.

<img src="doc/transformation-types.jpg" alt="Types of transformation estimators"/><br>
_**Image**: Available transformation estimators. Each estimator has an abbreviated name, for example 'SR', according to the free parameters to estimate. The black-white dots and connecting arrows represent movement of two control points. Given the control points, Nudged estimates a transformation. The pairs of photos represent the effect of the resulting transformation. For easy comparison, the control points and the initial image positions are kept the same for each type._

**Mathematically speaking**, Nudged is a set of optimal [least squares estimators](https://en.wikipedia.org/wiki/Least_squares) for the group of nonreflective similarity transformation matrices, also called [Helmert transformations](https://en.wikipedia.org/wiki/Helmert_transformation). Such transformations are [affine transformations](https://en.wikipedia.org/wiki/Affine_transformation) with translation, rotation, and/or uniform scaling, and without reflection or shearing. The estimation has [time complexity](https://en.wikipedia.org/wiki/Time_complexity) of O(*n*), where *n* is the cardinality (size) of the point sets. In other words, Nudged solves a 2D to 2D point set registration problem (alias [Procrustes superimposition](https://en.wikipedia.org/wiki/Procrustes_analysis)) in [linear time](https://en.wikipedia.org/wiki/Time_complexity#Linear_time). The algorithms and their efficiency are thoroughly described in a **M.Sc. thesis** [Advanced algorithms for manipulating 2D objects on touch screens](http://URN.fi/URN:NBN:fi:tty-201605264186).

**The development has been supported** by [Infant Cognition Laboratory](https://www.tuni.fi/en/research/infant-cognition) at [Tampere University](https://www.tuni.fi/en/) where Nudged is used to correct eye tracking data. Yet, the main motivation for Nudged comes from [Tapspace](https://github.com/taataa/tapspace), a zoomable user interface library where smooth and fast scaling by touch is crucial.


## Installation

With [npm](https://www.npmjs.com/package/nudged):

    $ npm install nudged

Available also [in Python](https://pypi.python.org/pypi/nudged).


## Usage

Let `domain` and `range` be sets of points `{ x, y }` before and after an unknown transformation as illustrated in the figure below:

    const domain = [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 2 }]
    const range  = [{ x: 1, y: 1 }, { x: 1, y: 3 }, { x: -1, y: 2 }]

<img src="https://rawgit.com/axelpale/nudged/master/doc/simple-example-pointset.png" alt="The transformation" width="500"/>

_**Figure**: Left: the domain. Center: the range. Right: the domain after transformation._

Compute an optimal transformation based on the points:

    const tran = nudged.estimate({
      estimator: 'TSR',
      domain: domain,
      range: range
    })

Examine the resulting transformation matrix:

    > tran
    { a: 0, b: 1, x: 1, y: 1 }
    > nudged.transform.toMatrix(tran)
    { a: 0, c: -1, e: 1,
      b: 1, d:  0, f: 1 }
    > nudged.transform.getRotation(tran)
    1.5707... = π / 2
    > nudged.transform.getScale(tran)
    1.0
    > nudged.transform.getTranslation(tran)
    { x: 1, y: 1 }

Apply the transformation to a point:

    > nudged.point.transform({ x: 2, y: 2 }, tran)
    { x: -1, y: 3 }

Apply the transformation to an HTML image element

    > img.style.transform = nudged.transform.toString(tran)

Invert the transformation:

    > const inv = nudged.transform.inverse(tran)
    > nudged.point.transform({ x: -1, y: 3 }, inv)
    { x: 2, y: 2 }

TODO: make the transform inexact to communicate the estimating nature of the result.
To compare how well the transform fits the domain to the range:

    > domain
    [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 2 }]
    > nudged.point.transformMany(domain, tran)
    [{ x: 1, y: 1 }, { x: 1, y: 3 }, { x: -1, y: 2 }]
    > range
    [{ x: 1, y: 1 }, { x: 1, y: 3 }, { x: -1, y: 2 }]

To get a numeric measure for the fit, you can compute the *mean squared error*. The smaller the error, the better the fit.

    > nudged.analysis.mse(rotateAround, domain, range)
    0

See [API](#api) for more.

### Set a center point

To estimate scalings and rotations around a fixed point, give an additional `center` parameter. Only the estimators `S`, `R`, and `SR` respect the `center` parameter.

    const center = { x: -1 , y: 0 }
    const rotateAround = nudged.estimate({
      estimator: 'R',
      domain: domain,
      range: range,
      center: center
    })

You can think the center point as a nail that keeps a very elastic sheet of rubber fixed onto a table. The nail retains its location regardless of how the rubber sheet is transformed around it, as illustrated in the figure below.

<img src="https://rawgit.com/axelpale/nudged/master/doc/simple-example-fixed.png" alt="A fixed point transformation" width="500"/>

_**Figure**: Left: a black pivot point and the domain. Center: the range. Right: the pivot and the domain after transformation._

To test the resulting transform, we can apply it to the center and observe that the point stays the same.

    > nudged.point.transform(center, rotateAround)
    { x: -1, y: 0 }

See [API](#api) for more.


## Example apps

The following demo applications give an example how nudged can be used in web.

### Multitouch transformation with N fingers

[<img src="https://rawgit.com/axelpale/nudged/master/examples/nudged-gesture/screenshot.jpg" alt="Four hands transforming the image simultaneously" width="600"/>](https://rawgit.com/axelpale/nudged/master/examples/nudged-gesture/index.html)

The [**touch gesture demo**](https://rawgit.com/axelpale/nudged/master/examples/nudged-gesture/index.html) takes the common pinch-zoom and rotate gestures a step further. Many multitouch apps allow you to scale and rotate with two fingers. However, usually the additional fingers are ignored. But what if one wants to use, say, both hands and all the fingers on a huge touchscreen?

For reference, the [**typical gesture demo**](https://rawgit.com/axelpale/nudged/master/examples/typical-gesture/index.html) implements similar demo with the popular [Hammer.js](http://hammerjs.github.io/) touch gesture library. As you can experience, only the first two pointers are regarded for scaling and rotation.

### Point set editor

[<img src="https://rawgit.com/axelpale/nudged/master/examples/nudged-editor/screenshot.png" alt="Nudged editor screenshot" width="600"/>](https://rawgit.com/axelpale/nudged/master/examples/nudged-editor/index.html)

The [**editor demo**](https://rawgit.com/axelpale/nudged/master/examples/nudged-editor/index.html) allows you to add domain and range points on a surface and explore how the points affect the transformation.

### Tokyo metro map viewer

[<img src="https://rawgit.com/axelpale/nudged/master/examples/nudged-map/screenshot.png" alt="A screenshot of Nudged map viewer example" width="600"/>](https://rawgit.com/axelpale/nudged/master/examples/nudged-map/index.html)

In this [map viewer demo](https://rawgit.com/axelpale/nudged/master/examples/nudged-map/index.html), nudged is used to recognize multi-touch gestures to scale, rotate, and translate [a large image](https://commons.wikimedia.org/wiki/File:Tokyo_metro_map.png) on HTML5 canvas.


# API

Nudged API is divided into following modules:

- Geometries
  - `nudged.point` – operators for a 2D point
  - `nudged.transform` – operators for a nonreflective similarity transformation matrix
- Estimators
  - `nudged.estimate` - general estimator function
  - `nudged.estimators` – specific estimator functions
- Analysis
  - `nudged.analysis` – estimation analysis tools
- Other
  - `nudged.epsilon` – equality tolerance due to floating point arithmetic
  - `nudged.version` – the version of the package

The code follows the functional, classless, immutable paradigm. All the functions take in only plain objects and values such as `{ x: 1, y: 2 }` and also return only plain objects and values. You can expect no side effects nor memories form previous calls.

## nudged.point

A set of operators for 2D point objects `{ x, y }`.

### nudged.point.almostEqual(p, q[, tolerance])

Test if two points are almost equal within the limit given by the optional tolerance parameter.

Parameters:
- `p`
  - a point
- `q`
  - a point
- `tolerance`
  - optional number
  - Defaults to nudged.epsilon.
  - Set to 0 for strict comparison.

Return:
- boolean

Example:

    > nudged.point.almostEqual({ x: 0, y: 0 }, { x: 0, y: 1.23e-16 })
    true
    > nudged.point.almostEqual({ x: 0, y: 0 }, { x: 0, y: 0.1 })
    false
    > nudged.point.almostEqual({ x: 0, y: 0 }, { x: 0, y: 0.1 }, 0.2)
    true

### nudged.point.create(x, y)

Create a point object.

Parameters:
- `x`
  - a number
- `y`
  - a number

Return:
- a point `{ x, y }`

### nudged.point.distance(p, q)

The Euclidean distance between two points, also called the Euclidean norm alias L2-norm.

Parameters:
- p
  - a point
- q
  - a point

Return:
- number, a distance from p to q (= distance from q to p)

Example:

    > nudged.point.distance({ x: 0, y: 0 }, { x: 3, y: 4 })
    5











### nudged.create(scale, rotation, translationX, translationY)

Create a transformation that scales, rotates, and translates as specified.

**Parameters:**
- *scale*: a number; the scaling factor.
- *rotation*: a number; the rotation in radians from positive x axis toward positive y axis.
- *translationX*: a number; translation after rotation, toward positive x axis.
- *translationY*: a number; translation after rotation, toward positive y axis.

The parameters are optional and default to the identity transformation.

**Return** a new `nudged.Transform` instance.

**Examples:**

    > var t0 = nudged.create()
    > t0.transform([3, 1])
    [3, 1]

    > var t1 = nudged.create(2)
    > t1.transform([3, 1])
    [6, 2]

    > var t2 = nudged.create(1, Math.PI / 2)
    > t2.transform([3, 1])
    [-1, 3]

    > var t3 = nudged.create(1, 0, 20.2, 0)
    > t3.transform([3, 1])
    [23.2, 1]

### nudged.createFromArray(arr)

Create a `nudged.Transform` instance from an array created by nudged.Transform#toArray(). Together with `nudged.Transform#toArray()` this method makes an easy **serialization and deserialization** to and from JSON possible.

    > var t1 = nudged.create(1, 2, 3, 4)
    > var arr = trans.toArray()
    > var t2 = nudged.createFromArray(arr)
    > t1.equals(t2)
    true

### nudged.estimate(type, domain, range, param?)

Compute an optimal affine transformation from *domain* to *range* points. The *type* of transformation determines the freedom of the transformation to be estimated.

**Available types**

- `I`: Identity transform. Whatever the points, returns always the identity transformation.
- `L`: Translation along line. Takes additional *angle* parameter in radians. Direction of the angle is from positive x-axis towards positive y-axis.
- `X`: Horizontal translation. Equivalent to `L` with angle 0.
- `Y`: Vertical translation. Equivalent to `L` with angle ±PI/2.
- `T`: Free translation.
- `S`: Scaling about a fixed *pivot* point.
- `R`: Rotation around a fixed *pivot* point.
- `TS`: Free translation with scaling.
- `TR`: Free translation with rotation.
- `SR`: Scaling and rotation around a fixed *pivot* point.
- `TSR`: Free translation with both scaling and rotation.

**Parameters:**
- *type*: string. The freedom of the transformation. Must be one of the following: `'I'`, `'L'`, `'X'`, `'Y'`, `'T'`, `'S'`, `'R'`, `'TS'`, `'TR'`, `'SR'`, `'TSR'`
- *domain*: array of [x,y] points. The source point set.
- *range*: array of [x,y] points. The target point set.
- *param*: For types `S`, `R`, and `SR` this is an optional `[x,y]` pivot point that defaults to the origin `[0,0]`. For type `L` this is an angle in radians so that angle PI/2 (90 deg) is towards positive y-axis.

The *domain* and *range* should have equal length. Different lengths are allowed but additional points in the longer array are ignored.

**Return** new `nudged.Transform(...)` instance.

You can also call the estimators directly for slightly enhanced performance:

- `nudged.estimateI()`
- `nudged.estimateL(domain, range, angle)`
- `nudged.estimateX(domain, range)`
- `nudged.estimateY(domain, range)`
- `nudged.estimateT(domain, range)`
- `nudged.estimateS(domain, range, pivot)`
- `nudged.estimateR(domain, range, pivot)`
- `nudged.estimateTS(domain, range)`
- `nudged.estimateTR(domain, range)`
- `nudged.estimateSR(domain, range, pivot)`
- `nudged.estimateTSR(domain, range)`

**Example:**

    > var domain = [[0,0], [2,0], [ 1,2]]
    > var range  = [[1,1], [1,3], [-1,2]]
    > var tr = nudged.estimate('SR', domain, range)
    > tr.getScale()
    1.242259
    > tr.getRotation()
    1.107148

### nudged.version

Contains the module version string identical to the version in *package.json*.

    > nudged.version
    '1.2.3'

### nudged.Transform(s, r, tx, ty)

A constructor for a nonreflective similarity transformation. You usually do not need to call it directly because both `nudged.create(...)` and `nudged.estimate(...)` create and return instances for you. Nevertheless, if you need to create one:

    > var trans = new nudged.Transform(0.5, 0, 20, 0)

The `nudged.Transform` instance is designed to be immutable.

**Parameters** `s`, `r`, `tx`, and `ty` define the elements of an [augmented transformation matrix](https://en.wikipedia.org/wiki/Affine_transformation#Augmented_matrix) in the following manner:

    | s  -r  tx |
    | r   s  ty |
    | 0   0   1 |

Note that `s` and `r` do **not** represent scaling and rotation but instead `s = scalingFactor * Math.cos(rotationRads)` and `r = scalingFactor * Math.sin(rotationRads)`. The parameters `tx` and `ty` represent horizontal and vertical translation after rotation.

### nudged.Transform.IDENTITY

A default instance of `nudged.Transform` that represents the identity transformation `new Transform(1, 0, 0, 0)` i.e. transformation without an effect. You can use it in building new transformations:

    > var trans = nudged.Transform.IDENTITY.scaleBy(0.6).rotateBy(0.3);

### nudged.Transform.R90 .R180 .R270 .X2

Following prebuilt `Transform` instances are available:

- `R90`: clockwise 90 degree rotation. Equal to `new Transform(0, 1, 0, 0)`.
- `R180`: 180 degree rotation. Equal to `new Transform(-1, 0, 0, 0)`.
- `R270`: counterclockwise 90 degree rotation. Equal to `new Transform(0, -1, 0, 0)`.
- `X2`: scale up by the factor of two. Equal to `new Transform(2, 0, 0, 0)`.

**Example:**

    > nudged.Transform.X2.getScale()
    2

### nudged.Transform#s, #r, #tx, #ty

Elements of the internal transformation matrix. Direct use of these properties is not recommended.

    > var t = nudged.create(2, Math.PI / 2, 10, 20)
    > t.s
    1.2246e-16
    > t.r
    2
    > t.tx
    10
    > t.ty
    20

### nudged.Transform#almostEqual(tr, epsilon?)

Compare equality of two transformations and allow small differences that likely occur due to floating point arithmetics.

**Alias** `.almostEquals(tr)`

**Parameter** `tr` is an instance of `nudged.Transform`. Optional parameter `epsilon` is a small number that defines largest allowed difference and defaults to `Transform.EPSILON`. The difference is computed as the sum of absolute differences of the properties s, r, tx, and ty.

**Return** true if the parameters of the two transformations are equal or almost equal and false otherwise.

### nudged.Transform#equal(tr)

**Alias** `.equals(tr)`

**Parameter** `tr` is an instance of `nudged.Transform`.

**Return** true if the parameters of the two transformations are equal and false otherwise.

### nudged.Transform#getMatrix()

Get the transformation matrix in a format compatible with [kld-affine](https://www.npmjs.com/package/kld-affine).

**Return** an object with properties `a`, `b`, `c`, `d`, `e`, and `f`.

    > trans.getMatrix()
    { a: 0.48, c: -0.52, e: 205.04,
      b: 0.52, d: 0.48, f: 4.83 }

The properties represent the following matrix:

    | a   c   e |
    | b   d   f |
    | 0   0   1 |

### nudged.Transform#getRotation()

Get clockwise rotation from the positive x-axis.

**Return** rotation in radians.

### nudged.Transform#getScale()

**Return** scaling multiplier, e.g. `0.333` for a threefold shrink.

### nudged.Transform#getTranslation()

**Return** `[tx, ty]` where `tx` and `ty` denotes movement along x-axis and y-axis accordingly.

### nudged.Transform#toArray()

Together with `nudged.createFromArray(...)` this method makes an easy serialization and deserialization to and from JSON possible.

**Return** an array representation of the transformation: `[s, r, tx, ty]`. Note that `s` and `r` do not represent scaling and rotation but elements of the matrix.

### nudged.Transform#transform(points)

Apply the transform to a point or an array of points.

**Parameter** `points` is an array of points `[[x, y], ...]` or a single point `[x, y]`.

**Return** an array of transformed points or single point if only a point was given. For example:

    > trans.transform([1,1])
    [2,2]
    > trans.transform([[1,1]])
    [[2,2]]
    > trans.transform([[1,1], [2,3]])
    [[2,2], [3,4]]

### nudged.Transform#inverse()

**Return** a new `nudged.Transform` instance that is the inverse of the original transformation.

**Throw** an `Error` instance if the transformation is singular and cannot be inversed. This occurs if the range points are all the same which forces the scale to drop to zero.

### nudged.Transform#translateBy(dx, dy)

**Return** a new `nudged.Transform` instance where the image of the original has been translated.

### nudged.Transform#scaleBy(multiplier, pivot?)

**Parameter** `multiplier` is a number. Optional parameter `pivot` is a point `[x, y]`.

**Return** a new `nudged.Transform` instance where the image of the original has been scaled.

The scaling is done around an optional pivot point that defaults to [0,0].

### nudged.Transform#rotateBy(radians, pivot?)

**Parameter** `radians` is a number. Optional parameter `pivot` is a point `[x, y]`.

**Return** a new `nudged.Transform` instance where the image of the original has been rotated.

The rotation is done around an optional pivot point that defaults to [0,0].

### nudged.Transform#multiplyBy(tr)

**Alias** `.multiplyRight(tr)`

**Parameter** `tr` is an instance of `nudged.Transform`.

**Return** a new `nudged.Transform` instance where the original transformation matrix is multiplied from the right with the transformation matrix of `tr`.

The resulting transformation is equal to first transforming with `tr` and then with the instance. More precisely, the image of the resulting transformation is the image of `tr` transformed by the instance.


## For developers

Guidelines:

- ES6
- Standard style
  - 2 space indent
  - max 80 chars per line
  - spaces around operators
- Functional approach
  - function libraries instead instead of classes and methods
  - immutable and stateless data handling; no in-place manipulation
- Minimal run-time type checking
  - Nudged is designed to be a low-level module with high performance.
  - Provide dedicated .validate function
- Rich comments that answer the question why.

Run lint & unit tests:

    $ npm run test

Build example apps:

    $ npm run build:examples

Start local server to try out the examples:

    $ npm start

Git workflow:

- Create a feature branch: `$ git branch feature-name`
- When feature finished, merge:
  - `$ git checkout master`
  - `$ git merge feature-name`
  - `$ git push`
  - Delete the feature branch.
- Bump version in package.json, `npm run gv`, and run tests.
- Build examples `npm run build:examples`
- Commit: `$ git commit -a -m "Release 7.7.7"`
- Create [tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging):
  - `$ git tag -a 7.7.7 -m "v7.7.7 Superb Name"`
  - `$ git push --tags`
- Publish to npm:
  - `$ npm publish`


## Acknowledgments

We want to thank:

- [Tampere University of Technology](https://www.tuni.fi/en) and [Adj. Prof. Ossi Nykänen](https://www.researchgate.net/scientific-contributions/Ossi-Nykaenen-69896506) for guidance on the [M.Sc. thesis on Nudged](http://URN.fi/URN:NBN:fi:tty-201605264186).
- [Infant Cognition Laboratory at University of Tampere](https://www.tuni.fi/en/research/infant-cognition) and [Adj. Prof. Jukka Leppänen](https://scholar.google.fi/citations?user=dNRRUIsAAAAJ) for funding and support in research.
- [3D Media Group at Tampere University of Technology](https://www.tuni.fi/en/research/3d-media-group), [M.Sc. Olli Suominen](https://tutcris.tut.fi/portal/en/persons/olli-suominen(8d7b7ce4-1468-4621-9a6e-d307f644c9bb).html), and [Assoc. Prof. Atanas Gotchev](https://tutcris.tut.fi/portal/en/persons/atanas-gotchev(3b4a825b-941b-484e-b046-cd09bde1cd31).html) for providing touch-screen devices for testing.
- Tanja for math photos.
- Vilkku, Xiao, and Krista for finger photos.


## Versioning

[Semantic Versioning 2.0.0](http://semver.org/)



## Licence

[MIT Licence](../blob/master/LICENSE)
