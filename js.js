/*
Как запускать парсер
На выходе получаем массив кодов.
 */
const FileParser = require('./models/fileParser');

const parser = new FileParser('4196946.xlsx');
const res = parser.createResultCollection()
console.log(res);
