// vue 开发环境不适用懒加载
module.exports = (file) => require('@/' + file + '.vue').default // vue-loader at least v13.0.0+
