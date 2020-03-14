const User = require('../models/user')

class UsersCtl {
  async find(ctx) {
    ctx.body = await User.find()
  }
  async findById(ctx) {
    const user = await User.findById(ctx.params.id)
    if (!user) {ctx.throw(404, '用户不存在')}
    ctx.body = user
  }
  async create(ctx) {
    ctx.status = 200
    ctx.verifyParams({
      name: {type: 'string', required: true}
    })
    const user = await User(ctx.request.body).save()
    ctx.body = user
  }
  async update(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: true}
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) {ctx.throw(404, '用户不存在')}
    ctx.body = user
  }
  async del(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id)
    if (!user) {ctx.throw(404, '用户不存在')}
    ctx.body = user
    ctx.status = 204
  }
}

module.exports = new UsersCtl()