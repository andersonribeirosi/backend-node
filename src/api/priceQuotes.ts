import express, { Request } from 'express'
import { CountersDataSource } from '../mongoose/dataSource/counters'
import { IPriceQuote } from '../mongoose/model'
import { Counter as counterModel, PriceQuote as priceQuoteModel } from '../mongoose/schemas/index'
import { ApiRoutesNames } from '../routes/routes'
import { ApiUtils } from '../utils'

const route = express.Router()

route.post(ApiRoutesNames.priceQuotes, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const data: IPriceQuote = req.body

    if (!data.orderId)
      data.orderId = await new CountersDataSource(counterModel).seqNext('orders')

    if (data.createdAt)
      data.createdAt

    const newPriceQuote: IPriceQuote = await priceQuoteModel.create(data)

    const priceQuote: IPriceQuote[] = await priceQuoteModel.find({ orderId: newPriceQuote.orderId })

    if (priceQuote) {
      res.status(200).json(ApiUtils.apiResult({ data: priceQuote, success: true, }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }))
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

route.get(ApiRoutesNames.priceQuotes, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const query = req?.query?.where as string
    var where = query != null ? JSON.parse(query) : {}
    var priceQuotes: IPriceQuote[] = await priceQuoteModel.find(where)
      .collation({ locale: "en" })
      .sort({ 'createdAt': -1, 'company.name': 1 })
      .lean()
      .exec();

    if (priceQuotes) {
      res.status(200).json(ApiUtils.apiResult({ data: priceQuotes, success: true, count: priceQuotes.length }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

route.get(`${ApiRoutesNames.priceQuotes}/:id`, async (req: Request<any, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const query = req?.params.id
    var priceQuoteId = query != null ? JSON.parse(query) : {}
    var priceQuotes: IPriceQuote[] = await priceQuoteModel.find({ orderId: priceQuoteId })

    if (priceQuotes) {
      res.status(200).json(ApiUtils.apiResult({ data: priceQuotes, success: true, count: priceQuotes.length }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

route.put(ApiRoutesNames.priceQuotes, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const data: IPriceQuote = req.body
    // Tive que trocar para  updateMany, pois não estava atualizando determinados campos
    const updatePriceQuote: any = await priceQuoteModel.updateMany({ orderId: data.orderId }, data)

    if (updatePriceQuote) {
      res.status(200).json(ApiUtils.apiResult({ data: updatePriceQuote, success: true, }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

route.delete(`${ApiRoutesNames.priceQuotes}/:id`, async (req: Request<any, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const query = req?.params.id
    var priceQuoteId = query != null ? JSON.parse(query) : {}
    var priceQuote = await priceQuoteModel.deleteOne({ orderId: priceQuoteId })

    if (priceQuote) {
      res.status(200).json(ApiUtils.apiResult({ data: priceQuote, success: true }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

export { route as priceQuotesRoutes }

