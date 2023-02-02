import express, { Application } from 'express'

const app: Application = express()

const port: number = 8080

app.listen(port, () => {
    console.log(`Start of the application on port ${port}`)
  })