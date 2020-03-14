## zhihu-api————使用koa+mongodb构建的仿知乎接口

>之前一直使用koa和express构建过一些小的应用，但是都是没有放到线上去跑。这回，我的想法是把自己那台学生服务器拿来充分利用一下，话不多说，直接直奔主题吧。

使用的技术栈：
- nodejs
- koa2(网络编程框架)
- mongodb(非关系型数据库)
- jwt(用于鉴权)
- pm2(用于跑启动脚本)

### 何为REST？何为restful api?
表现层状态转换（英语：Representational State Transfer，缩写：REST）是Roy Thomas Fielding博士于2000年在他的博士论文中提出来的一种万维网软件架构风格

restful api:则是符合REST风格的api

### koa 洋葱模型
```js
app.use(async (ctx, next) => {
  console.log(1)
  await next()
  ctx.body = '1'
})

app.use(async (ctx, next) => {
  console.log(2)
  await next()
  console.log(3) 
})

app.use(async (ctx, next) => {
  console.log(4)
})

// 1 2 4 3 
```
### 如何在写一个koa中间件

```js
const auth = async (ctx,next) => {
  try {
    const {authorization=''} = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    console.log('token',token)
    const user = jsonwebtoken.verify(token, scret)
    ctx.state.user = user
  } catch (error) {
    ctx.throw(401, error.message)
  }
  await next()
}
```

### 开始搭建目录结构

![](https://img.lycheer.net/material/56132972/5e6cfa3a3e4dfa5c865fd014.png)

1. 起一个简单的服务
```js
const Koa = require('koa')
const app = new Koa()

const port = 3000 || process.env.port
app.listen(port, () => {
  console.log(`App is listen on ${port}`)
})
```

2. 搭建路由,编写自动读取路由中间件
```js
// routing
const fs = require('fs')

module.exports = app => {
  fs.readdirSync(__dirname).forEach(file=> {
    if (file === 'index.js') {return}
    const router = require(`./${file}`)
    app.use(router.routes()).use(router.allowedMethods())
  })
}

const routing = require('./routes/index')
routing(app)
```
3. 解决post请求ctx.request.body为undefined问题
```js
const KoaBodyPareser = require('koa-bodyparser')
app.use(KoaBodyPareser())
```

4. 连接数据库
```js
const mongoose = require('mongoose')
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
```

5. 错误处理
```js
const error = require('koa-json-error')
app.use(error({
  postFormat: ({stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
}))
```

6. 参数格式校验
```js
app.use(parameter(app))
const parameter = require('koa-parameter')
```

### 实现用户接口的增删改查
1. 定义用户的数据层model
```js
const mongoose = require('mongoose')
const {Schema, model} = mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true,
    select: false
  },
  __v: {
    type: Number,
    select: false
  }
})

module.exports = model('User', UserSchema)
```

2. 用户的路由层router
```js
const KoaRouter = require('koa-router')
const jwt = require('koa-jwt')

const router = new KoaRouter({prefix: '/users'})
const {find, findById, create, update, del, login, checkOwer} = require('../controller/users')
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

module.exports = router
```

3. 用户的控制器controller

```js
const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/users')
const secret = require('../config').secret

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
    const repeatUser = await User.findOne({name})
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
    const user = await User.findOne(ctx.request.body)
    if(!user) {ctx.throw(401, '用户名或者密码不正确')}
    const {_id, name} = user
    const token = await jsonwebtoken.sign({_id, name}, secret, {expiresIn: '1d'})
    ctx.body = {
      token
    }
  }
  async checkOwer(ctx, next) {
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, '用户没有权限')
    }
    await next()
  }
}

module.exports = new UsersCtl()
```

### postman的使用

1. 新建collection

2. 在collection中新建request

3. 在登录接口中的Test中设置token为全局变量

![](https://img.lycheer.net/material/56132972/5e6cfa3c96112e1c9ea36ecc.png)

```js
let jsonData = pm.response.json()
pm.globals.set("token", jsonData.token);
```

4. 在其他需要验证的接口中Authization使用token
![](https://img.lycheer.net/material/56132972/5e6cfa3c9742ff1c7e13a192.png)

>这就是项目大构建和用户接口的实现了，好记性不如烂笔头，特此总结， 下次将是图片上传几款的实践。
