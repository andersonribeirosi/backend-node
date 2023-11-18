import express, { Request } from 'express'
import { CountersDataSource } from '../mongoose/dataSource/counters'
import { IOrder } from '../mongoose/model'
import { Counter as counterModel, Order as orderModel } from '../mongoose/schemas/index'
import { ApiRoutesNames } from '../routes/routes'
import { ApiUtils } from '../utils'

const route = express.Router()

route.post(ApiRoutesNames.orders, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const data: IOrder = req.body

    if (!data.orderId)
      data.orderId = await new CountersDataSource(counterModel).seqNext('orders')

    if (data.createdAt)
      data.createdAt

    const newOrder: IOrder = await orderModel.create(data)

    const order: IOrder[] = await orderModel.find({ orderId: newOrder.orderId })

    if (order) {
      res.status(200).json(ApiUtils.apiResult({ data: order, success: true, }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }))
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

route.get(ApiRoutesNames.orders, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const query = req?.query?.where as string
    var where = query != null ? JSON.parse(query) : {}
    var orders: IOrder[] = await orderModel.find(where)
      .collation({ locale: "en" }) // classificação insensível a maiúsculas/minúsculas
      // .sort({ 'company.name': 1 })
      .sort({ 'createdAt': -1, 'company.name': 1 })
      .lean()
      .exec();

    if (orders) {
      res.status(200).json(ApiUtils.apiResult({ data: orders, success: true, count: orders.length }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

route.get(`${ApiRoutesNames.orders}/:id`, async (req: Request<any, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const query = req?.params.id
    var orderId = query != null ? JSON.parse(query) : {}
    var orders: IOrder[] = await orderModel.find({ orderId: orderId })

    if (orders) {
      res.status(200).json(ApiUtils.apiResult({ data: orders, success: true, count: orders.length }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

route.put(ApiRoutesNames.orders, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const data: IOrder = req.body
    // Tive que trocar para  updateMany, pois não estava atualizando determinados campos
    const updateOrder: any = await orderModel.updateMany({ orderId: data.orderId }, data)

    if (updateOrder) {
      res.status(200).json(ApiUtils.apiResult({ data: updateOrder, success: true, }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

route.delete(`${ApiRoutesNames.orders}/:id`, async (req: Request<any, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const query = req?.params.id
    var orderId = query != null ? JSON.parse(query) : {}
    var order = await orderModel.deleteOne({ orderId: orderId })

    if (order) {
      res.status(200).json(ApiUtils.apiResult({ data: order, success: true }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

export { route as ordersRoutes }

