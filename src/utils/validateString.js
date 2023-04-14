const validateString = (value, name) => {
  let error;
  if (value === "") {
    error = `El ${name} no puede estar en blanco`;
  } else if (value.length < 3) {
    error = `El ${name} es muy corto`;
  }

  if (error) {
    return error;
  }
};

export default validateString;
