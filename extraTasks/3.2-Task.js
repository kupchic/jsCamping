let getProfit = (arr) => {
  if (arr.length < 2) throw Error('you can not get some profit by the 1 day');
  let profit = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] > 0) {
      profit += arr[i] - arr[i - 1];
    }
  }
  return profit;
};