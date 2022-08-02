## Semantic versioning specification:

1. Software using Semantic Versioning MUST declare a public API. This API could be declared in the code itself or exist strictly in documentation.

2. A normal version number MUST take the form X.Y.Z where X, Y, and Z are non-negative integers, and MUST NOT contain leading zeroes. Each element MUST increase numerically. For instance: 1.9.0 -> 1.10.0 -> 1.11.0.

3. Once a versioned package has been released, the contents of that version MUST NOT be modified. Any modifications MUST be released as a new version.

4. Major version zero (0.y.z) is for initial development. Anything MAY change at any time. The public API SHOULD NOT be considered stable.

5. Version 1.0.0 defines the public API. The way in which the version number is incremented after this release is dependent on this public API and how it changes.

6. Patch version Z (x.y.Z | x > 0) MUST be incremented if only **backwards compatible bug fixes** are introduced. A bug fix is defined as an internal change that fixes incorrect behavior.

7. Minor version Y (x.Y.z | x > 0) MUST be incremented if **new, backwards compatible functionality** is introduced to the public API. It MUST be incremented if any public API functionality is marked as deprecated. It MAY include patch level changes. Patch version MUST be reset to 0 when minor version is incremented.

8. Major version X (X.y.z | X > 0) MUST be incremented if any **backwards incompatible changes** are introduced to the public API. It MAY also include minor and patch level changes. Patch and minor versions MUST be reset to 0 when major version is incremented.

## Recommendation: Start At 1.0.0

The Semantic Versioning 2.0.0 standard provides the 0.y.z space to indicate that your project does not have a stable public API:
```
Major version zero (0.y.z) is for initial development. 
Anything MAY change at any time. 
The public API SHOULD NOT be considered stable.
```

It is suggested to start at 0.1.0 and bump the minor version on every breaking change to the public API. You can increment to 1.0.0 when you are in a position to appropriately control and manage these breaking changes.

Version 1.0.0 defines the public API in a way in which the version number is incremented after this release is dependent on this public API and how it changes.
The benefit of using the 0.y.z space is that you will not reach a high major version, e.g. 142.6.0, during initial development. It tends to be industry convention to avoid high major version numbers, partially for marketing reasons, but this may not be relevant to you.

Semantic Versioning applies specifically to projects with public APIs, but is often applied in other contexts with an alternative notion of "breaking change", e.g. large changes to GUI interfaces.

### Specification shortcut
+  No modifications once a version is released
+  Any change must be a new version
+ Version numbers can only go up
+ {Patch} → backward compatible bug fixes
+ {Minor} → new backward compatible features, deprecation of public api
+ {Major} → new backward incompatible api
+ {Major} = 0 → Initial development when anything can change
+ {Major} >= 1 → 1st public stable release
+ Pre-release version → e.g. 1.0.0-alpha, 1.0.0-beta before 1.0.0