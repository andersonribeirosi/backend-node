import express, { Request } from 'express'
import { CountersDataSource } from '../mongoose/dataSource/counters'
import { DataSource } from '../mongoose/dataSource/methods'
import { IPayment } from '../mongoose/model'
import { Counter } from '../mongoose/schemas'
import { Payment as paymentModel } from '../mongoose/schemas/index'
import { ApiRoutesNames } from '../routes/routes'
import { ApiUtils } from '../utils'

const route = express.Router()

route.post(ApiRoutesNames.payments, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const data: IPayment = req.body
    const nextPaymentId = await new CountersDataSource(Counter).seqNext('payments');

    if (!data.id)
      data.id = nextPaymentId

    var payment: IPayment = await DataSource.create({
      data: data,
      model: paymentModel
    })

    if (payment) {
      res.status(200).json(ApiUtils.apiResult({ data: payment, success: true, }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }))
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
  next()
})

// GET SPECIFIC COMPANY
route.get(`${ApiRoutesNames.payments}/:id`, async (req: Request<any, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const query = req?.params.id
    var whereObject = query != null ? JSON.parse(query) : {}
    var payments: IPayment[] = await paymentModel.find({
      id: whereObject
    })

    if (payments) {
      res.status(200).json(ApiUtils.apiResult({ data: payments, success: true, count: payments.length }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

route.get(ApiRoutesNames.payments, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const where = req?.query?.where as string
    const exclude = req?.query?.exclude as string

    var payments: IPayment[] = await DataSource.read({
      model: paymentModel,
      options: {
        exclude: exclude,
        sort: { name: 1 },
        where
      }
    })

    if (payments) {
      res.status(200).json(ApiUtils.apiResult({ data: payments, success: true, count: payments.length }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
  next()
})

route.put(ApiRoutesNames.payments, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const data: IPayment = req.body
    const where = { id: data.id };

    var payment: IPayment = await DataSource.update({
      data: data,
      model: paymentModel,
      options: {
        where
      }
    })

    if (payment) {
      res.status(200).json(ApiUtils.apiResult({ data: payment, success: true, }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
  next()
})

export { route as paymentsRoutes }