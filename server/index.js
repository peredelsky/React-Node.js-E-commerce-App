require('dotenv').config()

const express = require('express')
const sequelize = require('./db')
const app = express()
const port = process.env.PORT || 5000
const models = require('./models/models')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// Обработка ошибок обязательно должна быть в конце
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate() // функция для подключения к БД
        await sequelize.sync() // функция сверяет состояние БД с описанной схемой БД

        app.listen(port, () => console.log(`Server started on :${port}`))
    }
    catch (e) {
        console.log(e)
    }
}

start()