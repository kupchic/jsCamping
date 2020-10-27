let searchMaxSum = (arr) => {
  let maxSum = 0;
  let tempSum = 0;
  for (let i = 0; i <= arr.length; i++) {
    tempSum += arr[i];
    maxSum = Math.max(maxSum, tempSum);
    if (tempSum < 0 || tempSum < maxSum) tempSum = 0;
  }
  return maxSum;
};
