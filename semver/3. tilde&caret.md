## Tilde
 Tilde range specifier means that all releases from ```2.2.3``` up to, but not including ```2.3.0``` are acceptable. Even though ```2.2.3``` may be the current version, the author of a package depending on qs in this way is instructing npm that if new patch releases of ```2.2.4``` and above are available, those are acceptable. 

```bash
"dependencies": {
    "qs": "~2.2.3"
  }
```
This means that authors and the other maintainers of the package are not going to break any functionality depended on with a patch release and may in fact fix bugs for edge-cases users are currently unaware of.


## Caret

The caret range specifier is used in order to allow automatic upgrades to minor version increments of a package in order to safely inherit un-backported bug-fixes introduced in minor versions. For caret ranges, only major version must match. Any minor or patch version greater than or equal to the minimum is valid. The author of a package depending on **generate-changelog** in this way is instructing npm that if new minor or patch releases these are still compatible.
Examples of compatible versions: ```1.8.1```, ```1.9.0```

```bash
  "dependencies": {
    "generate-changelog": "^1.8.0",
    "release-changelog": "^0.6.1",
    "semantic-release": "^19.0.2"
  },
```

### Caret: Major Zero
Second significant difference between tilde and caret is the way it deals with versions below ```1.0.0```.
While tilde has the same behaviour below ```1.0.0``` as it does above, caret treats a major version of 0 as a special case. A caret expands to two different ranges depending on whether you also have a minor version of 0 or not, as we'll see below:
MAJOR AND MINOR ZERO: ```^0.0.Z → 0.0.Z```
Using the caret for versions less than ```0.1.0``` offers no flexibility at all. Only the exact version specified will be valid.
For example, ```^0.0.3``` will only permit only exactly version ```0.0.3```.


<img src="http://jontejada.com/blog/assets/semver05.png" width="300" height="250" />


