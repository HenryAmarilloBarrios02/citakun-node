import http from 'http'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

// IMPORTAMOS LA CONEXION A LA BD
// import './database/db.js'

import cors from 'cors'

import { config } from 'dotenv'
config()

// IMPORTAMOS LOS DATOS AUTOMATICOS

import { generateRoles, generateAreas, generateCompanies, generateCategories, generateProviders, generateAdmin, generateClients } from './libs/generateDates.js'
generateRoles()
generateAreas()
generateCompanies()
generateCategories()
generateProviders()
generateAdmin()
// generateClients()

// IMPORTAMOS LAS RUTAS
import rolRoutes from './routes/rol.routes.js'
import areaRoutes from './routes/area.routes.js'
import companyRoutes from './routes/company.routes.js'
import categoryRoutes from './routes/category.routes.js'
import providerRoutes from './routes/provider.routes.js'
import userRoutes from './routes/user.routes.js'
import clientRoutes from './routes/client.routes.js'
import productRoutes from './routes/product.routes.js'
import quotationRoutes from './routes/quotation.routes.js'

const app = express()

const corsOptions = {
    origin: '*'
}

app.use(bodyParser.json({limit: '2gb'}))
app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(express.json())

const routes = [
    rolRoutes,
    areaRoutes,
    companyRoutes,
    categoryRoutes,
    providerRoutes,
    userRoutes,
    clientRoutes,
    productRoutes,
    quotationRoutes
]

app.use(`/${process.env.API_VERSION}`, routes)

app.get('/', (req, res) => {
    res.send({message : 'Welcome to the API ERP-GUNJOP'})
})

const httpServer = http.createServer(app)

httpServer.listen(process.env.PORT, () => {
    console.log('Server up running')
})