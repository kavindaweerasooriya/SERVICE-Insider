const assert = require('chai').assert;
const controller = require('./controller/main.controller');
const sinon = require('sinon');
const Mocha = require('mocha');

describe('readAll', function () {
    it('should return the list of providers', function () {
        const req = {};
        const res = {
            status: sinon.spy(),
            send: sinon.spy()
        };
        const fakeData = [{ _id: ObjectId("5f5a5f5b5c5d5e5f5e5f5f5a5a5a5"), name: "Provider 1", location: "Location 1" }, { _id: ObjectId("6f6a6f6b6c6d6e6f6e6f6f6a6a6a6"), name: "Provider 2", location: "Location 2" },];
        const Provider = {
            find: sinon.stub().returns(Promise.resolve(fakeData))
        };
        const handleError = sinon.spy();
        const isEmptylist = sinon.stub().returns(false);

        controller.readAll(req, res, Provider, ObjectId, handleError, isEmptylist);

        assert.equal(res.status.firstCall.args[0], 200);
        assert.equal(res.send.firstCall.args[0], fakeData);
        assert.isFalse(handleError.called);
    });

    it('should return an empty list error', function () {
        const req = {};
        const res = {
            status: sinon.spy(),
            send: sinon.spy()
        };
        const fakeData = [];
        const Provider = {
            find: sinon.stub().returns(Promise.resolve(fakeData))
        };
        const handleError = sinon.spy();
        const isEmptylist = sinon.stub().returns(true);

        controller.readAll(req, res, Provider, ObjectId, handleError, isEmptylist);

        assert.equal(res.status.firstCall.args[0], 404);
        assert.equal(res.send.firstCall.args[0], 'List is empty');
        assert.isFalse(handleError.called);
    });

    describe('create', function () {
        it('should create a new provider', function () {
            const req = {
                body: {
                    name: 'John Doe',
                    address: '123 Main St.',
                    phone: '555-555-5555'
                }
            };
            const res = {
                status: function (status) {
                    this.status = status;
                    return this;
                },
                send: function (result) {
                    this.result = result;
                    return this;
                }
            };
            controller.create(req, res);
    
            assert.equal(res.status, 201);
            assert.isObject(res.result);
            assert.equal(res.result.name, 'John Doe');
            assert.equal(res.result.address, '123 Main St.');
            assert.equal(res.result.phone, '555-555-5555');
        });
    })

    it('should return an error if there is an error retrieving the data', function () {
        const req = {};
        const res = {
            status: sinon.spy(),
            send: sinon.spy()
        };
        const fakeError = new Error('Error retrieving data');
        const Provider = {
            find: sinon.stub().returns(Promise.reject(fakeError))
        };
        const handleError = sinon.spy();
        const isEmptylist = sinon.stub().returns(false);

        controller.readAll(req, res, Provider, ObjectId, handleError, isEmptylist);

        assert.isTrue(handleError.calledWith(res, fakeError));
        assert.isFalse(res.status.called);
        assert.isFalse

    })
})