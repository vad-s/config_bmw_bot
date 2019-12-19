const FileParser = require('./models/fileParser');
const LinkMaker = require('./models/linkMaker');

const http = require('http');
const fs = require('fs');

const savePath = './imported/file2.xlsx';
const getPath = 'http://f0376840.xsph.ru/4196946.xlsx';


async function parse1(pathToSave, pathToGet) {
  const file = await fs.createWriteStream(pathToSave);
  const take = http.get(pathToGet,  async (response) => {
    await response.pipe(file);
  });
}

async function parse(pathToSave, pathToGet) {


  let parsed = await new FileParser(savePath).createResultCollection();
  return await new LinkMaker(parsed).linkMaker();
}

// console.log(parse1(savePath, getPath).then(e => console.log(e)));


