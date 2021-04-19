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

const results = [
  {
    "name": "nm",
    "owner": "saltire-templates",
    "fullname": "saltire-templates/nm",
    "description": "A template for creating node modules.",
    "updated": "2020-12-10T08:05:35Z"
  },
  {
    "name": "ex",
    "owner": "saltire-templates",
    "fullname": "saltire-templates/ex",
    "description": "A template for creating test project",
    "updated": "2020-12-10T08:05:35Z"
  },
  {
    "name": "right-pc",
    "owner": "saltire-templates",
    "fullname": "saltire-templates/right-pc",
    "description": "A template for creating rightknights project with PC",
    "updated": "2020-12-10T08:05:35Z"
  },
  {
    "name": "ts",
    "owner": "saltire-templates",
    "fullname": "saltire-templates/ts",
    "description": "A template for creating TypeScript Project",
    "updated": "2020-12-10T08:05:35Z"
  }
]

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
