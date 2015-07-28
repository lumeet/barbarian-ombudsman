/* jshint expr: true */
require('../test_helper');

var keyDiff  = require('../../lib/key_diff');
var locale   = require('../../lib/locale');
var reporter = require('../../lib/reporter');

describe('keyDiff', function() {
  before(function() {
    this.locales = [
      locale({ one: 1, two: 2 }, 'en'),
      locale({ three: 3, two: 2 }, 'fi')
    ];
  });

  describe('factory', function() {
    context('when a non-array is given for locales', function() {
      it('throws an error', function() {
        expect(function() { keyDiff({}); }).to
          .throw('Locales must be an array.');
      });
    });
  });

  describe('#keys', function() {
    it('returns keys with a separator in a flat array', function() {
      expect(keyDiff(this.locales).keys()).to
        .deep.equal(['one', 'three', 'two']);
    });
  });

  describe('#diff', function() {
    context('when the locale is unavailable', function() {
      it('throws an error', function() {
        expect(function() {
          keyDiff(this.locales).diff(locale({}));
        }.bind(this)).to.throw('Locale is not available.');
      });
    });

    context('when the locale name is available', function() {
      it('returns diff between a locale and the base locale', function() {
        expect(keyDiff(this.locales).diff(this.locales[0])).to
          .deep.equal(['three']);
      });
    });
  });

  describe('#isDirty', function() {
    context('when there are some differences', function() {
      it('returns true', function() {
        expect((keyDiff(this.locales)).isDirty()).to.be.true;
      });
    });

    context('when there are no differences', function() {
      it('returns false', function() {
        var locales = [this.locales[0], this.locales[0]];
        expect((keyDiff(locales)).isDirty()).to.be.false;
      });
    });
  });

  describe('#report', function() {
    it('tries to print the report', function() {
      reporter = reporter();
      var print = sinon.stub(reporter, 'print');

      (keyDiff(this.locales)).report(reporter);
      expect(print).to.have.been.called.once;
    });
  });
});
