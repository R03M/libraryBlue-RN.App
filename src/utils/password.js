export const validatePassword = (password) => {
  const regexNro = /\d+/;
  const blankSpace = /\s/;
  let errors = [];
  
  if (!blankSpace.test(password)) {
    errors.push("Se requiere al menos un espacio en blanco.");
  }
  if (password.length < 5) {
    errors.push("Se requiere al menos 5 caracteres.");
  }
  if (!regexNro.test(password)) {
    errors.push("Se requiere al menos un numero.");
  }
  if (errors.length > 0) {
    return errors.join("\n");
  }
};
