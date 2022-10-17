const common = [
  '--require-module ts-node/register' // Load TypeScript module
]

const app = [
  ...common,
  'tests/features/**/*.feature',
  '--require tests/features/step-definitions/*.steps.ts'
].join(' ')

module.exports = {
  app
}
