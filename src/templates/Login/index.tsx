import Link from 'next/link';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Container, Box, Button, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { Logo, Input } from '@/components';

const LoginTemplate = () => {
  const { login } = useContext(AuthContext);

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
      password: '',
    },
    onSubmit: login,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email('E-mail inválido')
        .required('Campo obrigatório'),
      password: yup.string().required('Campo obrigatório'),
    }),
  });

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
            placeholder="Digite seu nome"
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

        <Box p={4}>
          <Button
            width="100%"
            onClick={() => handleSubmit()}
            isLoading={isSubmitting}
            colorScheme="blue"
          >
            Entrar
          </Button>
        </Box>
      </Box>
      <Link href="/signup">Ainda não tem uma conta? Cadastre-se</Link>
    </Container>
  );
};

export default LoginTemplate;
