import { useForm } from 'react-hook-form';
import { yupResolver} from '@hookform/resolvers/yup';
import { validationSchema } from './validationSchema';

const OrderForm = () => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      name: '',
      email: '',
      address: '',
    },
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data) => {
    console.log(data)
  }





  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} type='text' placeholder=''name=''/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default OrderForm