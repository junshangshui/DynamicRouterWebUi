// vue 生产环境适用懒加载
module.exports = (file) => () => import('@/' + file + '.vue')
