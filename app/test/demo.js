const Koa = require('koa')
const KoaRouter = require('koa-router')

const app = new Koa()
const router = new KoaRouter()
const usersRouter = new KoaRouter({prefix: '/users'})
// app.use(async (ctx, next) => {
//   console.log(1)
//   await next()
//   ctx.body = '1'
// })

// app.use(async (ctx, next) => {
//   console.log(2)
//   await next()
//   console.log(3) // 1 2 4 3 
// })

// app.use(async (ctx, next) => {
//   console.log(4)
// })

// const route = async (ctx) => {
//   if(ctx.url === '/users') {
//     ctx.body = '用户列表页'
//   } else if (ctx.url === '/pr') {
//     ctx.body = 'pr页'
//   } else {
//     ctx.body = '其他'
//   }
// }

// app.use(route)


// app.use(async (ctx, next) => {
//   try {
//     await next()
//   } catch (error) {
//     ctx.status = error.status || error.statusCode || 500
//     ctx.body = {
//       message: error.message
//     }
//   }
// })

const auth = async (ctx, next) => {
  if (ctx.url !== '/users/') {
    ctx.throw(401)
  }

  await next()
}

usersRouter.get('/', auth, async(ctx) => {
  ctx.body = '用户列表页'
})

usersRouter.post('/', auth, async(ctx) => {
  ctx.body = '创建用户'
})

app.use(router.routes()).use(router.allowedMethods())
app.use(usersRouter.routes()).use(router.allowedMethods())

const port = 3000 || process.env.port
app.listen(port, () => {
  console.log(`App is listen on ${port}`)
})