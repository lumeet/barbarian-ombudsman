/* jshint expr: true */
require('../test_helper');

var KeyDiff  = require('../../lib/key_diff');
var Locale   = require('../../lib/locale');
var Reporter = require('../../lib/reporter');

describe('KeyDiff', function() {
  before(function() {
    this.locales = [
      new Locale({ one: 1, two: 2 }, 'en'),
      new Locale({ three: 3, two: 2 }, 'fi')
    ];
  });

  describe('new', function() {
    context('when a non-array is given for locales', function() {
      it('throws an error', function() {
        expect(function() { new KeyDiff({}); }).to
          .throw('Locales must be an array.');
      });
    });
  });

  describe('#keys', function() {
    it('returns keys with a separator in a flat array', function() {
      expect((new KeyDiff(this.locales)).keys()).to
        .deep.equal(['one', 'three', 'two']);
    });
  });

  describe('#diff', function() {
    context('when the locale is unavailable', function() {
      it('throws an error', function() {
        expect(function() {
          (new KeyDiff(this.locales)).diff(new Locale({}));
        }.bind(this)).to.throw('Locale is not available.');
      });
    });

    context('when the locale name is available', function() {
      it('returns diff between a locale and the base locale', function() {
        expect((new KeyDiff(this.locales)).diff(this.locales[0])).to
          .deep.equal(['three']);
      });
    });
  });

  describe('#isDirty', function() {
    context('when there are some differences', function() {
      it('returns true', function() {
        expect((new KeyDiff(this.locales)).isDirty()).to.be.true;
      });
    });

    context('when there are no differences', function() {
      it('returns false', function() {
        var locales = [this.locales[0], this.locales[0]];
        expect((new KeyDiff(locales)).isDirty()).to.be.false;
      });
    });
  });

  describe('#report', function() {
    it('tries to print the report', function() {
      reporter = new Reporter();
      var print = sinon.stub(reporter, 'print');

      (new KeyDiff(this.locales)).report(reporter);
      expect(print).to.have.been.called.once;
    });
  });
});
