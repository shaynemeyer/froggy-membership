var events = require("events");
var util = require("util");
var Registration = require("./lib/registration");
var Authentication = require("./lib/authentication");
var db = require("secondthought");

var Membership = function(dbName){
  var self = this;

    events.EventEmitter.call(self);

    self.findUserByToken = function(token, next){
      db.connect({db: dbName}, function(err, db){
         assert.ok(err === null, err);
          db.users.first({authenticationToken: token}, next);
      });
    };

    self.authenticate = function (email, password, next) {
        db.connect({db: dbName}, function (err, db) {
            var auth =  new Authentication(db);

            auth.on("authenticated", function(authResult){
               self.emit("authenticated", authResult);
            });

            auth.on("non-authenticated", function(authResult){
                self.emit("non-authenticated", authResult);
            });
            auth.authenticate({email: eamil, password: password}, next);
        });
    };

    self.register = function(email, password, confirm, next){
      db.connect({db: dbName}, function(err,db){
        var reg = new Registration(db);

        reg.on("registered", function(regResult){
           self.emit("registered", regResult);
        });
          reg.on("not-registered", function(regResult){
              self.emit("not-registered", regResult);
          });
        reg.applyForMembership({email: email, password: password, confirm: confirm}, next);
      });
    };

    return self;
};

util.inherits(Membership, events.EventEmitter);
module.exports = Membership;