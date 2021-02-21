const proxy = [
  {
    context: '/api',
    target: 'http://localhost/ieventbook',
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = proxy;