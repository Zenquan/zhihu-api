const KoaRouter = require('koa-router')
const router = new KoaRouter()
const {index} = require('../controller/home')

router.get('/', index)

module.exports = router