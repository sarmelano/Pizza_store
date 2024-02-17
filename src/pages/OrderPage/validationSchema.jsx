import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().max(10).min(10).required(),
  address: yup.string().required(),
});
