const KoaRouter = require('koa-router')
const router = new KoaRouter()
const {index, upload} = require('../controller/home')

router.get('/', index)
router.post('/upload', upload)

module.exports = router