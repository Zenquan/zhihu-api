const utils = require('../utils')

/**
 * 返回脚手架@zen/cli的templates.json
 */
class CliCtl {
  index (ctx){
    const templates = require(utils.resolve('models/cli/templates.json'))
    ctx.body = templates
  }
}

module.exports = new CliCtl()