import express, { Request } from 'express'
import jwt from 'jsonwebtoken'
import { IAuthentication, IUser } from '../mongoose/model'
import { ApiRoutesNames } from '../routes/routes'
import { User as userModel } from '../mongoose/schemas/index'

const route = express.Router()

route.post(ApiRoutesNames.authentication, async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  try {
    const data: IUser = req.body

    if (!data.login || !data.password) {
      return res.status(422).send('Usuário inválido')
    }

    var user: any = await userModel.find({
      login: data.login,
      password: data.password
    }).select('-password')

    if (!user?.length)
      throw Error("Usuário e/ou senha inválidos")

    const secret = process.env.SECRET || 'root'
    const token = jwt.sign({ user }, secret, { expiresIn: "1d" })

    const result: IAuthentication = {
      user,
      token,
    }

    res.status(200).send(result)
  } catch (error: any) {
    res.status(500).send(error.message)
  }
})

export { route as authenticationsRoute }

