import nunjucks from 'nunjucks';
import yaml from 'js-yaml';

const form = document.querySelector('.form');
const result = document.querySelector('.result');

form.addEventListener('submit', generateConfig);

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

  result.innerHTML = nunjucks.renderString(templateString, params);
}
