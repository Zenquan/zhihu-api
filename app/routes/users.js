const KoaRouter = require('koa-router')
const jwt = require('koa-jwt')

const router = new KoaRouter({prefix: '/users'})
const {
  find, findById, create, update, del, login, checkOwer,
  checkUserExit, follow, unfollow, listenFollower, listenFollowing,
  currentUser
} = require('../controller/users')
const secret = require('../config').secret

const auth = jwt({secret})

// 获取所有用户
router.get('/', find)
// 新建用户
router.post('/', create)
// 获取特定用户
router.get('/:id', findById)
// 更新用户
router.patch('/:id',auth, checkOwer, update)
// 删除用户
router.delete('/:id',auth, checkOwer, del)
// 登录
router.post('/login', login)
// 关注谁
router.put('/follow/:id', auth, checkUserExit, follow)
// 取消关注谁
router.delete('/unfollow/:id', auth, checkUserExit, unfollow)
// 谁的粉丝
router.get('/:id/listenFollower', listenFollower)
// 谁关注了什么人
router.get('/:id/listenFollowing', listenFollowing)

// admin
router.get('/api/currentUser', currentUser)

module.exports = router