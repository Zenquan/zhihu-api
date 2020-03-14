const Koa = require('koa')
const KoaBodyPareser = require('koa-bodyparser')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const mongoose = require('mongoose')

const app = new Koa()
const routing = require('./routes/index')
const connectionStr = require('./config').connectionStr

// 连接数据库
mongoose.connect(connectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('数据库连接成功')
})
.catch(err => {
  console.log(err)
})

mongoose.connection.on(error, console.error)

app.use(error({
  postFormat: ({stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
}))
app.use(KoaBodyPareser())
app.use(parameter(app))
routing(app)

const port = 3000 || process.env.port
app.listen(port, () => {
  console.log(`App is listen on ${port}`)
})