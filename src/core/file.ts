import os from 'os'
import fs from 'fs'
import path from 'path'
// 此模块用于解压缩从 git 仓库下载的 zip 文件
import extractZip from 'extract-zip'


/**
 * @date 2020-12-02
 * @param { string } 指定的地址
 * @author saltire
 * @description 判断指定的地址的文件类型
 * @return { Boolean }
 */
export const exists = async (input: string): Promise<false | 'file' | 'dir' | 'other'> => {
    try {
        const stat = await fs.promises.stat(input)

        // 判断指定的文件地址的类型
        if (stat.isDirectory()) {
            return 'dir'
        } else if (stat.isFile()) {
            return 'file'
        } else {
            return 'other'
        }
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err
        }
        return false
    }
}

/**
 * @description 判断指定的路径地址是否是文件
 * @return { Boolean }
 */
export const isFile = async (input: string): Promise<boolean> => {
    const result = await exists(input)
    return result === 'file'
}

/**
 * @description 判断指定的路径地址是否是文件夹
 * @return { Boolean }
 */
export const isDirectory = async (input: string): Promise<boolean> => {
    const result = await exists(input)
    return result === 'dir'
}

/**
 * @description 判断指定的文件夹里面是否为空
 * @return { Boolean }
 */
export const isEmpty = async (input: string): Promise<boolean> => {
    const files = await fs.promises.readdir(input)
    return files.length === 0
}

/**
 * @description 创建文件夹，递归选项默认为 true，可选择覆盖
 * @return { Boolean }
 */
export const mkdir = async (input: string, options?: fs.MakeDirectoryOptions): Promise<void> => {
    // node >= 10.12
    await fs.promises.mkdir(input, { recursive: true, ...options })
}

/**
 * @description 删除指定的文件系统地址（如果是目录，递归删除该目录下所有内容）
 * @return { Promise<void> }
 */
export const remove = async (input: string, options?: fs.RmDirOptions): Promise<void> => {
    const result = await exists(input)

    // 当指定地址不存在时
    if (result === false) return

    // 如果是： file | other
    if (result !== 'dir') {
        return await fs.promises.unlink(input)
    }

    // 最后对目录做处理
    const entries = await fs.promises.readdir(input)

    // 递归删除目录中所有内容
    await Promise.all(entries.map(async item => {
        await remove(path.join(input, item), options)
    }))

    await fs.promises.rmdir(input, options)
}

/**
 * @description 读取一个文件，并以 buufer 的形式返回s
 * @return { Promise<Buffer> }
 */
export const read = async (input: string): Promise<Buffer> => {
    return await fs.promises.readFile(input)
}

/**
 * @description 创建一个文件，如果其目录不存在，递归创建目录，最后创建文件
 * @return { Promise<void> }
 */
export const write = async (input: string, contents: string | Uint8Array): Promise<void> => {
    await mkdir(path.dirname(input))
    return await fs.promises.writeFile(input, contents)
}

/**
 * @description 转换绝对路径为一种以~开头的相对地址（tilde path），如: /Users/sindresorhus/dev → ~/dev
 * @doc https://www.npmjs.com/package/tildify
 * @return { String }
 */
export const tildify = (input: string): string => {
    const home = os.homedir()

    // https://github.com/sindresorhus/tildify/issues/3
    input = path.normalize(input) + path.sep

    if (input.indexOf(home) === 0) {
        input = input.replace(home + path.sep, `~${path.sep}`)
    }

    return input.slice(0, -1)
}

/**
 * @description 将 tilde path 转换为绝对路径，其实就是将 ~ 替换为 os.homedir()
 * @return { String }
 */
export const untildify = (input: string): string => {
    const home = os.homedir()

    input = input.replace(/^~(?=$|\/|\\)/, home)

    return path.normalize(input)
}

/**
 * @description 解压缩 zip 
 * @return { Promise<void> }
 * @doc https://github.com/shinnn/node-strip-dirs
 */
export const extract = async (input: string, output: string, strip = 0): Promise<void> => {
    await extractZip(input, {
        dir: output,
        onEntry: entry => {
            if (strip === 0) return
            const items = entry.fileName.split(/\/|\\/)
            const start = Math.min(strip, items.length - 1)
            entry.fileName = items.slice(start).join('/')
        }
    })
}

