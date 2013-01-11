var expect = chai.expect;


describe('Broadcaster', function() {
  var broadcaster = new Broadcaster()
  
  it('should be the same instance everytime it is instantiated.', function(done) {
    expect(broadcaster).to.equal(new Broadcaster());
    done();
  });

  describe('#addListener, #on', function() {
    var listener = function() {};
    it('should return a copy of the function created.', function(done) {
      expect(broadcaster.addListener('addListener', listener)).to.equal(listener);
      done();
    });
    it('should insert the event into the `events` object.', function(done) {
      expect(broadcaster.events().indexOf('addListener')).to.equal(0);
      done();
    });
  });

  describe('#emit', function() {
    it('should execute the events listener functions.', function(done) {
      var d = 3;
      broadcaster.on('emit', function(data) {
        expect(data).to.equal(d);
        done();
      });
      broadcaster.emit('emit', d);
    });
  });

  describe('#removeListener', function() {
    it('should remove the listener from the events `listener` list.', function(done) {
      var listener = function() {};
      broadcaster.on('removeListener', listener)
      expect(broadcaster.removeListener(listener)).to.equal(true);
      expect(broadcaster.listeners('removeListener').length).to.equal(0);
      done();
    });
  });

});