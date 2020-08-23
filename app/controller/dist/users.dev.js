"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var jsonwebtoken = require('jsonwebtoken');

var User = require('../models/users');

var secret = require('../config').secret;

var _currentUser = require('../models/mock/user');

var UsersCtl =
/*#__PURE__*/
function () {
  function UsersCtl() {
    _classCallCheck(this, UsersCtl);
  }

  _createClass(UsersCtl, [{
    key: "find",
    value: function find(ctx) {
      return regeneratorRuntime.async(function find$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(User.find());

            case 2:
              ctx.body = _context.sent;

            case 3:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "findById",
    value: function findById(ctx) {
      var _ctx$query$fields, fields, selectFields, user;

      return regeneratorRuntime.async(function findById$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _ctx$query$fields = ctx.query.fields, fields = _ctx$query$fields === void 0 ? '' : _ctx$query$fields;
              selectFields = fields.split(';').filter(function (f) {
                return f;
              }).map(function (f) {
                return ' +' + f;
              }).join('');
              _context2.next = 4;
              return regeneratorRuntime.awrap(User.findById(ctx.params.id).select(selectFields));

            case 4:
              user = _context2.sent;

              if (!user) {
                ctx["throw"](404, '用户不存在');
              }

              ctx.body = user;

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "create",
    value: function create(ctx) {
      var name, repeatUser, user;
      return regeneratorRuntime.async(function create$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              ctx.status = 200;
              ctx.verifyParams({
                name: {
                  type: 'string',
                  required: true
                },
                password: {
                  type: 'string',
                  required: true
                }
              });
              name = ctx.request.body.name;
              _context3.next = 5;
              return regeneratorRuntime.awrap(User.findOne({
                name: name
              }));

            case 5:
              repeatUser = _context3.sent;

              if (repeatUser) {
                ctx["throw"](409, '用户已被占用');
              }

              _context3.next = 9;
              return regeneratorRuntime.awrap(User(ctx.request.body).save());

            case 9:
              user = _context3.sent;
              ctx.body = user;

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "update",
    value: function update(ctx) {
      var user;
      return regeneratorRuntime.async(function update$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              ctx.verifyParams({
                name: {
                  type: 'string',
                  required: false
                },
                password: {
                  type: 'string',
                  required: false
                },
                avatar_url: {
                  type: 'string',
                  required: false
                },
                gender: {
                  type: 'string',
                  required: false
                },
                headline: {
                  type: 'string',
                  required: false
                },
                locations: {
                  type: 'array',
                  itemType: 'string',
                  required: false
                },
                business: {
                  type: 'string',
                  required: false
                },
                employments: {
                  type: 'array',
                  itemType: 'object',
                  required: false
                },
                educations: {
                  type: 'array',
                  itemType: 'object',
                  required: false
                }
              });
              _context4.next = 3;
              return regeneratorRuntime.awrap(User.findByIdAndUpdate(ctx.params.id, ctx.request.body));

            case 3:
              user = _context4.sent;

              if (!user) {
                ctx["throw"](404, '用户不存在');
              }

              ctx.body = user;

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "del",
    value: function del(ctx) {
      var user;
      return regeneratorRuntime.async(function del$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(User.findByIdAndRemove(ctx.params.id));

            case 2:
              user = _context5.sent;

              if (!user) {
                ctx["throw"](404, '用户不存在');
              }

              ctx.body = user;
              ctx.status = 204;

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }, {
    key: "login",
    value: function login(ctx) {
      var user, _id, name, token;

      return regeneratorRuntime.async(function login$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              ctx.verifyParams({
                name: {
                  type: 'string',
                  required: true
                },
                password: {
                  type: 'string',
                  required: true
                }
              });
              _context6.next = 3;
              return regeneratorRuntime.awrap(User.findOne(ctx.request.body));

            case 3:
              user = _context6.sent;

              if (!user) {
                ctx["throw"](401, '用户名或者密码不正确');
              }

              _id = user._id, name = user.name;
              _context6.next = 8;
              return regeneratorRuntime.awrap(jsonwebtoken.sign({
                _id: _id,
                name: name
              }, secret, {
                expiresIn: '1d'
              }));

            case 8:
              token = _context6.sent;
              ctx.body = {
                token: token
              };

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }, {
    key: "checkOwer",
    value: function checkOwer(ctx, next) {
      return regeneratorRuntime.async(function checkOwer$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (ctx.params.id !== ctx.state.user._id) {
                ctx["throw"](403, '用户没有权限');
              }

              _context7.next = 3;
              return regeneratorRuntime.awrap(next());

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      });
    }
  }, {
    key: "checkUserExit",
    value: function checkUserExit(ctx, next) {
      var user;
      return regeneratorRuntime.async(function checkUserExit$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(User.findById(ctx.params.id));

            case 2:
              user = _context8.sent;

              if (!user) {
                ctx["throw"](404, '用户不存在');
              }

              _context8.next = 6;
              return regeneratorRuntime.awrap(next());

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      });
    }
  }, {
    key: "follow",
    value: function follow(ctx) {
      var me;
      return regeneratorRuntime.async(function follow$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(User.findById(ctx.state.user._id).select('+following'));

            case 2:
              me = _context9.sent;

              if (!me.following.map(function (id) {
                return id.toString();
              }).includes(ctx.params.id)) {
                me.following.push(ctx.params.id);
                me.save();
              }

              ctx.status = 204;

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      });
    }
  }, {
    key: "unfollow",
    value: function unfollow(ctx) {
      var user, index;
      return regeneratorRuntime.async(function unfollow$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return regeneratorRuntime.awrap(User.findById(ctx.state.user._id).select('+following'));

            case 2:
              user = _context10.sent;
              index = user.following.map(function (id) {
                return id.toString();
              }).indexOf(ctx.params.id);

              if (index > -1) {
                user.following.splice(index);
                user.save();
              }

              ctx.status = 204;

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      });
    }
  }, {
    key: "listenFollowing",
    value: function listenFollowing(ctx) {
      var user;
      return regeneratorRuntime.async(function listenFollowing$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(User.findById(ctx.params.id).select('+following').populate('following'));

            case 2:
              user = _context11.sent;

              if (!user) {
                ctx["throw"](404);
              }

              ctx.body = user.following;

            case 5:
            case "end":
              return _context11.stop();
          }
        }
      });
    }
  }, {
    key: "listenFollower",
    value: function listenFollower(ctx) {
      var users;
      return regeneratorRuntime.async(function listenFollower$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(User.find({
                following: ctx.params.id
              }));

            case 2:
              users = _context12.sent;
              ctx.body = users;

            case 4:
            case "end":
              return _context12.stop();
          }
        }
      });
    }
  }, {
    key: "currentUser",
    value: function currentUser(ctx) {
      return regeneratorRuntime.async(function currentUser$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              ctx.body = _currentUser;

            case 1:
            case "end":
              return _context13.stop();
          }
        }
      });
    }
  }]);

  return UsersCtl;
}();

module.exports = new UsersCtl();