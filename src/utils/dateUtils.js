const formattedMsToDateString = (ms, format = 'en-US') => {
  const tempDate = new Date();
  tempDate.setTime(ms);
  return new Intl.DateTimeFormat('en-US').format(tempDate);
};

export { formattedMsToDateString };
