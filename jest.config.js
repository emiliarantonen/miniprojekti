module.exports = {
    verbose: true,
    
    transform: {
      '^.+\\.jsx?$': 'babel-jest', 
    },
    
    testMatch: [
      '**/__tests__/**/*.js?(x)',
      '**/?(*.)+(spec|test).js?(x)',
    ],
    
    modulePathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'], 
    
    rootDir: '.', 
    
    moduleDirectories: ['node_modules'],
    
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
  }
  