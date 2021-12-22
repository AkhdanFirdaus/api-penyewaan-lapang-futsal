import mongoose from 'mongoose'

const Customer = mongoose.model(
    'Customer',
    mongoose.Schema({
        name: String,
        phone_number: String,
        address: String,
        created_at: Date,
    })
)

const Location = mongoose.model(
    "location",
    mongoose.Schema({
        name: String,
        price: Number,
        capacity: Number,
        size: String,
        address: String,
        created_at: Date,
    }),
)

const Transaction = mongoose.model(
    "Transaction",
    mongoose.Schema({
        transaction_date: Date,
        total: Number,
        payment_price: Number,
        change: Number,
        customer_id: Number,
        created_at: Date,
    })
)

const TransactionDetail = mongoose.model(
    "TransactionDetail",
    mongoose.Schema({
        transaction_id: Number,
        location_id: Number,
        start: Date,
        end: Date,
        subtotal: Number,
        created_at: Date,
    })
)

export { Customer, Location, Transaction, TransactionDetail }