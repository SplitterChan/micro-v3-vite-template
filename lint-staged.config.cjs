module.exports = {
  '**/*.(ts|vue)': filenames => [
    `eslint ${filenames.join(' ')}`,
    `prettier --check ${filenames.join(' ')}`
  ]
};
