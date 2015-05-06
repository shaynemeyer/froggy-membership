var Registration = require("../lib/registration");
var db = require("secondthought");

describe("Registration", function(){
    var reg = {};
    before(function(done){
       db.connect({db: "membership"}, function(err,db){
          reg = new Registration(db);
          done();
       });
    });

    // happy path
    describe("a valid application", function () {
        var regResult = {};

        before(function(done){
            reg.applyForMembership({
                email: 'big.dog@gmail.com',
                password: 'password',
                confirm: 'password'
            }, function(err, result){
                regResult = result;
                done();
            });
        });

        it("is successful", function(){
            regResult.success.should.equal(true);
        });

        it("creates a user", function(){
            regResult.user.should.be.defined;

        });
        it("creates a log entry", function(){


        });

        it("sets the user's status to approved", function(){

        });
        it("offers a welcome message", function(){

        });

    });

    describe("an empty or null email", function(){
        it("is successful", function(){

        });

        it("tells user that email is required", function(){

        });
    });

    describe("empty or null password", function(){
        it("is not successful", function(){

        });

        it("tells user that password is required", function(){

        });
    });

    describe("password and confirm mismatch", function(){
        it("is not successful", function(){

        });

        it("tells user passwords don't match", function(){

        });
    });

    describe("email already exists", function(){
        it("is not successful", function(){

        });

        it("tells user email already exists", function(){

        });
    });

});