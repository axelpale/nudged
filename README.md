# nudged<sup>1.0.0</sup>

A JavaScript lib to estimate translation, scale, and/or rotation between two sets of 2D points. Applicable for example in cases where one wants to move objects by multiple fingers or where data from an eye tracker device are wanted to be corrected based on a few calibration points. In general, you can apply *nudged* in any situation where you want to transform a number of points based on a few sample points and optionally one fixed pivot point. See the image below for visual explanation.

<img src="https://rawgit.com/axelpale/nudged/development/doc/figure-pointset.png" alt="Example transformation" width="500"/>

Image: You have a set of points (left) and you known where three of them should be moved (center). With *nudged*, based on the initial position of the three points, the *domain*, and their target positions, the *range*, you can estimate a transformation that nicely transforms all the rest of the points (right).

Mathematically speaking, *nudged* is an optimal least squares estimator for [affine transformation matrices](https://en.wikipedia.org/wiki/Affine_transformation) with translation, rotation, and/or uniform scaling, and without reflection or shearing. The estimation has time complexity of O(*n*), where *n* is the cardinality (size) of the point sets. In other words, *nudged* solves an affine 2D to 2D point set registration problem (alias [Procrustes superimposition](https://en.wikipedia.org/wiki/Procrustes_analysis)) in linear time.

The development of *nudged* has been supported by [Infant Cognition Laboratory](http://www.uta.fi/med/icl/index.html) at [University of Tampere](http://www.uta.fi/en/) where it is used to correct eye tracking data.

Available also [in Python](https://pypi.python.org/pypi/nudged).



## Example apps

To get a grip on how the transformation looks and feels and how the points affect it, play with the following demos.

### Multitouch transformation with N fingers

[<img src="https://rawgit.com/axelpale/nudged/development/examples/nudged-gesture/screenshot.jpg" alt="Four hands transforming the image simultaneously" width="600"/>](https://rawgit.com/axelpale/nudged/development/examples/nudged-gesture/index.html)

The [**touch gesture demo**](https://rawgit.com/axelpale/nudged/development/examples/nudged-gesture/index.html) takes the common pinch-zoom and rotate gestures a step further. Many multitouch apps allow you to scale and rotate with two fingers. However, usually the additional fingers are ignored. But what if one wants to use, say, both hands and all the fingers on a huge touchscreen?

For reference, the [**typical gesture demo**](https://rawgit.com/axelpale/nudged/development/examples/typical-gesture/index.html) implements similar demo with the popular [Hammer.js](http://hammerjs.github.io/) touch gesture library. As you can experience, only the first two pointers are regarded for scaling and rotation.



### Point set editor

[<img src="https://rawgit.com/axelpale/nudged/development/examples/nudged-editor/screenshot.png" alt="Nudged editor screenshot" width="600"/>](https://rawgit.com/axelpale/nudged/development/examples/nudged-editor/index.html)

The [**editor demo**](https://rawgit.com/axelpale/nudged/development/examples/nudged-editor/index.html) allows you to add domain and range points on a surface and explore how the points affect the transformation.



## Install

With [npm](https://www.npmjs.com/package/nudged):

    $ npm install nudged



## Usage

Let `domain` and `range` be point sets before and after transformation i.e. the training data:

    var domain = [[0,0], [2,0], [ 1,2]]
    var range  = [[1,1], [1,3], [-1,2]]

<img src="https://rawgit.com/axelpale/nudged/development/doc/simple-example-pointset.png" alt="The transformation" width="500"/>

Compute an optimal transformation based on the points:

    var trans = nudged.estimate('TSR', domain, range)

Examine the transformation matrix:

    trans.getMatrix()
    -> [[0,-1, 1],
        [1, 0, 1],
        [0, 0, 1]]
    trans.getRotation()
    -> 1.5707... = π / 2
    trans.getScale()
    -> 1.0
    trans.getTranslation()
    -> [1, 1]

Apply the transformation to other points:

    trans.transform([2,2])
    -> [-1,3]

Inverse the transformation:

    var inv = trans.inverse()
    inv.transform([-1,3])
    -> [2,2]

### Pivoted transformation

Alternatively, in addition to the domain and range, set a fixed pivot point that should not be altered in the transformation.

    var pivot = [-1,0]
    var domain = [[0,0], [2,0], [ 1,2]]
    var range  = [[1,1], [1,3], [-1,2]]
    var pivotTrans = nudged.estimate('SR', domain, range, pivot)

<img src="https://rawgit.com/axelpale/nudged/development/doc/simple-example-fixed.png" alt="A fixed point transformation" width="500"/>

Now the domain points can be transformed:

    pivotTrans.transform(domain)
    -> [[-0.33, 0.77], [0.99, 2.33], [-1.22, 2.88]]


## API

Nudged provides 7 types of estimators, one for each combination of translation, scaling, and rotation. The ones without translation allow an optional fixed point where for the rest a fixed point does not make sense.


### nudged.estimate(type, domain, range, pivot?)

Compute an optimal affine transformation from the *domain* to *range* points. The type of transformation is any combination of translation `T`, scaling `S`, and rotation `R`, given as *type* string. The transformations without translation allow an optional fixed *pivot* point.

**Parameters**
- *type*: freedom of the transformation. Types available: 'T', 'S', 'R', 'TS', 'TR', 'SR', 'TSR'
- *domain*: array of [x,y] points
- *range*: array of [x,y] points
- *pivot*: optional [x,y] point. Defaults to the origin [0,0].

The *domain* and *range* should have equal length. Different lengths are allowed but additional points in the longer array are ignored in the estimation.

**Return** new `nudged.Transform(...)` instance.

You can also call the estimators directly:

- `nudged.estimateT(domain, range)`
- `nudged.estimateS(domain, range, pivot)`
- `nudged.estimateR(domain, range, pivot)`
- `nudged.estimateTS(domain, range)`
- `nudged.estimateTR(domain, range)`
- `nudged.estimateSR(domain, range, pivot)`
- `nudged.estimateTSR(domain, range)`


### nudged.version

Contains the module version string equal to the version in *package.json*.


### nudged.Transform(s, r, tx, ty)

A `nudged.Transform` instance is returned by the `nudged.estimate(...)`.

In addition to the methods below, it has properties *s*, *r*, *tx*, *ty* that define the [augmented transformation matrix](https://en.wikipedia.org/wiki/Affine_transformation#Augmented_matrix):

    |s  -r  tx|
    |r   s  ty|
    |0   0   1|

#### nudged.Transform#transform(points)

Apply the transform to a point or an array of points.

**Return** an array of transformed points or single point if only a point was given. For example:

    trans.transform([1,1])           // [2,2]
    trans.transform([[1,1]])         // [[2,2]]
    trans.transform([[1,1], [2,3]])  // [[2,2], [3,4]]

#### nudged.Transform#getMatrix()

**Return** the transformation matrix in the following format:

    { a: s, c: -r, e: tx,
      b: r, d:  s, f: ty }

For example:

    { a: 0.48, c: -0.52, e: 205.04,
      b: 0.52, d: 0.48, f: 4.83 }

#### nudged.Transform#getRotation()

Get clockwise rotation from the positive x-axis.

**Return** rotation in radians.

#### nudged.Transform#getScale()

**Return** scaling multiplier, e.g. `0.333` for a threefold shrink.

#### nudged.Transform#getTranslation()

**Return** `[tx, ty]` where `tx` and `ty` denotes movement along x-axis and y-axis accordingly.

#### nudged.Transform#inverse()

**Return** a new `nudged.Transform` instance that is the inverse of the original transformation.

**Throw** an `Error` instance if the transformation is singular and cannot be inversed. This occurs if the range points are all the same which forces the scale to drop to zero.

#### nudged.Transform#translateBy(dx, dy)

**Return** a new `nudged.Transform` instance where the image of the original has been translated.

#### nudged.Transform#scaleBy(multiplier, pivot?)

**Return** a new `nudged.Transform` instance where the image of the original has been scaled.

The scaling is done around an optional pivot point that defaults to [0,0].

#### nudged.Transform#rotateBy(radians, pivot?)

**Return** a new `nudged.Transform` instance where the image of the original has been rotated.

The rotation is done around an optional pivot point that defaults to [0,0].



## For developers

Run lint & unit tests:

    $ npm run test

Build example apps:

    $ npm run build:examples



## Roadmap

- OK type API implementation & testing
- OK Transform methods: scale, rotate, multiply, translate
- OK Document scale, rotate, multiply, translate
- OK scaleBy, rotateBy ... to prevent misunderstanding
- OK Pivoted transformation example
- OK Reference touch demo
- OK Touch demo
- Improved demo application
- OK Insert touch demo image
- OK Include link to npm
- OK Mouse support for the touch demo.
- OK redesign getMatrix to return typical a, b, c, d, e, f
- Release 1.0.0



## Versioning

[Semantic Versioning 2.0.0](http://semver.org/)



## License

[MIT License](../blob/master/LICENSE)
