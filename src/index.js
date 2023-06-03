import nunjucks from 'nunjucks';
import yaml from 'js-yaml';

const form = document.querySelector('.js-form');
const outputResult = document.querySelector('.js-output-result');
const outputParams = document.querySelector('.js-output-params');
const copyBtn = document.querySelector('.js-btn-copy');

form.addEventListener('submit', generateConfig);
copyBtn.addEventListener('click', copy);

nunjucks.configure({
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true,
});

function generateConfig(evt) {
  evt.preventDefault();
  const templateString = evt.currentTarget.elements.template.value;
  const paramsString = evt.currentTarget.elements.params.value;

  const params = yaml.load(paramsString);

  // outputParams.innerHTML = JSON.stringify(params, null, 4);
  // outputResult.innerHTML = nunjucks.renderString(templateString, params);

  outputParams.innerHTML = JSON.stringify(params, null, 4);

  nunjucks.renderString(templateString, params, function (err, res) {
    if (err) {
      outputResult.innerHTML = err;
    } else {
      outputResult.innerHTML = res;
    }
  });
}

function copy() {
  navigator.clipboard.writeText(outputResult.textContent).then(notifyCopy);
}

function notifyCopy() {
  copyBtn.textContent = 'Copied';
  setTimeout(() => {
    copyBtn.textContent = 'Copy output';
  }, 1000);
}
