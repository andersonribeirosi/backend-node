import { Request } from 'express'
import { ApiRoutesNames } from '../routes/routes'
import { User as userModel } from '../mongoose/schemas'
import { CryptUtils } from '../utils'

const CheckAuthentication = async (authToken: string | undefined) => {
  try {
    if (!authToken) throw Error('Token inválido')

    let authenticated = false
    var decToken: any = CryptUtils.parseJwt(authToken.replace('Bearer ', ''))
    const expirationDate = new Date(decToken.exp as number * 1000)
    const currentDate = new Date()

    if (decToken) {
      if (expirationDate <= currentDate) throw Error('Token expirou')

      var users: any = await userModel.find({
        _id: decToken.user[0]._id
      }).select('-password')

      authenticated = users.length > 0
    }
    return true
  } catch (error: any) {
    console.log(`authentication error: ${error.message}`)
  }
}

export const AuthenticationMiddleware = async (req: Request<{}, any, any, any, Record<string, any>>, res: any, next: any) => {
  if (req.path !== ApiRoutesNames.authentication) {
    const authToken = req.headers.authorization
    const authenticated = await CheckAuthentication(authToken)

    if (!authenticated) {
      res.status(401).send('Token inválido')
      return
    }
  }

  next()
}