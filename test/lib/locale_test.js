require('../test_helper');

var locale = require('../../lib/locale');

describe('locale', function() {
  describe('factory', function() {
    context('when a non-hash is given', function() {
      it('throws an error', function() {
        expect(function() { locale('string'); }).to
          .throw('The source is not an object.');
      });
    });

    context('when a second argument is given', function() {
      it('stores it as the name', function() {
        expect((locale({}, 'English')).name).to.eq('English');
      });
    });
  });

  describe('#keys', function() {
    it('returns keys with a separator in a flat array', function() {
      hash = {
        ns: {
          person: {
            firstName: 'Teuvo',
            lastName: 'Hakkarainen'
          },
          message: 'Beware!'
        }
      };
      expect((locale(hash)).keys()).to.deep.equal([
        'ns.person.firstName',
        'ns.person.lastName',
        'ns.message'
      ]);
    });
  });
});
