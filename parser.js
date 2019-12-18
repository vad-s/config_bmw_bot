const xlsx = require('node-xlsx').default;

// парсим Эксель и берем из него нужный массив (тот, в котором опции)
function workBookInit() {
  const workSheetsFromFile = xlsx.parse(`${__dirname}/imported/4196946.xlsx`)
  for (let item of workSheetsFromFile) {
    if (item.name === 'car') {
      return item.data;
    }
  }
}
let carDetails = workBookInit();

// преобразуем массив данных в объект с опциями, без пустых полей и строк
function filterCarDetails (data) {
  const regex = RegExp(/^\s*$/);
  let newData = data.filter((elem) => (elem.length !== 0));
  let resulted = [];

  for (let item of newData) {
    let newItem = item
      .filter((elem) => (elem.length !== 0))
      .filter((elem) => !regex.test(elem));
    if (newItem.length !== 0) {
      resulted.push(newItem);
    }
  }
  return resulted;
}
  let carDetailsFiltered = filterCarDetails(carDetails);

  function showOptionsOnly (data) {
  let optionsOnly = [];
  for (let item of resulted) {
    const regexOptions = RegExp(/^[A-Z0-9]{3,}\s\s\s[A-Za-z0-9а-яА-Я\s(),.\/-]+/);
    if(regexOptions.test(item)) {
      optionsOnly.push(item.join('').split('   '));
    }
  }
  console.log(`Количество опций: ${optionsOnly.length}`);

  let bmwOptions = {};
  optionsOnly.forEach((element)  => bmwOptions[element[0]] = element[1]);
  console.log(bmwOptions);
  return bmwOptions;
}
  showOptionsOnly(carDetailsFiltered);

