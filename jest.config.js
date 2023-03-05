module.exports = {
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/src/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/mocks/image.js',
  },
  testRegex: 'tests/.*\\.test\\.js$',
  snapshotSerializers: [],
}
