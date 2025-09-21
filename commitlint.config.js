export default {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    'type-enum': [
      2,
      'always',
      ['✨ feat', '🐛 fix', '📝 docs', '💄 style', '♻️ refactor', '✅ test', '🔧 chore'],
    ],
  },
  ignores: [(commit) => commit === ''],
  defaultIgnores: true,
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
}
