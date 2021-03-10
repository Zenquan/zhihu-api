const
  path = require('path');

exports.resolve = function(pathname) {
  return path.join(__dirname, '..', pathname);
}

exports.resultData = (status, data, msg='服务端离家出走') => {
  return {
    ret: status,
    data,
    msg
  }
}