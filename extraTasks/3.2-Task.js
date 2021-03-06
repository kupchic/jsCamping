let getProfit = (arr) => {
  arr = arr.filter(a=>{
    return a > 0 && a;
  });
  if (arr.length < 2) return 0;
  let profit = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] > 0) {
      profit += arr[i] - arr[i - 1];
    }
  }
  return profit;
};
