/** @type {import('prettier').Config} */
module.exports = {
  singleQuote: true,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-packagejson',
  ],
  importOrder: [
    '^react$',
    '^react-dom',
    '^react-router-dom',
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
