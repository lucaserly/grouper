const helperFuncs = {
  xToIndex: (...args: any) => {
    const [x, scrollOffSet, flatListLayoutX, listItemWidth, arrLen] = args
    if (listItemWidth === 0) throw new Error('Denominator cannot be 0');
    if (typeof x === "string" || typeof scrollOffSet === "string"
      || typeof flatListLayoutX === "string" || typeof listItemWidth === "string"
    ) throw new Error('Args cannot be strings')
    const res = Math.floor((scrollOffSet + x - flatListLayoutX) / listItemWidth);
    if (res > arrLen || res < 0) throw new Error('Result cannot be out of array length range')
    return res;
  }
}

export default helperFuncs;