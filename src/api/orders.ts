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
    const nextOrderId = await new CountersDataSource(counterModel).seqNext('orders');

    if (!data.orderId)
      data.orderId = nextOrderId

    const newOrder: IOrder = await orderModel.create(data)
    const order: IOrder[] = await orderModel.find({
      orderId: newOrder.orderId
    })
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
    var whereObject = query != null ? JSON.parse(query) : {}
    var orders: IOrder[] = await orderModel.find(whereObject)
      .collation({ locale: "en" }) // classificação insensível a maiúsculas/minúsculas
      .sort({ 'company.name': 1 })
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
    var whereObject = query != null ? JSON.parse(query) : {}
    var orders: IOrder[] = await orderModel.find({
      orderId: whereObject
    })

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
    const filter = { orderId: data.orderId };
    const newOrder: any = await orderModel.updateOne(filter, data)

    if (newOrder) {
      res.status(200).json(ApiUtils.apiResult({ data: newOrder, success: true, }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

export { route as ordersRoutes }

