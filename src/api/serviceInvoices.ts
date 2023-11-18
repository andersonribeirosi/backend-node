import express, { Request } from 'express'
import { CountersDataSource } from '../mongoose/dataSource/counters'
import { IServiceInvoice } from '../mongoose/model'
import { Counter as counterModel, ServiceInvoice as serviceInvoiceModel } from '../mongoose/schemas/index'
import { ApiRoutesNames } from '../routes/routes'
import { ApiUtils } from '../utils'
import moment from 'moment'

const route = express.Router()

route.post(ApiRoutesNames.serviceInvoices, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const data: IServiceInvoice = req.body

    if (!data.id)
      data.id = await new CountersDataSource(counterModel).seqNext('service-invoices')

    if (!data.createdAt)
      data.createdAt = new Date().toISOString()

    const newServiceInvoice: IServiceInvoice = await serviceInvoiceModel.create(data)

    const serviceInvoice: IServiceInvoice[] = await serviceInvoiceModel.find({ id: newServiceInvoice.id })

    if (serviceInvoice) {
      res.status(200).json(ApiUtils.apiResult({ data: serviceInvoice, success: true, }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }))
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

route.get(ApiRoutesNames.serviceInvoices, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const query = req?.query?.where as string
    var where = query != null ? JSON.parse(query) : {}
    var serviceInvoices: IServiceInvoice[] = await serviceInvoiceModel.find(where)
      .collation({ locale: "en" })
      .sort({ 'createdAt': -1, 'company.name': 1 })
      .lean()
      .exec();

    if (serviceInvoices) {
      res.status(200).json(ApiUtils.apiResult({ data: serviceInvoices, success: true, count: serviceInvoices.length }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

route.get(`${ApiRoutesNames.serviceInvoices}/:id`, async (req: Request<any, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const query = req?.params.id
    var serviceInvoiceId = query != null ? JSON.parse(query) : {}
    var serviceInvoices: IServiceInvoice[] = await serviceInvoiceModel.find({ id: serviceInvoiceId })

    if (serviceInvoices) {
      res.status(200).json(ApiUtils.apiResult({ data: serviceInvoices, success: true, count: serviceInvoices.length }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

route.put(ApiRoutesNames.serviceInvoices, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const data: IServiceInvoice = req.body
    // Tive que trocar para  updateMany, pois não estava atualizando determinados campos
    const updateServiceInvoice: any = await serviceInvoiceModel.updateMany({ id: data.id }, data)

    if (updateServiceInvoice) {
      res.status(200).json(ApiUtils.apiResult({ data: updateServiceInvoice, success: true, }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

route.delete(`${ApiRoutesNames.serviceInvoices}/:id`, async (req: Request<any, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const query = req?.params.id
    var serviceInvoiceId = query != null ? JSON.parse(query) : {}
    var serviceInvoice = await serviceInvoiceModel.deleteOne({ id: serviceInvoiceId })

    if (serviceInvoice) {
      res.status(200).json(ApiUtils.apiResult({ data: serviceInvoice, success: true }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

export { route as serviceInvoicesRoutes }

