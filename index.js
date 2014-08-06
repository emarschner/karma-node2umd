function createNode2UMDPreprocessor(logger) {
  var log = logger.create('preprocessor.node2umd');

  return function(content, file, done) {
    var output = new (require('stream').PassThrough)(),
        result = '';

    output.on('finish', function() {
      done(result);
    });

    output.on('data', function(chunk) {
      result += chunk.toString();
    });

    log.debug('Processing "%s".', file.originalPath);
    require('node2umd')(file.originalPath, { output: output });
  };
}

createNode2UMDPreprocessor.$inject = ['logger'];

module.exports = {
  'preprocessor:node2umd': ['factory', createNode2UMDPreprocessor]
};