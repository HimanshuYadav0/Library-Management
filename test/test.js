var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var server = require('../src/index');
let chaiHttp = require('chai-http')
chai.use(chaiHttp);

describe('book retrun api',function(){
    it('get user',function(done){
        chai.request(server)
        .get('/getreturnbooks')
        .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjUyOTJjM2JhMjJiNzJiOTI3NmM5NmEiLCJpYXQiOjE2NDk1Nzg2OTF9.RBM7OVIfX-UwWnNSPQM5gyKwLFO87r9uzmgnT6rhd5g')
        .end((err,response)=>{
            expect(response.status).to.be.equal(200)
            done();
        })
    })
})
describe('book retrun api',function(){
    it('get user',function(done){
        chai.request(server)
        .get('/getreturnbooks')
        .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjUyOTJjM2JhMjJiNzJiOTI3NmM5NmEiLCJpYXQiOjE2NDk1Nzg2OTF9.RBM7OVIfX-UwWnNSPQM5gyKwLFO87r9uzmgnT6rhd5g')
        .end((err,response)=>{
            expect(response.status).to.be.equal(200)
            done();
        })
    })
})
describe('book issue api',function(){
    it('get issue books',function(done){
        chai.request(server)
        .get('/getissuebooks')
        .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjUyOTJjM2JhMjJiNzJiOTI3NmM5NmEiLCJpYXQiOjE2NDk1Nzg2OTF9.RBM7OVIfX-UwWnNSPQM5gyKwLFO87r9uzmgnT6rhd5g')
        .end((err,response)=>{
            expect(response.status).to.be.equal(200)
            done();
        })
    })
})
describe('search api',function(){
    it('get results',function(done){
        chai.request(server)
        .get('/searchs/hello')
        .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjUyOTJjM2JhMjJiNzJiOTI3NmM5NmEiLCJpYXQiOjE2NDk1Nzg2OTF9.RBM7OVIfX-UwWnNSPQM5gyKwLFO87r9uzmgnT6rhd5g')
        .end((err,response)=>{
            expect(response.status).to.be.equal(200)
            done();
        })
    })
})
describe('login api',function(){
    it('create user',function(done){
        chai.request(server)
        .post('/signin')
        .send({'Email':'kathpal@email.com','password':'123456'})
        .end((err,response)=>{
            expect(response.status).to.be.equal(200)
            done();
        })
    })
})