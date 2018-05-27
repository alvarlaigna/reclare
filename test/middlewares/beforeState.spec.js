import createContext from '../../src/ctx/createContext';
import * as hookTypes from '../../src/middlewares/hookTypes';

describe('beforeState', () => {
  it('should run with correct parameters', done => {
    const mockFn = jest.fn();
    const ctx = createContext({
      middlewares: {
        [hookTypes.BEFORE_STATE]: mockFn
      }
    });
    setTimeout(() => {
      expect(mockFn).toBeCalled();
      const params = mockFn.mock.calls[0][0];
      expect(params).toHaveProperty('ctx');
      expect(params).toHaveProperty('initialState');
      expect(params.ctx.id).toBe(ctx.id);
      done();
    });
  });

  it('should modify the initial state', () => {
    const ctx = createContext({
      initialState: { count: 0 },
      middlewares: {
        [hookTypes.BEFORE_STATE]: () => ({ count: 1 })
      }
    });
    const s = ctx.getState();
    expect(s.count).toBe(1);
  });

  it('should not mess up the initial state', () => {
    const ctx = createContext({
      initialState: { count: 1 },
      middlewares: {
        [hookTypes.BEFORE_STATE]: () => null
      }
    });
    const s = ctx.getState();
    expect(s.count).toBe(1);
  });

  it('should overwrite the initial state', () => {
    const ctx = createContext({
      initialState: { count: 0 },
      middlewares: {
        [hookTypes.BEFORE_STATE]: () => ({ count: 1 })
      }
    });
    const s = ctx.getState();
    expect(s.count).toBe(1);
  });

  it('should initiate state if `initialState` is omitted', () => {
    const ctx = createContext({
      middlewares: {
        [hookTypes.BEFORE_STATE]: () => ({ count: 1 })
      }
    });
    const s = ctx.getState();
    expect(s.count).toBe(1);
  });
});
