module.exports = {
    // ... other Metro config options ...
    resolver: {
      // make sure this includes `cjs` (and other extensions you need)
      sourceExts: ['js', 'json', 'ts', 'tsx', 'cjs'],
    },
  }