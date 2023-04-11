// Methods
const sortBy = (data: Array<object>, key: string, direction = 'asc') => {
  let sortedData = [{}];

  sortedData = data.sort((a, b) => {
    let x: string = a[key as keyof typeof a];
    let y: string = b[key as keyof typeof b];
    x = x.toLowerCase();
    y = y.toLowerCase();

    if (direction === 'asc') {
      return x > y ? 1 : y > x ? -1 : 0;
    } else if (direction === 'desc') {
      return x > y ? -1 : y > x ? 1 : 0;
    } else {
      return 0;
    }
  });

  return sortedData;
};

// Export
export { sortBy };
