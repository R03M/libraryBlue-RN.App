/**
 * Actualiza el estado de una variable con una propiedad dinámica
 * @param {React.Dispatch<React.SetStateAction<{[key: string]: any}>>} set La función para actualizar el estado de la variable
 * @param {string} type El nombre de la propiedad dinámica
 * @param {any} value El nuevo valor de la propiedad
 * @returns {void}
 */
const handlerValue = (set, type, value) => {
  set((prevValue) => ({ ...prevValue, [type]: value }));
};

export default handlerValue;
