const express = require('express')
const app = express()
const connectDB = require('./config/database')
const passport = require('passport')
const session =  require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
const methdOverride = require('method-override')
const mainRoute =  require('./routes/main')
const diaryRoute =  require('./routes/diaryRoute')
const diaryComment = require('./routes/comment')

require('dotenv').config({ path : './config/.env'})

require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended : true}))
app.use(express.json())
app.use(logger('dev'))

app.use(methdOverride('_method'))

app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : false,
    store : MongoStore.create({
        mongoUrl: process.env.DB_STRING,
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use('/', mainRoute)
app.use('/diary', diaryRoute)
app.use('/comment', diaryComment)



app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`)
})