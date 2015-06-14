require('./test_helper');

var exec = require('child_process').exec;

describe('CLI', function() {
  describe('--version', function() {
    it('returns the current version', function(done) {
      cmd = './bin/barbarian-ombudsman --version';
      exec(cmd, function(_error, stdout, _stderr) {
        expect(stdout).to.eq(require('../package.json').version + '\n');
        done();
      });
    });
  });

  describe('regular command', function() {
    it('returns the error report', function(done) {
      var cmd = [
        './bin/barbarian-ombudsman',
        '--locales en,fi',
        '--respath ./test/resources/namespaced/__LOCALE__/*.json'
      ];
      exec(cmd.join(' '), function(_error, stdout, stderr) {
        expect(stdout).to.eq('Found 5 keys in total.\n\n\n');
        expect(stderr).to.eq([
          'The following translations seem to be missing from \'en\':',
          '  \u2717 test.ns.avain',
          '  \u2717 test.ns.something.even',
          '  \u2717 test.ns.something.more',
          'The following translations seem to be missing from \'fi\':',
          '  \u2717 test.ns.key2\n'
        ].join('\n'));
        done();
      });
    });
  });
});
