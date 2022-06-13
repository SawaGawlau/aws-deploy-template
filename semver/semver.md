# Semantic Versioning = SemVer

[**semantic-versioning**](https://semver.org) is popular scheme that is used for open-source projects to communicate the changes included in a published versions. We will use that one for project releases processed with
[GitHub release](https://help.github.com/articles/about-releases).


<img src="https://www.baeldung.com/wp-content/uploads/sites/4/2021/03/Screenshot-2021-03-06-at-20.27.22-2048x715-1.png" width="450" height="150" />

## Tilde
 Tilde range specifier means that all releases from ```2.2.3``` up to, but not including ```2.3.0``` are acceptable. Even though ```2.2.3``` may be the current version, the author of a package depending on qs in this way is instructing npm that if new patch releases of ```2.2.4``` and above are available, those are acceptable. 

```bash
"dependencies": {
    "qs": "~2.2.3"
  }
```
This means that authors and the other maintainers of the package are not going to break any functionality depended on with a patch release and may in fact fix bugs for edge-cases users are currently unaware of.


## Caret

The caret range specifier is used in order to allow automatic upgrades to minor version increments of a package in order to safely inherit un-backported bug-fixes introduced in minor versions. For caret ranges, only major version must match. Any minor or patch version greater than or equal to the minimum is valid.

```bash
  "dependencies": {
    "generate-changelog": "^1.8.0",
    "release-changelog": "^0.6.1",
    "semantic-release": "^19.0.2"
  },
```


Theoretically this should be safe, but it's built on the assumption that package authors are strictly follow semver specification regarding minor versions.

## Node.js related specifications

### Caret: Major Zero
Second significant difference between tilde and caret is the way it deals with versions below ```1.0.0```.
While tilde has the same behaviour below ```1.0.0``` as it does above, caret treats a major version of 0 as a special case. A caret expands to two different ranges depending on whether you also have a minor version of 0 or not, as we'll see below:
MAJOR AND MINOR ZERO: ```^0.0.Z → 0.0.Z```
Using the caret for versions less than ```0.1.0``` offers no flexibility at all. Only the exact version specified will be valid.
For example, ```^0.0.3``` will only permit only exactly version ```0.0.3```.


<img src="http://jontejada.com/blog/assets/semver05.png" width="300" height="250" />

## Recommendation: Start At 1.0.0

The Semantic Versioning 2.0.0 standard provides the 0.y.z space to indicate that your project does not have a stable public API:
```
Major version zero (0.y.z) is for initial development. Anything MAY change at any time. The public API SHOULD NOT be considered stable.
```

It is suggested to start at 0.1.0 and bump the minor version on every breaking change to the public API. You can increment to 1.0.0 when you are in a position to appropriately control and manage these breaking changes.

Version 1.0.0 defines the public API in a way in which the version number is incremented after this release is dependent on this public API and how it changes.
The benefit of using the 0.y.z space is that you will not reach a high major version, e.g. 142.6.0, during initial development. It tends to be industry convention to avoid high major version numbers, partially for marketing reasons, but this may not be relevant to you.

Semantic Versioning applies specifically to projects with public APIs, but is often applied in other contexts with an alternative notion of "breaking change", e.g. large changes to GUI interfaces.