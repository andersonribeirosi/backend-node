import express, { Request, Response } from 'express'
import { DataSource } from '../mongoose/dataSource/methods'
import { ICounter } from '../mongoose/model'
import { Counter as counterModel } from '../mongoose/schemas/index'
import { ApiRoutesNames } from '../routes/routes'
import { ApiUtils } from '../utils'

const route = express.Router()

route.post(ApiRoutesNames.counters, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    var counter: ICounter = await DataSource.create({
      data: req.body as ICounter,
      model: counterModel,
    })

    if (counter) {
      res.status(200).json(ApiUtils.apiResult({ data: counter, success: true, }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }))
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
  next()
})

route.get(`${ApiRoutesNames.counters}/:id`, async (req: Request<any, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const query = req?.params.id
    var whereObject = query != null ? JSON.parse(query) : {}
    var counters: ICounter[] = await counterModel.find({
      _id: whereObject
    })

    if (counters) {
      res.status(200).json(ApiUtils.apiResult({ data: counters, success: true, count: counters.length }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

route.get(ApiRoutesNames.counters, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const where = req?.query?.where as string
    const exclude = req?.query?.exclude as string

    var counters: ICounter[] = await DataSource.read({
      model: counterModel,
    }
    )

    if (counters) {
      res.status(200).json(ApiUtils.apiResult({ data: counters, success: true, count: counters.length }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
  next()
})

route.put(ApiRoutesNames.counters, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const data: ICounter = req.body
    const filter = { _id: data.id };

    var counter: ICounter = await DataSource.update({
      data: data,
      model: counterModel,
      options: {
        where: {
          filter: filter
        }
      }
    })

    if (counter) {
      res.status(200).json(ApiUtils.apiResult({ data: counter, success: true, }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
  next()
})

export { route as countersRoutes }

