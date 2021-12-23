import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import routes from './routes.js'

mongoose.connect('mongodb://localhost:27017/sewa-lapang-futsal', {
    useNewUrlParser: true,
})

const connection = mongoose.connection
connection.on('error', (e) => console.log(e))
connection.once('open', () => console.log("Berhasil koneksi database"))

const app = express()

app.use(cors(), express.json())

app.use('/', routes)

app.listen('3000', () => console.log("Berhasil menjalankan server di port"))