export const sleep = m => new Promise(r => setTimeout(r, m))

export const genRandomNumber = (max, min) => Math.floor(Math.random() * ((max-min)+1) + min);

export const tokenExpired = (expires) => (Date.now() - expires) > 3500000 ? true : false;