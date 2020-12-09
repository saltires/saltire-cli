import { join } from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'
import { promises as fs, createWriteStream } from 'fs'
import fetch from 'node-fetch'
import config from './config'

const pipe = promisify(pipeline)

/**
 * @description 使用 node-fetch 发起一个网络请求
 * @return { Promise<fetch.Response> }
 */
export const request = async (url: fetch.RequestInfo, init?: fetch.RequestInit): Promise<fetch.Response> => {
    const response = await fetch(url, init)

    // res.status >= 200 && res.status < 300
    if (response.ok) return response
    throw Error(`Unexpected response: ${response.statusText}`)
}

/**
 * @description 下载指定互联网地址的文件，并在系统中创建临时文件存放，最后返回该临时文件的地址（以流的形式）
 * @return { string }
 */
export const downolad = async (url: string): Promise<string> => {
    const response = await request(url)

    // 创建一个临时目录
    await fs.mkdir(config.paths.temp, { recursive: true })
    const filename = join(config.paths.temp, Date.now().toString() + '.tmp')

    // 在管道中将 http 请求返回的内容写入到临时文件中
    await pipe(response.body!,createWriteStream(filename))
    return filename
}

