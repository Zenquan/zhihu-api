const KoaRouter = require('koa-router')
const router = new KoaRouter({prefix: '/users'})
const {find, findById, create, update, del} = require('../controller/users')

// 获取所有用户
router.get('/', find)
// 新建用户
router.post('/', create)
// 获取特定用户
router.get('/:id', findById)
// 更新用户
router.put('/:id', update)
// 删除用户
router.delete('/:id', del)

module.exports = router