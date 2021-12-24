import { Customer, Location, Transaction, TransactionDetail } from "./models.js"

export const CustomerController = {
    readAll: async (req, res) => {
        try {
            const customers = await Customer.find()
            res.status(200).json({
                message: "Success get customers",
                data: customers,
            })
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    readById: async (req, res) => {
        try {
            const id = req.params.id
            const customer = await Customer.findById(id)
            res.status(200).json({
                message: "Success get customer",
                data: customer
            })
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    save: async (req, res) => {
        try {
            const customer = new Customer(req.body)
            await customer.save()
            res.status(201).json({message: "Success save customer"})
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id
            await Customer.updateOne({_id: id}, {$set: req.body})
            res.status(200).json({message: "Success Update Customer"})
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

export const LocationController = {
    readAll: async (req, res) => {
        try {
            const locations = await Location.find()
            res.status(200).json({
                message: "Success get locations",
                data: locations,
            })
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    readById: async (req, res) => {
        try {
            const id = req.params.id
            const location = await Location.findById(id)
            res.status(200).json({
                message: "Success get location",
                data: location,
            })
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    save: async (req, res) => {
        try {
            const location = new Location(req.body)
            await location.save()
            res.status(201).json({message: "Success save location"})
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id
            await Location.updateOne({_id: id}, {$set: req.body})
            res.status(200).json({message: "Success Update Location"})
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id
            const check = await Location.findById(id)
            if (!check) return res.status(401).json({message: "Location not available"})
            await Location.deleteOne({_id: id})
            res.status(200).json({message: "Success delete location"})
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
}

export const TransactionController = {
    readAll: async (req, res) => {
            try {
                const transactions = await Transaction.find().populate('customer').populate('transaction_details')
                res.status(200).json({
                    message: "Success get transactions",
                    data: transactions,
                })
            } catch (error) {
                res.status(500).json({message: error})
            }
    },
    readById: async (req, res) => {
        try {
            const id = req.params.id
            const transaction = await Transaction.findById(id).populate('customer').populate('transaction_details')
            res.status(200).json({
                message: "Success get transaction",
                data: transaction,
            })
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    save: async (req, res) => {
        try {
            await TransactionDetail.insertMany(req.body.transaction_details).then(async (items) => {
                const transactionId = []

                items.map((item) => {
                    transactionId.push(item.id)
                })

                const transaction = new Transaction({
                    transaction_date: req.body.transaction_date,
                    total: req.body.total,
                    payment_price: req.body.payment_price,
                    change: req.body.change,
                    customer: req.body.customer,
                    transaction_details: transactionId,
                    created_at: req.body.created_at,
                })

                await transaction.save()

                res.status(201).json({message: "Success save transaction", data: transaction})
            })
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id
            await Transaction.updateOne({_id: id}, {$set: req.body})
            res.status(200).json({message: "Success Update Transaction"})
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id
            const check = await Transaction.findById(id)
            if (!check) return res.status(401).json({message: "Transaction not available"})
            await Transaction.deleteOne({_id: id})
            res.status(200).json({message: "Success delete Transaction"})
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
}

export const TransactionDetailController = {
    readAll: async (req, res) => {
        try {
            const transactionDetails = await TransactionDetail.find().populate('location')
            res.status(200).json({
                message: "Success get transaction details",
                data: transactionDetails,
            })
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    readById: async (req, res) => {
        try {
            const id = req.params.id
            const transactionDetail = await Location.findById(id).populate('location')
            res.status(200).json({
                message: "Success get transaction detail",
                data: transactionDetail,
            })
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    save: async (req, res) => {
        try {
            const transactionDetail = new TransactionDetail(req.body)
        //  const transactionDetails = await TransactionDetail.insertMany(req.body)
            await transactionDetail.save()
            res.status(201).json({message: "Success save transaction detail"})
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id
            await TransactionDetail.updateOne({_id: id}, {$set: req.body})
            res.status(200).json({message: "Success Update Transaction Detail"})
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id
            const check = await TransactionDetail.findById(id)
            if (!check) return res.status(401).json({message: "Transaction Detail not available"})
            await TransactionDetail.deleteOne({_id: id})
            res.status(200).json({message: "Success delete Transaction Detail"})
        } catch (error) {
            res.status(500).json({message: error})
        }
    },
}

export const ReportController = {
    daily: async (req, res) => {
        const result = await Transaction.aggregate([
            {
                $group: {
                    _id: {
                        year: {$year: "$transaction_date"},
                        month: {$month: "$transaction_date"},
                        dayOfMonth: {$dayOfMonth: "$transaction_date"},
                    },
                    value: {$sum: "$total"},
                    count: {$sum: 1},
                },
            },
        ])

        res.status(200).json(result)
    },
    weekly: async (req, res) => {
        const result = await Transaction.aggregate([
            {
                $group: {
                    _id: {
                        week: {$week: "$transaction_date"}
                    },
                    value: {$sum: "$total"},
                    count: {$sum: 1},
                },
            },
        ])

        res.status(200).json(result)
    },
    monthly: async (req, res) => {
        const result = await Transaction.aggregate([
            {
                $group: {
                    _id: {
                        month: {$month: "$transaction_date"}
                    },
                    value: {$sum: "$total"},
                    count: {$sum: 1},
                },
            },
        ])

        res.status(200).json(result)
    },
    yearly: async (req, res) => {
        const result = await Transaction.aggregate([
            {
                $group: {
                    _id: {
                        year: {$year: "$transaction_date"}
                    },
                    value: {$sum: "$total"},
                    count: {$sum: 1},
                },
            },
        ])

        res.status(200).json(result)
    },
}