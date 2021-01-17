const {
    promisify
} = require('util')
const figlet = promisify(require('figlet'))

const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))
const {
    clone
} = require('./download')
// const { spawn } = require('child_process')

const spawn = async (...args) => {
    const { spawn } = require('child_process')
    return new Promise(resolve => {
        const proc = spawn(...args)
        // 和主进程对接
        console.log('proc',proc)
        // proc.stdout.pipe(process.stdout)
        // proc.stderr.pipe(process.stderr)
        proc.on('close', () => {
            resolve()
        })
    })
}

module.exports = async name => {
    // 打印欢迎界面
    clear()
    const data = await figlet("Tmac Welcome")
    log(data)
    log(`创建项目： ${name}`)
    // 初始化
    await clone('github:su37josephxia/vue-template', '../'+ name)
    // await clone('github:su37josephxia/vue-template',name)
    // 安装依赖
    log('安装依赖....')
    // await spawn('cnpm',['install'],{cwd:`./${name}`})
    await spawn('cnpm install', {
        stdio: 'inherit',
        shell: true,
        cwd:`../${name}`
      })
    log('安装完成')
}