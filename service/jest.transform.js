const EsBuild = require( 'esbuild' );

module.exports = {
  getCacheKey( sourceText, sourcePath, options ) {
    return Math.random().toString();
  },

  process( sourceText, sourcePath, options ) {
    return EsBuild.transformSync( sourceText, {
      format: 'cjs',
      loader: 'tsx',
      sourcemap: 'both',
      sourcesContent: true,
      sourcefile: sourcePath,
    } );
  },
};
