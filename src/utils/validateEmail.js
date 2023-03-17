export const validateEmail = (email) => {
  const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let errors;

  if (!email) {
    errors = "Por favor ingresa un email";
  } else if (!expresionRegular.test(email)) {
    errors = "Por favor ingresa un email válido";
  }
  if (errors) {
    return errors;
  }
};
