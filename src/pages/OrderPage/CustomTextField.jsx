import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';


const CustomTextField = ({ control, name, label, errors }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          id={`standard-error-helper-text-${name}`}
          label={label}
          helperText={errors[name] ? errors[name].message : ''}
          error={!!errors[name]}
          variant="standard"
          autoComplete={name}
          className='a'
        />
      )}
    />
  );
};

export default CustomTextField;