const Helpers = () => {

  const dateFormatter = (date) => {
    date = date.split('/');
    return date[2] + '-'+ date[1] + '-' + date[0];
  };

  return {
    dateFormatter
  };
};

export default Helpers;