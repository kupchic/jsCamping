let searchMaxSum = (arr) => {
  let maxSum = 0;
  for (let i = 0; i < arr.length; i++) {
    let tempSum = 0;
    for (let j = i; j < arr.length; j++) {
      tempSum += arr[j];
      maxSum = Math.max(maxSum, tempSum);
    }
  }
  return maxSum;
};
