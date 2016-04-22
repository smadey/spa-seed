const keys = [
  'smile', 'biggrin', 'cry', 'curse', 'dizzy', 'lol', 'loveliness',
  'mad', 'sad', 'shocked', 'shutup', 'shy', 'sleepy', 'sweat',
  'titter', 'tongue', 'funk', 'huffy', 'victory', 'call', 'handshake',
  'hug', 'kiss', 'time', 'delete',
];

const expressions = {};

keys.forEach((key) => {
  expressions[key] = require(`./${key}.png`);
});

export default expressions;
