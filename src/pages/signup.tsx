import Link from 'next/link';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Container,
  Box,
  Input,
  InputGroup,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  InputLeftAddon,
} from '@chakra-ui/react';
import { Logo } from '@/components';
import { firebaseClient } from '@/config/firebase';

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
  username: yup.string().required('Campo obrigatório'),
});

export default function Signup() {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    onSubmit: async (values, form) => {
      try {
        const user = await firebaseClient
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password);
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    },
    validationSchema,
  });

  return (
    <Container p={4} centerContent>
      <Logo />
      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>
      <Box>
        <FormControl id="email" p={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            size="lg"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && (
            <FormHelperText textColor="#e74c3c">{errors.email}</FormHelperText>
          )}
        </FormControl>

        <FormControl id="password" p={4} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            size="lg"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && (
            <FormHelperText textColor="#e74c3c">
              {errors.password}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl id="username" p={4} isRequired>
          <InputGroup size="lg">
            <InputLeftAddon children="clocker.work/" />
            <Input
              type="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </InputGroup>
          {touched.username && (
            <FormHelperText textColor="#e74c3c">
              {errors.username}
            </FormHelperText>
          )}
        </FormControl>

        <Box p={4}>
          <Button
            width="100%"
            onClick={() => handleSubmit()}
            isLoading={isSubmitting}
            colorScheme="blue"
          >
            cadastrar
          </Button>
        </Box>
      </Box>

      <Link href="/">Já tem uma conta? Acesse!</Link>
    </Container>
  );
}
