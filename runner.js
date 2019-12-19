const FileParser = require('./models/fileParser');
const LinkMaker = require('./models/linkMaker');

const http = require('http');
const fs = require('fs');

const savePath = './imported/file2.xlsx';
const getPath = 'http://f0376840.xsph.ru/4196946.xlsx';

async function saveFile(pathToSave, pathToGet) {
  const file = fs.createWriteStream(pathToSave);
  http.get(pathToGet, function(response) {
    response.pipe(file);
  })
}


// saveFile(savePath, getPath);

async function parseFile(path) {
  const parser = new FileParser(path);
  return  parser.createResultCollection();
}

let parsed = parseFile(savePath);

const linker = new LinkMaker(parsed);
const result = linker.linkMaker();

console.log(result);



