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

See the [API documentation](doc/API.md).

TODO process the following API docs to the source code because
they have lots of examples not yet in the code.

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

### nudged.Transform#getRotation()

Get clockwise rotation from the positive x-axis.

**Return** rotation in radians.

### nudged.Transform#getScale()

**Return** scaling multiplier, e.g. `0.333` for a threefold shrink.

### nudged.Transform#getTranslation()

**Return** `[tx, ty]` where `tx` and `ty` denotes movement along x-axis and y-axis accordingly.


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
  - `$ git checkout master`
  - `$ git merge feature-name`
  - `$ git push`
  - Delete the feature branch.
- Bump version in package.json, `npm run gv`, and run tests.
- Build examples `npm run build:examples`
- Commit: `$ git commit -a -m "Release 7.7.7"`
- Create [tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging):
  - `$ git tag -a 7.7.7 -m "v7.7.7 Superb Name"`
  - `$ git push --tags`
- Publish to npm:
  - `$ npm publish`


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
