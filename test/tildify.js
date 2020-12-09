const os = require('os')
const path = require('path')

const tildify = (input) => {
    const home = os.homedir()

    // https://github.com/sindresorhus/tildify/issues/3
    input = path.normalize(input) + path.sep

    if (input.indexOf(home) === 0) {
        input = input.replace(home + path.sep, `~${path.sep}`)
    }

    return input.slice(0, -1)
}

console.log(tildify('/Users/edz/projectNew/ownTest/world/one/saltire-cli/test/foo/bar.txt'))