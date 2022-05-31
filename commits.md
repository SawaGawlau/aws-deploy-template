> ### Conventional commits
git fetch
git fetch --tags
npm run release
git push --follow-tags origin release
npm publish


BREAKING CHANGE: is a total change of your code, this is also 
can be used with a previous tag like or with append !
```
BREAKING CHANGE: feat: <description> 
feat!: send an email to the customer when a product is shipped
```

(this correlates with a MAJOR in SemVer es: 2.0.0 -> 3.0.0).

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


   