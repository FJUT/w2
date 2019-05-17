const proxy = require('koa-whistle')

proxy.startWhistle({
  name: 'package.name', // 必填，一般为项目package.json的name字段
  port: 16001, // 必填，whistle监听的端口号，一般可以设置为服务器端口号 + 10000，后面讲如何访问该whistle操作界面，可以直接通过web服务器的端口来访问
  // baseDir: path.join(__dirname, '../project'), // 可选，一般为项目的根目录路径，主要用于内置的whistle加载项目自带的whistle插件
  username: 'a', // 可选，设置whistle操作界面的用户名
  password: 'a', // 可选，设置whistle操作界面的密码
  rules: '*.pingan.com.cn html://{vConsole.html}\n*.pingan.com.cn filter://intercept\nhttps://b.pingan.com.cn/exchange/ https://test-b-fat.pingan.com.cn/static/act/beta/exchange/\nhttps://b.pingan.com.cn/static/act/koudai/ https://test-b-fat.pingan.com.cn/static/act/beta/koudai/\n/./ whistle.proxyauth://test:123', // 可选，设置whistle的默认规则Default
  values: {
  "vConsole.html": "<script src=\"https://cdn.bootcss.com/vConsole/2.0.0/vconsole.min.js\"></script>",
  "abc": "321"
},
  sockets: 60 // 可选，设置同一个域名whistle的并发请求量，默认为60，一般无需配置
})

const Koa = require('koa')
const app = new Koa()
const serverPort = 6001

app.use(proxy.createKoaMiddleware({
  serverPort, // 必填，web服务器监听的端口
  name: 'package.name', // 可选，一般为项目package.json的name字段，默认为koa-whistle，用于设置请求头标识
  pathname: '/whistle', // 可选，默认为/whistle, 访问whistle界面的路径，默认可以通过 http://127.0.0.1:6001/whistle访问whistle的界面
  rules: [`www.test.com 127.0.0.1:6666`, `www.abc.com 127.0.0.1`], // 可选，字符串或数组，设置用户请求的whistle规则，具体参见后面API说明
  values: { a: 1, b: 2 } // 可选，设置用户请求的whistle的Values，具体参见后面API说明
}))
app.use(() => {
  this.body = 'koa'
})
app.listen(serverPort)
