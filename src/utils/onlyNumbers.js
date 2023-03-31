const onlyNumbers = (value) => {
  const onlyNumbers = /^\d+$/;
  return onlyNumbers.test(value);
};

export default onlyNumbers;
