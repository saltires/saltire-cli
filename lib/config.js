"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const env_paths_1 = __importDefault(require("env-paths"));
const package_json_1 = require("../package.json");
console.log('name', package_json_1.name);
console.log('os.homedir()', os_1.default.homedir());
console.log('envPaths', env_paths_1.default(package_json_1.name, { suffix: undefined }));
