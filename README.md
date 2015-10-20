# nudged<sup>0.2.0</sup>

A JavaScript lib to estimate scale, rotation, and translation between two sets of 2D points. Applicable for example in cases where one wants to move objects by multiple fingers or where a large number of points from an eye tracker device are wanted to be corrected based on a few calibration points. In general, you can apply nudged in any situation where you want to move a number of points based on a few sample points.

<img src="http://github.com/axelpale/nudged.py/master/doc/nudged-logo.png?raw=true" alt="Example transformation" width="300"/>

Mathematically speaking, nudged is an optimal least squares estimator for [affine transformation matrices](https://en.wikipedia.org/wiki/Affine_transformation) with uniform scaling, rotation, and translation and without reflection and shearing. The estimation has time complexity of O(*n*) that consists of 6n+22 multiplications and 11n+19 additions, where *n* is the cardinality (size) of the point sets. In other words, nudged solves an affine 2D to 2D point set registration problem in linear time.



## Install

    npm install nudged



## Usage

    // Points before and after transformation i.e. the training data
    var domain = [[0,0], [2,0], [ 1,2]];
    var range  = [[1,1], [1,3], [-1,2]];

    // Compute an optimal tranformation based on the points
    var trans = nudged.estimate(domain, range);
    trans.getMatrix()
    // [[0,-1, 1],
    //  [1, 0, 1],
    //  [0, 0, 1]]

    // Apply the transformation to other points
    trans.transform([2,2])
    // [-1,3]

    // Get rotation in radians
    trans.getRotation()
    // 1.5707... = π / 2

    // Get scaling multiplier
    trans.getScale()
    // 1.0

    // Get horizontal and vertical movement
    trans.getTranslation()
    // [1, 1]



## API


### nudged.estimate(domain, range)

**Parameters**
- *domain*, array of [x,y] points
- *range*, array of [x,y] points

The *domain* and *range* should have equal length. Different lengths are allowed but additional points in the longer array are ignored in the estimation.

**Return** new *nudged.Transform(...)* instance.


### nudged.version

Contains the module version string equal to the version in *package.json*.


### nudged.Transform(s, r, tx, ty)

An instance returned by the *nudged.estimate(...)*.

In addition to the methods below, it has properties *s*, *r*, *tx*, *ty* that define the [augmented transformation matrix](https://en.wikipedia.org/wiki/Affine_transformation#Augmented_matrix):

    |s  -r  tx|
    |r   s  ty|
    |0   0   1|

#### #transform(points)

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

**Return** rotation in radians.

#### #getScale()

**Return** scaling multiplier, e.g. `0.333` for a threefold shrink.

#### #getTranslation()

**Return** `[tx, ty]` where `tx` and `ty` denotes movement along x-axis and y-axis accordingly.



## For developers

Run lint & unit tests:

    $ npm run test



## Versioning

[Semantic Versioning 2.0.0](http://semver.org/)



## License

[MIT License](../blob/master/LICENSE)
