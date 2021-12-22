import { Customer } from "./models.js"

export const CustomerController = {
       readAll: async (req, res) => {
            try {
                const customers = await Customer.find()
                res.status(200).json(customers)
            } catch (error) {
                res.status(500).json({message: error})
            }
       },
       readById: async (req, res) => {
            try {
                const id = req.params.id
                const customer = await Customer.findById(id)
                res.status(200).json(customer)
            } catch (error) {
                res.status(500).json({message: error})
            }
       },
       save: async (req, res) => {
            try {
                const customer = new Customer(req.body)
                await customer.save()
                res.status(201).json({message: "Berhasil menyimpan kustomer"})
            } catch (error) {
                res.status(500).json({message: error})
            }
       },
       update: async (req, res) => {
            try {
                    
            } catch (error) {
                res.status(500).json({message: error})
            }
       },
       delete: async (req, res) => {
            try {
                const id = req.params.id
                const check = await Customer.findById(id)
                if (!check) return res.status(401).json({message: "Customer not available"})
                await Customer.deleteOne({_id: id})
                res.status(200).json({message: "Success delete customer"})
            } catch (error) {
                res.status(500).json({message: error})
            }
       },
}