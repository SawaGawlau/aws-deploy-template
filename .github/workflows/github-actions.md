## Workflow syntax for Github Actions

All workflow files must be either .yml or .yaml extension and must be stored in .github/workflows location.

 ### `name`

You can choose custom name for your workflow. It will be displayed in your repository's actions 
so it's good to keep it relative to the jobs it has defined.

### `event`

Every workflow contains events which trigger jobs to be done. Here are some most popular examples:
```
on:
 push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
```

You can also specify multiple number of events being triggered on the same branch:
```
on:
  push:
    branches:    
      - 'dev'
      - 'prod'

  pull_request:
    branches:    
      - 'dev'
      - 'prod'

```
### `on.schedule`
You can use `on.schedule` to define specific time at which github actions will be run. To use specific UTC time use *POSIX cron syntax*. For intervals, minimum time is 5 minutes.
```
on:
schedule:
    # This example triggers the workflow every day at 5:30 and 17:30 UTC:
    - cron:  '30 5,17 * * *'
```
 ### `jobs`
 We need at least one job defined in a workflow to run github actions. If we have few - then all run in parallel, by default. We can specify the order adding conditions with `jobs.<job_id>.needs` keyword. In below case `deploy` won't start before `build` job is completed:
 ```
 jobs:
  deploy:
    needs: build
 ```
    
 After specifying job's name and type of runner, you need describe steps of your action. Those steps represent a sequence of tasks that will be executed as part of the job.

 ```
jobs:
    build:
        steps:
        - uses: actions/checkout@v2
        - uses: actions/setup-node@v2
            with:
            node-version: '14.x'
        - run: npm install
        - run: npm test
``` 
We can make it more understandable by adding names to the steps:
```
steps:
    - uses: actions/checkout@v2
    - name: Use Node.js
      uses: actions/setup-node@v2
      with: 
        node-version: "14.x"

    - name: Install dependencies
      run: npm install

    - name: Run test
      run: npm test
```