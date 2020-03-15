const path = require('path')

class HomeCtl {
  index (ctx){
    ctx.body = '这是主页'
  }
  upload (ctx) {
    const file = ctx.request.files.file
    const basename = path.basename(file.path)
    ctx.body = {
      url: `${ctx.origin}/uploads/${basename}`
    }
  }
}

module.exports = new HomeCtl()