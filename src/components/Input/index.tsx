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
}

export const Input = ({
  label,
  error,
  touched,
  isRequired,
  ...rest
}: InputProps) => {
  return (
    <FormControl id={rest.name} isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <InputBase {...rest} />
      {touched && (
        <FormHelperText ml={4} textColor="#e74c3c">
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};
