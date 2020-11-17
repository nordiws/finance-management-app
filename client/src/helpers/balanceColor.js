const balanceColor = (balance) => {
  if (balance >= 0) {
    return 'green-text';
  } else {
    return 'red-text';
  }
};

export { balanceColor };
