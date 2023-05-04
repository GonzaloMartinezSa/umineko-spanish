/*

  This uses https://github.com/AidanWelch/google-translate-api for the translation!

*/

const translate = require('google-translate-api-x');

translate('Ik spreek Engels', {to: 'en'}).then(res => {
  console.log(res.text); //=> I speak English
  console.log(res.from.language.iso);  //=> nl
});
