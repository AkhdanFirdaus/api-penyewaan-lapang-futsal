import express from "express"
import { CustomerController } from "./controllers.js"

const routes = express.Router()

routes.get('/customers/', CustomerController.readAll)
routes.post('/customers/', CustomerController.save)
routes.delete('/customers/:id', CustomerController.delete)
routes.get('/customers/:id', CustomerController.readById)

export default routes