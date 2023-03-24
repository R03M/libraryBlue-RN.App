const validateUrlImage = (value) => {
  const regex = /^https?:\/\/.*\.(jpg|gif|png)$/;
  const res = regex.test(value);
  return res ? res : "Solo se admiten formatos en JPG, PNG y GIF.";
};

export default validateUrlImage;
