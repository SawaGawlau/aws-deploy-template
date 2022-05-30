import express, { Application } from 'express'
import { Request, Response } from 'express'

const app: Application = express()

app.get('/', (req: Request, res: Response) => {
    res.send('hello world')
})

app.listen(3000, () => {
    console.log('Start aplikacji na porcie 3000!')
  })