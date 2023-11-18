import express, { Request } from 'express'
import { CountersDataSource } from '../mongoose/dataSource/counters'
import { DataSource } from '../mongoose/dataSource/methods'
import { ICustomer } from '../mongoose/model'
import { Counter } from '../mongoose/schemas'
import { Customer as customerModel } from '../mongoose/schemas/index'
import { ApiRoutesNames } from '../routes/routes'
import { ApiUtils } from '../utils'

const route = express.Router()

route.post(ApiRoutesNames.customers, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const data: ICustomer = req.body
    const nextCustomerId = await new CountersDataSource(Counter).seqNext('customers');

    if (!data.id)
      data.id = nextCustomerId

    var customer: ICustomer = await DataSource.create({
      data: data,
      model: customerModel
    })

    if (customer) {
      res.status(200).json(ApiUtils.apiResult({ data: customer, success: true, }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }))
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
  next()
})

// GET SPECIFIC CUSTOMER
route.get(`${ApiRoutesNames.customers}/:id`, async (req: Request<any, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const query = req?.params.id
    var id = query != null ? JSON.parse(query) : {}
    var customers: ICustomer[] = await customerModel.find({ id })

    if (customers) {
      res.status(200).json(ApiUtils.apiResult({ data: customers, success: true, count: customers.length }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

route.get(ApiRoutesNames.customers, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const where = req?.query?.where as string
    const exclude = req?.query?.exclude as string

    var customers: ICustomer[] = await DataSource.read({
      model: customerModel,
      options: {
        exclude: exclude,
        sort: { name: 1 },
        where
      }
    })

    if (customers) {
      res.status(200).json(ApiUtils.apiResult({ data: customers, success: true, count: customers.length }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
  next()
})

route.put(ApiRoutesNames.customers, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const data: ICustomer = req.body
    const where = { id: data.id };

    var customer: ICustomer = await DataSource.update({
      data: data,
      model: customerModel,
      options: {
        where
      }
    })

    if (customer) {
      res.status(200).json(ApiUtils.apiResult({ data: customer, success: true, }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
  next()
})

export { route as customersRoutes }

