import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validationSchema';
import CustomTextField from './CustomTextField';
import { useDispatch, useSelector } from 'react-redux';
import './OrderForm.scss'
import { togglePriority } from '../../redux/slices/CartSlice';

const OrderForm = () => {
  const userName = useSelector((state) => state.user.name);
  const { totalPrice } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: userName,
      email: '',
      cardNumber: '',
      address: '',
      priority: false,
    },
    resolver: yupResolver(validationSchema),
    mode: 'onBlur'
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  }

  const handlePriorityChange = (e) => {
    dispatch(togglePriority());
  }
  
  return (
    <div className='order-form_wrapper'>
      <h2>Ready to order? Let's go!</h2>
      <form className='order-form' onSubmit={handleSubmit(onSubmit)}>
        <CustomTextField control={control} name="name" label="Name" errors={errors} />
        <CustomTextField control={control} name="email" label="Email" errors={errors} />
        <CustomTextField control={control} name="cardNumber" label="Card Number" errors={errors} />
        <CustomTextField control={control} name="address" label="Address" errors={errors} />

        <div className='order-form_checkbox-wrapper'>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <input type="checkbox" id="priority" {...field} onChange={handlePriorityChange} />
            )}
          />
          <label htmlFor='priority' className='order-form_label'>Make my order priority</label>
        </div>

        <div className='order-form_btn-wrapper'>
          <button className='cart-btn order_btn' type="submit">ORDER NOW for <span className='order-form_total-price'>{totalPrice}$</span></button>
        </div>
      </form>
    </div>
  )
}

export default OrderForm