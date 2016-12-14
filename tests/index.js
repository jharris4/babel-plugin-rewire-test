import {default as expect, createSpy} from 'expect';

import { append, __RewireAPI__ as IndexRewire } from '../src/';

function createSpyFunction(rewire, functionProperty) {
  let existingFunction = rewire.__GetDependency__(functionProperty);
  let spy = createSpy(existingFunction).andCallThrough();
  rewire.__Rewire__(functionProperty, spy);
  return spy;
}

function removeSpyFunction(rewire, functionProperty) {
  rewire.__ResetDependency__(functionProperty);
}

function setMockFunction(rewire, functionProperty, fn) {
  rewire.__Rewire__(functionProperty, fn);
}

function removeMockFunction(rewire, functionProperty) {
  rewire.__ResetDependency__(functionProperty);
}

describe('index', function() {
  describe('append', function() {
    it('should print \'production postfix\'', function() {
      expect(append()).toEqual('production postfix');
    });

    it('should print something different when getMode is mocked', function() {
      setMockFunction(IndexRewire, 'getMode', function() { return 'abc'; });
      expect(append()).toEqual('abc postfix');
      removeMockFunction(IndexRewire, 'getMode');
    });

    it('should call getMode exactly once', function() {
      let getModeSpy = createSpyFunction(IndexRewire, 'getMode');
      append();
      expect(getModeSpy.calls.length).toEqual(1);
      removeSpyFunction(IndexRewire, 'getMode');
    });
  });
});