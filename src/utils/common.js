import BigNumber from 'bignumber.js';

export const fromWeiEther = (value) => {
  return new BigNumber(value).div('1000000000000000000').toFixed();
};