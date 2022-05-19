## Workflow syntax for Github Actions

All workflow files must be either .yml or .yaml extension and must be stored in .github/workflows location.

 ### `name`

You can choose custom name for your workflow. It will be displayed in your repository's actions 
so it's good to keep it relative to the jobs it has defined.

### `on`

If you want to have automatically triggered jobs you need to specify git action which will start it. Most popular cases:
```
on:  push
on:  pull_request
```
You can also specify on which branch you want to plan github actions:

```
on:
  push:
    branches: [#task]
  pull_request:
    branches: [main]
```
You can also use multiple events on same branch:
```
on:
  push: [push, fork]
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
 We need at least one job defined to run github actions. If we have few - then all run in parallel by default. We can specify the order adding conditions with `jobs.<job_id>.needs` keyword. In below case `deploy` won't start before `build` job is completed:
 ```
 jobs:
  deploy:
    needs: build
 ```
    
 