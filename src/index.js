export const postfix = ' postfix';
const localPostfix = ' localPostfix';

export function getMode() {
  if (process.env.NODE_ENV === 'production') {
    return 'production';
  }
  else {
    return 'not production';
  }
}

function getLocalMode() {
  if (process.env.NODE_ENV === 'production') {
    return 'lproduction';
  }
  else {
    return 'not lproduction';
  }
}

export function appendLocal() {
  return getLocalMode() + localPostfix;
}

export function append() {
  return getMode() + postfix;
}