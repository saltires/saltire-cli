const fs = require('fs')
const path = require('path')

const write = async (input, contents) => {
    await mkdir(path.dirname(input))
    return await fs.promises.writeFile(input, contents)
}

const mkdir = async (input, options) => {
    // node >= 10.12
    await fs.promises.mkdir(input, { recursive: true, ...options })
}

write('./foo/hh/bar.txt', 'content of test')
