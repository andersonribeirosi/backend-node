import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import { authenticationsRoute } from './src/api/authentication'
import { companiesRoutes } from './src/api/companies'
import { countersRoutes } from './src/api/counters'
import { customersRoutes } from './src/api/customers'
import { ordersRoutes } from './src/api/orders'
import { paymentsRoutes } from './src/api/payments'
import { uploadsRoutes } from './src/api/uploads'
import { usersRoutes } from './src/api/users'
import { AuthenticationMiddleware } from './src/middleware/authentications'
import { createDefaultConfig } from './src/utils'
import { shippingCompanyRoutes } from './src/api/shippingCompanies'
import { priceQuotesRoutes } from './src/api/priceQuotes'
import { chartsRoutes } from './src/api/charts'
import { serviceInvoicesRoutes } from './src/api/serviceInvoices'

const expressPort = process.env.HTTP_PORT
const mongoDbUrl = process.env.MONDB_URI || ''
const mongoDbName = process.env.MONDB_NAME || ''

const app = express()
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

app.use([
  AuthenticationMiddleware,
  countersRoutes,
  uploadsRoutes,
  authenticationsRoute,
  usersRoutes,
  customersRoutes,
  ordersRoutes,
  companiesRoutes,
  paymentsRoutes,
  shippingCompanyRoutes,
  priceQuotesRoutes,
  chartsRoutes,
  serviceInvoicesRoutes
])

app.get('/', (req, res) => { res.send('Server is running...') })

createDefaultConfig()

mongoose.connect(`${mongoDbUrl}/${mongoDbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions).then(() => {
  console.log('MongoDB connected!')
})

app.listen(expressPort, () => {
  console.log(`Servidor rodando em http://localhost:${expressPort}`)
})
