require('./test_helper');

Resolve = require('../lib/source_resolve');

describe('SourceResolve', function() {
  describe('#locales', function() {
    context('when it looks good', function() {
      beforeEach(function() {
        this.resolve = new Resolve({
          respath: './test/resources/namespaced/__LOCALE__/*.json',
          locales: ['fi', 'en']
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
        this.resolve = new Resolve({
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
        this.resolve = new Resolve({
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
        this.resolve = new Resolve({
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
