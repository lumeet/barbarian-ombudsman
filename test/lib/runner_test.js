require('../test_helper');

var runner = require('../../lib/runner');

describe('runner', function() {
  describe('#invoke', function() {
    beforeEach(function() {
      this.runner = runner({
        respath: './test/resources/namespaced/__LOCALE__/*.json',
        locales: ['fi', 'en'],
        prefix: true
      });

      this.error = sinon.stub(console, 'error');
      this.log = sinon.stub(console, 'log');
    });

    afterEach(function() {
      console.error.restore();
      console.log.restore();
    });

    it('runs and reports', function() {
      var ret = this.runner.invoke();
      expect(this.log).to.have.been.calledWith('Found 5 keys in total.\n');
      expect(ret).to.eq(false);
    });

    context('when there are no errors', function() {
      it('returns true', function() {
        var ret = runner({
          respath: './test/resources/namespaced/__LOCALE__/*.json',
          locales: ['fi'],
          prefix: true
        }).invoke();

        expect(ret).to.eq(true);
      });
    });
  });
});

