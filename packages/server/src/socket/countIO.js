let count = 0;

export default {
  count: () => count,
  addCount: () => {
    count += 1;
    return count;
  },
  removeCount: () => {
    count -= 1;
    return count;
  },
};
