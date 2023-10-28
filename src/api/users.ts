import express, { Request } from 'express'
import { CountersDataSource } from '../mongoose/dataSource/counters'
import { DataSource } from '../mongoose/dataSource/methods'
import { IUser } from '../mongoose/model'
import { Counter } from '../mongoose/schemas'
import { User as userModel } from '../mongoose/schemas/index'
import { ApiRoutesNames } from '../routes/routes'
import { ApiUtils } from '../utils'

const route = express.Router()

route.post(ApiRoutesNames.users, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const data: IUser = req.body
    const nextOrderId = await new CountersDataSource(Counter).seqNext('users');

    if (!data.id)
      data.id = nextOrderId

    var user: IUser = await DataSource.create({
      data: data,
      model: userModel,
      options: {
        exclude: '-password'
      }
    })

    if (user) {
      res.status(200).json(ApiUtils.apiResult({ data: user, success: true, }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }))
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
  next()
})

// GET SPECIFIC USER
route.get(`${ApiRoutesNames.users}/:id`, async (req: Request<any, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const query = req?.params.id
    var whereObject = query != null ? JSON.parse(query) : {}
    var users: IUser[] = await userModel.find({
      id: whereObject
    })

    if (users) {
      res.status(200).json(ApiUtils.apiResult({ data: users, success: true, count: users.length }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
})

route.get(ApiRoutesNames.users, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const where = req?.query?.where as string
    const exclude = req?.query?.exclude as string

    var users: IUser[] = await DataSource.read({
      model: userModel,
      options: {
        exclude: exclude,
        sort: { name: 1 },
        where: {
          filter: where
        }
      }
    })

    if (users) {
      res.status(200).json(ApiUtils.apiResult({ data: users, success: true, count: users.length }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: [], success: false }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
  next()
})

route.put(ApiRoutesNames.users, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const data: IUser = req.body
    const filter = { id: data.id };

    var user: IUser = await DataSource.update({
      data: data,
      model: userModel,
      options: {
        where: {
          filter: filter
        }
      }
    })

    if (user) {
      res.status(200).json(ApiUtils.apiResult({ data: user, success: true, }))
    } else {
      res.status(404).json(ApiUtils.apiResult({ data: {}, success: false, msg: 'Erro ao cadastrar' }))
    }

  } catch (error: any) {
    res.status(500).send(error.message);
  }
  next()
})

export { route as usersRoutes }

