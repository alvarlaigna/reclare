import global from '../ctx';

import defaultOptions from '../config/broadcastDefaults';
import executeHooks from '../middlewares/executeHooks';
import invokeDeclaration from '../declarations/invokeDeclaration';
import { BEFORE_BROADCAST, AFTER_BROADCAST } from '../middlewares/hookTypes';

const broadcast = ({ ctx, eventKey, payload }) => {
  executeHooks({ ctx, id: BEFORE_BROADCAST }, eventKey, payload);
  invokeDeclaration({
    declaration: ctx.onEvent[eventKey],
    eventKey,
    payload,
    ctx
  });
  executeHooks({ ctx, id: AFTER_BROADCAST }, eventKey, payload);
};

export const _broadcast = ctx => (eventKey, payload, options = {}) => {
  const opts = Object.assign(defaultOptions, options);
  if (opts.defer) {
    setTimeout(() =>
      broadcast({
        ctx: ctx || global.ctx,
        options: opts,
        eventKey,
        payload
      })
    );
  } else {
    broadcast({
      ctx: ctx || global.ctx,
      options: opts,
      eventKey,
      payload
    });
  }
};

export default _broadcast(null);
