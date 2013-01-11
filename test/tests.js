var expect = chai.expect;


describe('Link', function() {
  var link = new Link()
  
  it('should be the same instance everytime it is instantiated.', function(done) {
    expect(link).to.equal(new Link());
    done();
  });

  describe('#addListener, #on', function() {
    var listener = function() {};
    it('should return a copy of the function created.', function(done) {
      expect(link.addListener('addListener', listener)).to.equal(listener);
      done();
    });
    it('should insert the event into the `events` object.', function(done) {
      expect(link.events().indexOf('addListener')).to.equal(0);
      done();
    });
  });

  describe('#emit', function() {
    it('should execute the events listener functions.', function(done) {
      var d = 3;
      link.on('emit', function(data) {
        expect(data).to.equal(d);
        done();
      });
      link.emit('emit', d);
    });
  });

  describe('#removeListener', function() {
    it('should remove the listener from the events `listener` list.', function(done) {
      var listener = function() {};
      link.on('removeListener', listener)
      expect(link.removeListener(listener)).to.equal(true);
      expect(link.listeners('removeListener').length).to.equal(0);
      done();
    });
  });

});