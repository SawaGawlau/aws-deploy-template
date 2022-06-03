> ### Conventional commits
git fetch
git fetch --tags
npm run release - standard-version package
git push --follow-tags origin release
npm publish


BREAKING CHANGE: is a total change of your code, this is also 
can be used with a previous tag like or with append !
Major Breaking Release 
(Note that the BREAKING CHANGE: token must be in the footer of the commit)
```
perf(pencil): remove graphiteWidth option

BREAKING CHANGE: The graphiteWidth option has been removed.
The default graphite width of 10mm is always used for performance reasons.

!feat: send an email to the customer when a product is shipped
chore!: drop support for Node 6

BREAK: feat: split ROLE_VIEW_ABSENCE_HISTORIES

or

!feat: split ROLE_VIEW_ABSENCE_HISTORIES

or

FEAT: split ROLE_VIEW_ABSENCE_HISTORIES

```
Triggering a release
For each new commit added to one of the release branches (for example: master, next, beta), with git push or by merging a pull request or merging from another branch, a CI build is triggered and runs the semantic-release command to make a release if there are codebase changes since the last release that affect the package functionalities.

 **Why to use conventional commits?**
    * automatically generates chengelogs
    * determine semantic version based
    * structured commit history

 **How to write conventional commits**
   ```
    <type>[optional scope]: <descrioption>
    [optional body]
    [optional footer(s)]
   ```
    
 **Types**
   ```
    fix - to use for the bug fixes
    feat - use for code features
    docs – documentation updates
    chore – changes without an impact on source code/tests(for example package update)
    refactor – changes which are not features, new functionalities nor fixes    
    tests – anything tests related
    perf – changes which improves code efficiency
    styles – code formatting, white spaces, commas, missing semicolons
    ci – changes related to CI (configs, scripts),
    build – changes that impact build process
    revert – revert latest changes
   ```

 **Scope**
    any additional information
    use nouns

 **Description**
    short message
    written in imperatives -> use add instead of ads or added

 **Body**
     free form
     explains changes you've made

  **Footer**
     follows the body with one blank line


   **Commitlint, husky**
We'll leverage husky to add a Git hook that uses commitlint to check whether our commit message meets the conventional commit format, every time we commit.

```
npm install -D @commitlint/cli @commitlint/config-conventional
npm install -D husky
npx husky install

```

https://dev.to/kouts/automated-versioning-and-package-publishing-using-github-actions-and-semantic-release-1kce

another sciprts:
        
        git remote -v
        npm run release:tag --dryRun


usun wszystkie tagi

git tag | xargs git tag -d

Adding Commitizen - genrator conventional commits
warunek
if: contains(github.event.head_commit.message, 'feat')
npx semantic release
dziala na feat minor +1

nie zmienia wersji przy commit doc

FIX: zmienia patch +1
BREAKING CHANGE
