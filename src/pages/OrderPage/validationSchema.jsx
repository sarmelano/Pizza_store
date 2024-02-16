import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  cardNumber: yup.string().max(16).min(16).required(),
  address: yup.string().required(),
});