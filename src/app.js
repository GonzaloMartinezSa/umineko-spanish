/*

  This uses https://github.com/AidanWelch/google-translate-api for the translation!

*/

const translate = require('google-translate-api-x');
const fs = require('fs');
const readline = require('readline');
const pth = require('path');

const filePathSource = pth.join(__dirname, 'files-english', 'ep1', 'en', 'umi1_op.txt');
const filePathOutput = pth.join(__dirname, 'files-spanish', 'ep1', 'es', 'umi1_op.txt');

let data = '';

async function traducir(data) {
  const res = await translate(data, {to: 'es'})
  console.log(res.text); //=> I speak English
  //console.log(res.from.language.iso);  //=> nl
  fs.appendFileSync(filePathOutput, '\n' + res.text);
}

const fileStream = fs.createReadStream(filePathSource);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

let lineNumber = 0;

rl.on('line', async (line) => {
  try {
    await traducir(line);
    lineNumber++;
  } catch (err) {
    console.log(`Llegue hasta: Line ${lineNumber}: ${line}`);
  }
});

// try {
//   data = fs.readFileSync(filePathSource, 'utf8');
//   console.log(data);
// } catch (err) {
//   console.error(err);
// }

