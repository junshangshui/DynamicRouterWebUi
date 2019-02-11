module.exports = (file) => (file === 'Main' || file === 'Login') === true ? import('@/components' + file + '.vue') : import('@/views' + file + '.vue')
