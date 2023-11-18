import express, { Request } from 'express'
import { CountersDataSource } from '../mongoose/dataSource/counters'
import { DataSource } from '../mongoose/dataSource/methods'
import { IShippingCompany } from '../mongoose/model'
import { Counter } from '../mongoose/schemas'
import { ShippingCompany as shippingCompanyModel } from '../mongoose/schemas/index'
import { ApiRoutesNames } from '../routes/routes'
import { ApiUtils } from '../utils'

const route = express.Router()

route.post(ApiRoutesNames.shippingCompanies, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const data: IShippingCompany = req.body
    const shippingCompanyId = await new CountersDataSource(Counter).seqNext('shipping-companies');

    if (!data.id)
      data.id = shippingCompanyId

    var shippingCompany: IShippingCompany = await DataSource.create({
      data: data,
      model: shippingCompanyModel
    })

    if (shippingCompany) {
      res.status(200).json(ApiUtils.apiResult({ data: shippingCompany, success: true, }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }))
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
  next()
})

// GET SPECIFIC SHIPPING COMPANIES
route.get(`${ApiRoutesNames.shippingCompanies}/:id`, async (req: Request<any, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const query = req?.params.id
    var whereObject = query != null ? JSON.parse(query) : {}
    var shippingCompanies: IShippingCompany[] = await shippingCompanyModel.find({
      id: whereObject
    })

    if (shippingCompanies) {
      res.status(200).json(ApiUtils.apiResult({ data: shippingCompanies, success: true, count: shippingCompanies.length }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

route.get(ApiRoutesNames.shippingCompanies, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const where = req?.query?.where as string
    const exclude = req?.query?.exclude as string

    var shippingCompanies: IShippingCompany[] = await DataSource.read({
      model: shippingCompanyModel,
      options: {
        exclude: exclude,
        sort: { name: 1 },
        where
      }
    })

    if (shippingCompanies) {
      res.status(200).json(ApiUtils.apiResult({ data: shippingCompanies, success: true, count: shippingCompanies.length }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
  next()
})

route.put(ApiRoutesNames.shippingCompanies, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const data: IShippingCompany = req.body
    const where = { id: data.id };

    var shippingCompany: IShippingCompany = await DataSource.update({
      data: data,
      model: shippingCompanyModel,
      options: {
        where
      }
    })

    if (shippingCompany) {
      res.status(200).json(ApiUtils.apiResult({ data: shippingCompany, success: true, }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
  next()
})

export { route as shippingCompanyRoutes }