const http = require('http');
const fs = require('fs');
const FileParser = require('./models/fileParser');
const LinkMaker = require('./models/linkMaker');


const savePath = './imported/file2.xlsx';
const getPath = 'http://f0376840.xsph.ru/4196946.xlsx';

async function parse(pathToSave, pathToGet) {
  const parsed = await new FileParser(savePath).createResultCollection();
  const link = await new LinkMaker(parsed).linkMaker();
  return link;
}

async function saveAndParse(pathToSave, pathToGet) {
  const file = await fs.createWriteStream(pathToSave);
  const take = await http.get(pathToGet, async (response) => {
    await response.pipe(file);
    response.on('end', async () => {
      // console.log("File Saved");

      const resultParse = await parse(savePath, getPath);
      console.log(resultParse);
    });
  });
  // console.log(take);
  return take;
}

saveAndParse(savePath, getPath);
