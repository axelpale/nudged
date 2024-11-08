# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [2.1.0] - 2024-11-08

### Added

- Add TypeScript type declarations `index.d.ts` (#29 #30)
- Release UMD bundle via Unpkg.com (#32)
- Add dev dependency: yamdog (#34) and terser (#32)
- Add navigational links to README
- Add source code links from API docs to GitHub.
- Add GitHub Pages for Nudged.
- Add GitHub action job for testing type declarations.

### Changed

- Generate API docs with yamdog instead of ad-hoc tooling. (#34)
- Improve documentation all around.
- Minify standalone builds by default (#32)

### Fixed

- Fix a property name typo in transform.toMatrix documentation.

### Removed

- Remove unused dev dependencies: async, lodash


## [2.0.1] - 2024-10-28

### Added

- Add dependency status badge in README
- Write "See also" section in README
- Write CHANGELOG.md (#35)

### Changed

- Improve error message in `nudged.estimate` regarding nullish `params.estimator` property. (#37)
- Migrate continuous integration from Travis CI to GitHub Actions CI (#33)
- Improve test output: replace outdated tap-spec with tap-arc
- Upgrade standalone module bundler: browserify
- Upgrade code style guide: standard
- Upgrade version module generator: genversion
- Improve wording in README: Acknowledgements, Guidelines, Versioning

### Fixed

- Fix robustness issues relating to near-zero determinant in `R`, `TS`, `TR`, and `TSR` estimators (#31)
- Repair error message bug in `nudged.estimate` (#37)

### Migration Tips

The TS, TR, and TSR estimators now always fall back to translation when domain and range provide only a single point pair for estimation. Previously this was not guaranteed in rare edge cases due to floating point rounding errors. Therefore, if your application had some additional checks to choose T for single point situations over TS, TR or TSR, those additional checks can now be safely removed.


## [2.0.0] - 2021-08-06

The library switched from object-oriented to pure functional paradigm.

### Added

- Add namespaces `nudged.estimators`, `nudged.transform`, `nudged.point`, and `nudged.analysis`.
- New analysis tools to compute estimation error: `nudged.analysis.mse` for mean-squared error and `nudged.analysis.rss` for residual sum of squares.
- Generate API documentation from selected source code comments. (#23)

### Changed

- *Breaking:* whole API was rewritten to follow more functional paradigm instead of object-oriented.
- *Breaking:* arrange code and API into namespaces.
- *Breaking:* code base uses ES6 syntax instead of ES5.
- Migrate test suite from `mocha` to `tape`

### Removed

- *Breaking:* remove classes Transform and Point. Use nudged.transform and nudged.point namespaces instead.

### Migration Tips

- Ensure your environment is compatible with ECMAScript 2015 (ES6)
- Use `{ x: 1, y: 2 }` instead of `[ 1, 2 ]` to denote a point.
- Use `{ a: 1, b: 2, x: 3, y: 4 }` instead of `Transform` to denote a transformation.
- Call `nudged.estimate({ estimator, domain, range })` instead of `nudged.estimate(estimator, domain, range)`
- Call `nudged.estimators.TS` instead of `nudged.estimateTS`. The same goes for all the estimator types.
- Use pure functions like `nudged.transform.toMatrix` and `nudged.point.distance` to work with transformations and points instead of methods of `Transform` and `Point` classes.


## [1.6.0] - 2021-06-05

### Added

- Add `nudged.createFromString` to enable creating a Transform from CSS matrix string. (#21)

### Fixed

- Repair weird characters in docs.


## [1.5.0] - 2021-01-06

### Added

- New translation estimators: `nudged.estimateL`, `nudged.estimateX`, and `nudged.estimateY`
- New method: `transform.toString()` that returns a CSS transform-function string.

### Changed

- A slight efficiency improvement in `nudged.estimate` function.
- Restructure and partly rewrite the main documentation.
- Migrate continuous integration from travis-ci.org to travis-ci.com.
- Update Git workflow: drop development branch


## [1.4.0] - 2018-01-13

### Added

- Alias for `Transform#equals()`: `Transform#equal()`
- New methods for `Transform`: `almostEqual`, `add`, `subtract`, `negate`, `norm`. (#19)
- Expose `Transform.EPSILON` tolerance variable.

### Changed

- Assing methods via Transform class prototype instead of patching in constructor. (#18)


## [1.3.1] - 2018-01-11

### Fixed

- Repair near-zero floating point issues in `estimateTR` and `estimateTS` (#16)


## [1.3.0] - 2018-01-09

### Added

- New alias for `Transform` method `multiplyBy`: `multiplyRight` (#12)
- Add prebuilt transformations: `Transform.R90`, `.R180`, `R270`, and `X2`. (#13)
- Add new estimator type `I`. (#14)
- Add `.npmignore` file for more compact npm releases.

### Changed

- Improve code style: replace `jshint` with `standard`
- Use `genversion` to generate the version property.
- Improve documentation on `estimate` function and `Transform.IDENTITY` (#8)


## [1.2.0] - 2016-11-22

### Added

- Add `Transform` serialization methods: `createFromArray`, `toArray` (#11)
- Add new demo: Tokyo metro map viewer

### Changed

- Improve `Transform` property documentation. (#10)
- Upgrade dev dependencies.
- Improve tests on `nudged.create`.

### Fixed

- Use correct SPDX expression in license.


## [1.1.0] - 2016-11-22

### Added

- Add `nudged.create` to construct `Transform` objects with ease.
- Add reference to the founding M.Sc. thesis of Nudged.

### Changed

- Improve documentation on `Transform#multiplyBy`, `Transform#equals`, `Transform#get_matrix()`, and `Transform.IDENTITY`. (#7 #8 #10)


## [1.0.1] - 2015-12-05

### Added

- Reference to the math involved in the main algorithm.
- Add project badges for npm version and travis.
- Add more package keywords.
- Add new example: nudged-taataa
- Set up Travis CI integration.


## [1.0.0] - 2015-12-02

### Added

- Add estimator for translation: `nudged.estimateT`
- Add estimator for scaling: `nudged.estimateS`
- Add estimator for rotation: `nudged.estimateR` (#4)
- Add estimator for translation-scaling: `nudged.estimateTS`
- Add estimator for translation-rotation: `nudged.estimateTR`
- Add `Transform` manipulation methods: `translateBy`, `scaleBy`, `rotateBy`, `multiplyBy`. (#5)
- Add general `nudged.estimate` method.
- Add a multi-touch gesture example app with mouse support.
- Write documentation for pivoted transformation.
- Add package keywords.

### Changed

- *Breaking:* `Transform#getMatrix` now returns an object instead of an array of arrays.
- Improve documentation, illustrations, and example thumbnails.


## [0.4.0] - 2015-10-27

### Changed

- Improve pivoted estimator `estimateFixed`.
- Simplify `nudged.estimate` regarding single point pairs.
- Improve example app.
- Improve transformation documentation.


## [0.3.1] - 2015-10-26

### Changed

- Improve documentation intro and add a link to the example app.


## [0.3.0] – 2015-10-26

### Added

- Implement a fixed point estimator: `estimateFixed`
- Implement a new `Transform` method: `getInverse`
- Write an example app.
- Add package logo.

### Changed

- Refactor: divide project index to dedicated function modules.
- Improve introduction and documentation.


## [0.2.0] – 2015-10-19

### Added

- Improve the main estimator to working condition: `estimate`
- Add methods for `Transform`: `getMatrix`, `getRotation`, `getScale`, `getTranslation`.
- Write documentation for Install, Usage, and API.

### Changed

- Improve test suite.


## [0.1.0] – 2015-10-15

### Added

- Set up the package.
- Sketch `estimate` function and `Transform` class.
- Set up initial test suite.
