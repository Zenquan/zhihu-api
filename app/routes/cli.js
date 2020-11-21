const KoaRouter = require('koa-router')
const router = new KoaRouter()
const {index, upload} = require('../controller/cli')

router.get('/cli', index)

module.exports = router