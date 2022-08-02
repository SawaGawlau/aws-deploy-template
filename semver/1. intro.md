# Semantic Versioning = SemVer
[**semantic-versioning**](https://semver.org) is popular scheme that is used for open-source projects to communicate the changes included in a published versions. 

## Why should be use semantic versioning?
### ["Dependency hell"](https://semver.org)
In the world of software, the bigger your system grows and the more packages you integrate into your software it might quickly become a nightmare. If the dependency specifications are too tight, you are in danger of version lock (the inability to upgrade a package without having to release new versions of every dependent package). Dependency hell is when version lock and/or too prevent you from easily and safely moving your project forward.

To solve that problem there was proposed set of rules and requirements. It determines how version numbers should be assigned and incremented. For this system to work, you first need to declare a public API. Once you do that, you communicate changes to it with specific increments to your version number. Consider a version format of X.Y.Z (Major.Minor.Patch). Bug fixes not affecting the API increment the patch version, backwards compatible API additions/changes increment the minor version, and backwards incompatible API changes increment the major version.

We call this system **Semantic Versioning**. Under this scheme, version numbers and the way they change convey meaning about the underlying code and what has been modified from one version to the next.


<img src="https://www.baeldung.com/wp-content/uploads/sites/4/2021/03/Screenshot-2021-03-06-at-20.27.22-2048x715-1.png" width="450" height="150" />

## Schema
Given a version number **MAJOR.MINOR.PATCH**, increment the:

* ```MAJOR``` version when you make incompatible API changes
* ```MINOR``` version when you add functionality in a backwards compatible manner
* ```PATCH``` version when you make backwards compatible bug fixes

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH 
