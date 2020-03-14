const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/user')
const scret = require('../config').scret

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
      name: {type: 'string', required: true},
      password: {type: 'string', required: true}
    })
    const {name} = ctx.request.body
    const repeatUser = User.findOne({name})
    if (repeatUser) { ctx.throw(409, '用户已被占用') }
    const user = await User(ctx.request.body).save()
    ctx.body = user
  }
  async update(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: false},
      password: {type: 'string', required: false}
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
  async login(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: true},
      password: {type: 'string', required: true}
    })
    const user = User.findOne(ctx.request.body)
    if(!user) {ctx.throw(401, '用户名或者密码不正确')}
    const {_id, name} = user
    const token = jsonwebtoken.sign({_id, name}, scret, {expiresIn: '1d'})
    ctx.body = token
  }
}

module.exports = new UsersCtl()