/*

  This uses https://github.com/AidanWelch/google-translate-api for the translation!

*/

const translate = require('google-translate-api-x');
const fs = require('fs');
const readline = require('readline');
const pth = require('path');

const filePathSource = pth.join(__dirname, 'files-english', 'ep1', 'en', 'umi1_op.txt');
const filePathOutput = pth.join(__dirname, 'files-spanish', 'ep1', 'es', 'umi1_op.txt');

const fileStream = fs.createReadStream(filePathSource);
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

// async function traducir(data) {
//   const res = await translate(data, {to: 'es'})
//   console.log(res.text); //=> I speak English
//   fs.appendFileSync(filePathOutput, '\n' + res.text);
// }

// let lineNumber = 0;

// rl.on('line', async (line) => {
//   try {
//     await traducir(lineNumber, line);
//     lineNumber++;
//   } catch (err) {
//     console.log(`Llegue hasta: Line ${lineNumber}: ${line}`);
//   }
// });

const translationsMap = new Map(); // Map to store translations with line numbers
lineNumber = 1;

rl.on('line', async (line) => {
  try {
    const translation = await translate(line, { to: 'es' });
    const formattedTranslation = `${lineNumber} ${translation.text}`;
    console.log(formattedTranslation);
    translationsMap.set(lineNumber, formattedTranslation);
    lineNumber++;
  } catch (err) {
    console.log(`Error translating line ${lineNumber}: ${line}`);
    const sortedTranslations = Array.from(translationsMap.values()).sort((a, b) => {
      const lineNumA = parseInt(a.split(' ')[0]);
      const lineNumB = parseInt(b.split(' ')[0]);
      return lineNumA - lineNumB;
    });
    
    const outputContent = sortedTranslations.join('\n');
    fs.appendFileSync(filePathOutput, outputContent);
    console.log('Translations completed and written to file.');
  }
});

rl.on('close', () => {
  const sortedTranslations = Array.from(translationsMap.values()).sort((a, b) => {
    const lineNumA = parseInt(a.split(' ')[0]);
    const lineNumB = parseInt(b.split(' ')[0]);
    return lineNumA - lineNumB;
  });
  
  const outputContent = sortedTranslations.join('\n');
  fs.writeFileSync(filePathOutput, outputContent);
  console.log('Translations completed and written to file.');
});
