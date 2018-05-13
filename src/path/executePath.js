import { validatePath } from './pathHelpers';
import joinFrom from '../utils/joinFrom';

/**
 * Takes in path, a function, and options. Executes the
 * function for every node in the path. Passes the node as an argument.
 * When false or a falsy value is returned from the function, the loop will break.
 * 
 * When `fullPath` option is set to true, it will pass the full path
 * of the node to the function.
 * 
 * When `rootFirst` option is set to true, it will start from root to
 * the children. Default is false.
 */
export default (path, fn, { fullPath, rootFirst } = {}) => {
  validatePath(path);
  if (!fn) { return; }

  // Working with the path as an array, and to .join('.') when needed is
  // faster than working on the path as a string. Having to call
  // .split('.') has a significant impact on the efficiency.
  // See benchmarks/findingParentPath.js

  // Convert path to array if string is provided
  let pathArr = Array.isArray(path) ? path : path.split('.');

  const len = pathArr.length;
  const start = rootFirst ? 0 : len - 1;
  const op = rootFirst ? 1 : -1;

  for (let i = start; i >= 0 && i < len; i += op) {

    let resume = true;
    if (fullPath) {
      resume = fn(pathArr[i], joinFrom(i, pathArr, '.'));
    } else {
      resume = fn(pathArr[i], joinFrom(i));
    }

    if (!resume) {
      break;
    }

  }
}
