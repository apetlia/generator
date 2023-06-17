import nunjucks from 'nunjucks';
import yaml from 'js-yaml';

const form = document.querySelector('.js-form');
const outputResult = document.querySelector('.js-output-result');
const outputParams = document.querySelector('.js-output-params');
const copyBtn = document.querySelector('.js-btn-copy');
const generateBtn = document.querySelector('.js-btn-generate');

form.addEventListener('submit', generateConfig);
copyBtn.addEventListener('click', onCopyClick);

nunjucks.configure({
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true,
  throwOnUndefined: true,
});

function generateConfig(evt) {
  evt.preventDefault();
  const templateString = evt.currentTarget.elements.template.value;
  const paramsString = evt.currentTarget.elements.params.value;

  clearOutput();
  let params;

  try {
    params = yaml.load(paramsString);
    outputParams.textContent = JSON.stringify(params, null, 4);
  } catch (err) {
    outputParams.textContent = err.message;
    notifyGenerate(err.name);
    return;
  }

  nunjucks.renderString(templateString, params, function (err, res) {
    if (err) {
      outputResult.textContent = err;
      notifyGenerate(err.name);
      return;
    } else {
      outputResult.textContent = res;
      notifyGenerate('Generated');
    }
  });
}

function onCopyClick() {
  navigator.clipboard.writeText(outputResult.textContent).then(notifyCopy);
}

function notifyCopy() {
  copyBtn.textContent = 'Copied';
  setTimeout(() => {
    copyBtn.textContent = 'Copy output';
  }, 1000);
}

function notifyGenerate(msg) {
  generateBtn.textContent = msg;
  setTimeout(() => {
    generateBtn.textContent = 'Generate';
  }, 1000);
}

function clearOutput() {
  outputParams.textContent = '';
  outputResult.textContent = '';
}
