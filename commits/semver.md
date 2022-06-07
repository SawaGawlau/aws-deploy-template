# Semantic Versioning = SemVer

[**semantic-versioning**](https://semver.org) is popular scheme that is used for open-source projects to communicate the changes included in a published versions. We will use that one for project releases processed with
[GitHub release](https://help.github.com/articles/about-releases).

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


Caret: Major Zero
Given Node.js community norms around the liberal usage of major version 0, the second significant difference between tilde and caret has been relatively controversial: the way it deals with versions below 1.0.0.
While tilde has the same behaviour below 1.0.0 as it does above, caret treats a major version of 0 as a special case. A caret expands to two different ranges depending on whether you also have a minor version of 0 or not, as we'll see below:
MAJOR AND MINOR ZERO: ^0.0.Z → 0.0.Z
Using the caret for versions less than 0.1.0 offers no flexibility at all. Only the exact version specified will be valid.
For example, ^0.0.3 will only permit only exactly version 0.0.3.
semver.toComparators('^0.0.3')
// [ [ '=0.0.3' ] ]

semver.satisfies('0.0.4', '^0.0.3')
// false
MAJOR ZERO AND MINOR >1: ^0.Y.Z → 0.Y.Z - 0.(Y+1).0
For versions greater than or equal to 0.1.0, but less than 1.0.0, the caret adopts the same behaviour as a tilde and will allow flexibility in patch versions (only).
For example, ^0.1.3 will permit all versions from 0.1.3 to the next minor, 0.2.0.
semver.toComparators('^0.1.2')
// [ [ '>=0.1.2-0', '<0.2.0-0' ] ]

// compare upper limit for ~
semver.toComparators('~0.1.2')
// [ [ '>=0.1.2-0', '<0.2.0-0' ] ]

semver.satisfies('0.1.3', '^0.1.2')
// true

semver.satisfies('0.2.0', '^0.1.3')
// false

<img src="http://jontejada.com/blog/assets/semver05.png" width="300" height="250" />

