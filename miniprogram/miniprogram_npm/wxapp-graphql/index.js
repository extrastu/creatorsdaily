module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1585796802970, function(require, module, exports) {
var responseHandler = function(resolve, reject, res, errorHandler) {
    var retData = res.data.errors ? res.data.errors[0].message : {
        code: 200
    };
    if(res.statusCode == 200 && retData.code ==200) {
        resolve(res.data.data);
    } else {
        reject(res.data);
        if (errorHandler) {
            errorHandler(res.data);
        }
    }
}

var GraphQL = function(obj, retObj) {

    if (!obj.url) {
        throw "请提供GraphQL请求URL(.url)"
    }

    retObj = retObj || false;

    let header = {};

    if (typeof obj.header === 'function') {
      header = obj.header();
    }

    if (typeof obj.header === 'object') {
      header = obj.header;
    }

    if(retObj) {
        return {
            query: function(queryObj) {
                return new Promise(function(resolve, reject) {
                    wx.request({
                        url: obj.url,
                        method: 'POST',
                        data: JSON.stringify({
                            query: queryObj.query,
                            variables: queryObj.variables
                        }),
                        header: queryObj.header || header,
                        complete: function(res) {
                            responseHandler(resolve, reject, res,obj.errorHandler);
                        }
                    });
                });
            },

            mutate: function(mutateObj) {
                return new Promise(function(resolve, reject) {
                    wx.request({
                        url: obj.url,
                        method: 'POST',
                        data: JSON.stringify({
                            query: mutateObj.mutation,
                            variables: mutateObj.variables
                        }),
                        header: mutateObj.header || header,
                        complete: function(res) {
                            responseHandler(resolve, reject, res);
                        }
                    });
                });
            }
        }
    } else {
        return function (_obj) {

            if (!_obj.body) {
                throw "请提供GraphQL请求body"
            }

            return wx.request({
                url: obj.url,
                method: 'POST',
                data: JSON.stringify(_obj.body),
                success: _obj.success,
                fail: _obj.fail,
                header: _obj.header || header,
                complete: _obj.complete
            });
        }
    }
}

module.exports = {
    GraphQL: GraphQL
}

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1585796802970);
})()
//# sourceMappingURL=index.js.map