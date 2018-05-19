function simpleFormat(num) {
  const units = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

  for (let i = units.length - 1; i >= 0; i -= 1) {
    const decimal = 1000 ** (i + 1);

    if (num <= -decimal || num >= decimal) {
      return +(num / decimal).toFixed(1) + units[i];
    }
  }
  return num;
}

export { simpleFormat };
