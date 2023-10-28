import { Request } from 'express'

export const MiddlewareExample = async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  console.log(`req.path: ${req.path}`)
  console.log(`req.method: ${req.method}`)
  console.log(`req.headers: ${JSON.stringify(req.headers)}`)
  console.log(`req.params: ${JSON.stringify(req.params)}`)
  console.log(`req.query: ${JSON.stringify(req.query)}`)

  const error = false
  if (error) {
    res.status(500).send('exit')
    return
  }

  next()
}