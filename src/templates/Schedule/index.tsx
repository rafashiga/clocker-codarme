import { useContext, useEffect, useState } from 'react';
import { useFetch } from '@refetty/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';

import { AuthContext } from '@/contexts/AuthContext';
import dateFormatted from '@/utils/DateFormatted';
import { Logo, Header, TimeBlock, Modal, Input } from '@/components';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Button,
  IconButton,
  Text,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';

const ScheduleTemplate = () => {
  const router = useRouter();
  const { auth, logout } = useContext(AuthContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [time, setTime] = useState('');
  const [when, setWhen] = useState(() => new Date());

  const getSchedule = async (when: Date) => {
    return await axios.get('/api/schedule', {
      params: {
        when,
        username: window.location.pathname,
      },
    });
  };

  const [data, { loading, status, error }, fetch] = useFetch(getSchedule, {
    lazy: true,
  });

  const setSchedule = async (data) => {
    return axios.post('/api/schedule', {
      ...data,
      username: window.location.pathname.replace('/', ''),
      when: time,
    });
  };

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
      name: '',
      phone: '',
    },
    onSubmit: (values) => setSchedule(values),
    validationSchema: yup.object().shape({
      name: yup.string().required('Campo obrigatório'),
      phone: yup.string().required('Campo obrigatório'),
    }),
  });

  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const nextDay = () => {
    let nextDate = new Date();
    nextDate = new Date(nextDate.setDate(when.getDate() + 1));
    setWhen(nextDate);
  };

  const previousDay = () => {
    let previousDate = new Date();
    previousDate = new Date(previousDate.setDate(when.getDate() - 1));
    setWhen(previousDate);
  };

  const toggleModal = (time?: string) => {
    setTime(time);
    setIsOpenModal((prevState) => !prevState);
  };

  useEffect(() => {
    !auth.user ? router.push('/') : router.push('/schedule');
  }, [auth.user]);

  useEffect(() => {
    fetch(when);
  }, [when]);

  return (
    <Container>
      <Header>
        <Logo width="150px" />
        <Button onClick={logout}>Sair</Button>
      </Header>
      <Box
        p={4}
        mt={10}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          aria-label="anterior"
          icon={<ChevronLeftIcon />}
          bg="transparent"
          onClick={previousDay}
        />
        <Text flex={1} textAlign="center">
          {dateFormatted(when, dateOptions)}
        </Text>
        <IconButton
          aria-label="próximo"
          icon={<ChevronRightIcon />}
          bg="transparent"
          onClick={nextDay}
        />
      </Box>

      <SimpleGrid p={4} columns={2} spacing={4} justifyItems="center">
        {loading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
        {data?.map((time) => (
          <TimeBlock key={time} time={time} click={() => toggleModal(time)} />
        ))}

        <Modal
          title={`Faça sua reserva. Horário: ${time}`}
          isOpen={isOpenModal}
          onClose={toggleModal}
          click={handleSubmit}
        >
          <Box p={4}>
            <Input
              label="Nome"
              touched={touched.name}
              size="lg"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Digite seu nome"
              error={errors.name}
              isRequired={true}
            />
          </Box>
          <Box p={4}>
            <Input
              label="Telefone"
              touched={touched.phone}
              size="lg"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="(99) 99999-9999"
              error={errors.phone}
              isRequired={true}
            />
          </Box>
        </Modal>
      </SimpleGrid>
    </Container>
  );
};

export default ScheduleTemplate;
