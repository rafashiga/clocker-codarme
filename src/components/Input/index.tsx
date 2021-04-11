import { mask, unMask } from 'remask';
import {
  FormControl,
  Input as InputBase,
  FormHelperText,
  InputProps as InputBaseProps,
  FormLabel,
} from '@chakra-ui/react';

interface InputProps extends InputBaseProps {
  label?: string;
  error?: any;
  touched?: any;
  isRequired?: boolean;
  onChange: any;
  mask?: string[];
}

export const Input = ({
  label,
  error,
  touched,
  isRequired,
  onChange,
  mask: patterns,
  ...rest
}: InputProps) => {
  const handleChange = (event: any) => {
    const valueUnMasked = unMask(event.target.value);
    const valueMasked = mask(valueUnMasked, patterns);
    onChange && onChange(event.target.name)(valueMasked);
  };

  return (
    <FormControl id={rest.name} isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <InputBase
        {...rest}
        onChange={patterns?.length ? handleChange : onChange}
      />
      {touched && (
        <FormHelperText ml={4} textColor="#e74c3c">
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};
