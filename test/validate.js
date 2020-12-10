const validateName =  require('validate-npm-package-name')

console.log(validateName('name'))
console.log(validateName('name-dada'))
console.log(validateName('name@#$$%%66a6a*&)'))