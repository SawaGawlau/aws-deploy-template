import express, { Application } from 'express'
import { Request, Response } from 'express'

const app: Application = express()

app.get('/', (req: Request, res: Response) => {
    res.send('checking if dist folder is deployed on ec2')
})

app.listen(3000, () => {
    console.log('Start aplikacji na porcie 3000!')
  })