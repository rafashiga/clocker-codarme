import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Container,
  Box,
  Input as InputBase,
  InputGroup,
  Button,
  Text,
  FormControl,
  FormHelperText,
  InputLeftAddon,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { Logo, Input } from '@/components';

export default function Signup() {
  const { auth, signup } = useContext(AuthContext);
  const router = useRouter();

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
    onSubmit: signup,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email('E-mail inválido')
        .required('Campo obrigatório'),
      password: yup.string().required('Campo obrigatório'),
      username: yup.string().required('Campo obrigatório'),
    }),
  });

  useEffect(() => {
    auth.user && router.push('/agenda');
  }, [auth.user]);

  return (
    <Container p={4} centerContent>
      <Logo />
      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>
      <Box>
        <Box p={4}>
          <Input
            label="E-mail"
            type="email"
            touched={touched.email}
            size="lg"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Digite sua e-mail"
            error={errors.email}
            isRequired={true}
          />
        </Box>

        <Box p={4}>
          <Input
            label="Senha"
            type="password"
            touched={touched.password}
            size="lg"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Digite sua senha"
            error={errors.password}
            isRequired={true}
          />
        </Box>

        <FormControl id="username" p={4} isRequired>
          <InputGroup size="lg">
            <InputLeftAddon children="clocker.work/" />
            <InputBase
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
