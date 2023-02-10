import express, { Application, Request, Response } from 'express'

const app: Application = express()

const port: number = 3000

app.use('/', (req: Request, res: Response) => {
  res.send('Hello world')
})

app.listen(port, () => {
    console.log(`Start of the application on port ${port}`)
  })