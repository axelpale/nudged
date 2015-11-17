# nudged<sup>1.0.0</sup>

A JavaScript lib to estimate translation, scale, and/or rotation between two sets of 2D points. Applicable for example in cases where one wants to move objects by multiple fingers or where data from an eye tracker device are wanted to be corrected based on a few calibration points. In general, you can apply *nudged* in any situation where you want to transform a number of points based on a few sample points and optionally one fixed pivot point. See the image below for visual explanation.

<img src="https://rawgit.com/axelpale/nudged/master/doc/figure-pointset.png" alt="Example transformation" width="400"/>
Image: You have a set of points (left) and you known where three of them should be moved (center). With *nudged*, based on the initial position of the three points, the *domain*, and their target positions, the *range*, you can estimate a transformation that nicely transforms all the rest of the points (right).

Mathematically speaking, *nudged* is an optimal least squares estimator for [affine transformation matrices](https://en.wikipedia.org/wiki/Affine_transformation) with translation, rotation, and/or uniform scaling, and without reflection or shearing. The estimation has time complexity of O(*n*), where *n* is the cardinality (size) of the point sets. In other words, *nudged* solves an affine 2D to 2D point set registration problem (alias [Procrustes superimposition](https://en.wikipedia.org/wiki/Procrustes_analysis)) in linear time.

The development of *nudged* has been supported by [Infant Cognition Laboratory](http://www.uta.fi/med/icl/index.html) at [University of Tampere](http://www.uta.fi/en/) where it is used to correct eye tracking data.

Available also [in Python](https://pypi.python.org/pypi/nudged).



## Example app

To get a grip on how the transformation looks and how the points affect it, play with the [interactive example app](https://rawgit.com/axelpale/nudged/master/example/index.html).

<img src="https://rawgit.com/axelpale/nudged/master/example/screenshot.png" alt="Example application" width="600"/>



## Install

    $ npm install nudged



## Usage

Let `domain` and `range` be point sets before and after transformation i.e. the training data:

    var domain = [[0,0], [2,0], [ 1,2]]
    var range  = [[1,1], [1,3], [-1,2]]

<img src="https://rawgit.com/axelpale/nudged/master/doc/simple-example-pointset.png" alt="The transformation" width="400"/>

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


Alternatively, set a fixed pivot point that should not be altered in the transformation. You can think it as a pin or anchor:

    var pivot = [-1,0];
    var pivotTrans = nudged.estimate('SR', domain, range, pivot);

<img src="https://rawgit.com/axelpale/nudged/master/doc/simple-example-fixed.png" alt="A fixed point transformation" width="400"/>

Not the domain transforms to:

    pivotTrans.transform(domain)
    -> TODO


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

You can also call any type of estimator directly:

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

An instance returned by the `nudged.estimate(...)`.

In addition to the methods below, it has properties *s*, *r*, *tx*, *ty* that define the [augmented transformation matrix](https://en.wikipedia.org/wiki/Affine_transformation#Augmented_matrix):

    |s  -r  tx|
    |r   s  ty|
    |0   0   1|

#### #transform(points)

Apply the transform to a point or an array of points.

**Return** an array of transformed points or single point if only a point was given. For example:

    trans.transform([1,1])           // [2,2]
    trans.transform([[1,1]])         // [[2,2]]
    trans.transform([[1,1], [2,3]])  // [[2,2], [3,4]]

#### #getMatrix()

**Return** an 3x3 augmented transformation matrix in the following array format:

    [[s,-r, tx],
     [r, s, ty],
     [0, 0,  1]]

#### #getRotation()

Get clockwise rotation from the positive x-axis.

**Return** rotation in radians.

#### #getScale()

**Return** scaling multiplier, e.g. `0.333` for a threefold shrink.

#### #getTranslation()

**Return** `[tx, ty]` where `tx` and `ty` denotes movement along x-axis and y-axis accordingly.

#### #inverse()

**Return** a new `nudged.Transform` instance that is the inverse of the transformation.

**Throw** an `Error` instance if the transformation is singular and cannot be inversed. This occurs if the range points are all the same which forces the scale to drop to zero.



## For developers

Run lint & unit tests:

    $ npm run test

Build example app:

    $ npm run build:example



## Roadmap

- type API implementation & testing
- Transform methods: scale, rotate, multiply, translate
- OK Pivoted transformation example
- Improved demo application
- Touch demo

## Versioning

[Semantic Versioning 2.0.0](http://semver.org/)



## License

[MIT License](../blob/master/LICENSE)
