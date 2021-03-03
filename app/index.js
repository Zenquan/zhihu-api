const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static')
const path= require('path')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const mongoose = require('mongoose')
const cors = require('@koa/cors');

const app = new Koa()
const routing = require('./routes/index')
const {connectionStr, staticPath} = require('./config')

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
app.use(KoaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, staticPath),
    keepExtensions: true
  }
}))
app.use(KoaStatic(
  path.join(__dirname, staticPath)
))
app.use(parameter(app))
app.use(cors());
routing(app)

const port = 5000 || process.env.port
app.listen(port, () => {
  console.log(`App is listen on ${port}`)
})
