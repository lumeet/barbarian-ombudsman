/* jshint expr: true */
require('../test_helper');

var Reporter = require('../../lib/reporter');
var colors   = require('colors');

describe('Reporter', function() {
  describe('#print', function() {
    beforeEach(function() {
      this.reporter = new Reporter();
      this.keyDiff = {
        locales: [{ name: 'en' }, { name: 'fi' }],
        keys: function() { return [1, 2]; },
        diff: function(l) {
          return ['key'] ;
        }
      };
      this.error = sinon.stub(console, 'error');
      this.log = sinon.stub(console, 'log');
    });

    afterEach(function() {
      if (console.error.restore) { console.error.restore(); }
      if (console.log.restore) { console.log.restore(); }
    });

    it('displays the summary', function() {
      this.reporter.print(this.keyDiff);
      expect(this.log).to.have.been.calledWith('Found 2 keys in total.\n');
      console.log.restore();
      console.error.restore();
    });

    it('displays the details', function() {
      this.reporter.print(this.keyDiff);
      var msg = 'The following translations seem to be missing from \''.white +
        'en'.red + '\':'.white;
      expect(this.error).to.have.been.calledWith(msg);
      msg = 'The following translations seem to be missing from \''.white +
        'fi'.red + '\':'.white;
      expect(this.error).to.have.been.calledWith(msg);
      expect(this.error).to.have.been.calledWith('  \u2717 key'.red.bold).twice;
      console.log.restore();
      console.error.restore();
    });
  });
});
