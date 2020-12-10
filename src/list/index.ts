import { config } from '../core'

export interface ListOptions {
  json?: boolean
  short?: boolean
}

interface Result {
  name: string
  owner: string
  fullname: string
  description: string
  updated: string
}

const results = [{
  "name": "vue",
  "owner": "caz-templates",
  "fullname": "caz-templates/vue",
  "description": "A template for creating vue.js apps.",
  "updated": "2020-12-10T08:05:37Z"
}, {
  "name": "x-pages",
  "owner": "caz-templates",
  "fullname": "caz-templates/x-pages",
  "description": "A template for creating x-pages apps.",
  "updated": "2020-12-10T08:05:37Z"
}, {
  "name": "vite",
  "owner": "caz-templates",
  "fullname": "caz-templates/vite",
  "description": "A template for creating vite-powered apps.",
  "updated": "2020-12-10T08:05:36Z"
}, {
  "name": "nm",
  "owner": "caz-templates",
  "fullname": "caz-templates/nm",
  "description": "A template for creating node modules.",
  "updated": "2020-12-10T08:05:35Z"
}, {
  "name": "template",
  "owner": "caz-templates",
  "fullname": "caz-templates/template",
  "description": "A template for creating caz templates.",
  "updated": "2020-12-10T08:05:35Z"
}, {
  "name": "minima",
  "owner": "caz-templates",
  "fullname": "caz-templates/minima",
  "description": "A minima template sample for caz.",
  "updated": "2020-09-20T08:58:42Z"
}]

/**
 * @description 显示所有可用的模板
 * @return { NUll }
 */
export default async (owner: string = config.official, options: ListOptions = {}): Promise<void> => {
  const isOfficial = owner === config.official

  // json 格式的输出
  if (options.json ?? false) {
    return console.log(JSON.stringify(results))
  }

  // 简介型输出
  if (options.short ?? false) {
    return results.forEach(i => console.log(`→ ${isOfficial ? i.name : i.fullname}`))
  }

  // 全称型输出
  if (results.length === 0) {
    return console.log('没有可用的模板.')
  }

  console.log(`Available ${isOfficial ? 'official' : owner}'s templates:`)
  const infos = results.map(i => [isOfficial ? i.name : i.fullname, i.description])
  const width = Math.max(5, ...infos.map(i => i[0].length))
  const gap = (name: string): string => ' '.repeat(width - name.length)
  infos.forEach(([name, desc]) => console.log(`  → ${name} ${gap(name)} ${desc}`))
}
