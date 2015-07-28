require('../test_helper');

resolve = require('../../lib/source_resolve');

describe('sourceResolve', function() {
  describe('factory', function() {
    beforeEach(function() {
      this.resolve = resolve({});
    });

    it('sets a default value for the `prefix` option', function() {
      expect(this.resolve.options.prefix).to.eq(false);
    });

    it('sets a default value for the `locales` option', function() {
      expect(this.resolve.options.locales).to.deep.equal([]);
    });

    it('sets a default value for the `respath` option', function() {
      expect(this.resolve.options.respath)
        .to.eq('./locales/__LOCALE__/**/*.json');
    });
  });

  describe('#locales', function() {
    context('when it looks good', function() {
      beforeEach(function() {
        this.resolve = resolve({
          respath: './test/resources/namespaced/__LOCALE__/*.json',
          locales: ['fi', 'en'],
          prefix: true
        });
      });

      it('registers each locale', function() {
        expect(this.resolve.locales().length).to.eq(2);
      });

      it('has the locales right', function() {
        expect(this.resolve.locales()[0].keys()).to.deep.equal([
          'test.ns.avain',
          'test.ns.key',
          'test.ns.something.more',
          'test.ns.something.even'
        ]);
        expect(this.resolve.locales()[1].keys()).to.deep.equal([
          'test.ns.key',
          'test.ns.key2'
        ]);
      });
    });

    context('when a prefix is set as false', function() {
      beforeEach(function() {
        this.resolve = resolve({
          respath: './test/resources/namespaced/__LOCALE__/*.json',
          prefix: false,
          locales: ['en']
        });
      });

      it('returns the keys without the file basename', function() {
        expect(this.resolve.locales()[0].keys()).to.deep.equal([
          'ns.key',
          'ns.key2'
        ]);
      });
    });

    context('when a locale is not found', function() {
      beforeEach(function() {
        this.resolve = resolve({
          respath: './test/resources/namespaced/__LOCALE__/*.json',
          locales: ['de']
        });
      });

      it('registers the locale', function() {
        expect(this.resolve.locales().length).to.eq(1);
      });

      it('returns zero keys for the missing locale', function() {
        expect(this.resolve.locales()[0].keys().length).eq(0);
      });
    });

    context('when respath is not given', function() {
      beforeEach(function() {
        this.resolve = resolve({
          locales: ['fi']
        });
      });

      it('registers the locales', function() {
        expect(this.resolve.locales().length).to.eq(1);
      });

      it('returns zero keys for the locales', function() {
        expect(this.resolve.locales()[0].keys().length).eq(0);
      });
    });
  });
});
