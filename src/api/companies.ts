import express, { Request } from 'express'
import { CountersDataSource } from '../mongoose/dataSource/counters'
import { DataSource } from '../mongoose/dataSource/methods'
import { ICompany } from '../mongoose/model'
import { Counter } from '../mongoose/schemas'
import { Company as companyModel } from '../mongoose/schemas/index'
import { ApiRoutesNames } from '../routes/routes'
import { ApiUtils } from '../utils'

const route = express.Router()

route.post(ApiRoutesNames.companies, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const data: ICompany = req.body
    const nextCompanyId = await new CountersDataSource(Counter).seqNext('companies');

    if (!data.id)
      data.id = nextCompanyId

    var customer: ICompany = await DataSource.create({
      data: data,
      model: companyModel
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

// GET SPECIFIC COMPANY
route.get(`${ApiRoutesNames.companies}/:id`, async (req: Request<any, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const query = req?.params.id
    var whereObject = query != null ? JSON.parse(query) : {}
    var companies: ICompany[] = await companyModel.find({
      id: whereObject
    })

    if (companies) {
      res.status(200).json(ApiUtils.apiResult({ data: companies, success: true, count: companies.length }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

route.get(ApiRoutesNames.companies, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const where = req?.query?.where as string
    const exclude = req?.query?.exclude as string

    var companies: ICompany[] = await DataSource.read({
      model: companyModel,
      options: {
        exclude: exclude,
        sort: { name: 1 },
        where
      }
    })

    if (companies) {
      res.status(200).json(ApiUtils.apiResult({ data: companies, success: true, count: companies.length }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
  next()
})

route.put(ApiRoutesNames.companies, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const data: ICompany = req.body
    const where = { id: data.id };

    var company: ICompany = await DataSource.update({
      data: data,
      model: companyModel,
      options: {
        where
      }
    })

    if (company) {
      res.status(200).json(ApiUtils.apiResult({ data: company, success: true, }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
  next()
})

export { route as companiesRoutes }