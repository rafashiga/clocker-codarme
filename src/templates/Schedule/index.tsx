import { useContext, useEffect, useState } from 'react';
import { useFetch } from '@refetty/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';

import { AuthContext } from '@/contexts/AuthContext';
import dateFormatted from '@/utils/DateFormatted';
import { Logo, TimeBlock, Modal, Input, DateSelect } from '@/components';
import { Box, Container, SimpleGrid, Spinner } from '@chakra-ui/react';

interface ISchedule {
  date: Date;
  time: string;
  name: string;
  phone: string;
}

const ScheduleTemplate = () => {
  const router = useRouter();
  const { auth, logout } = useContext(AuthContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [time, setTime] = useState('');
  const [when, setWhen] = useState(() => new Date());
  const username = router.query.username;

  if (router.isFallback) {
    return null;
  }

  const getSchedule = async (date: Date, currentUser: string) => {
    try {
      return await axios.get('/api/schedule', {
        params: {
          date: dateFormatted(date),
          username: currentUser,
        },
      });
    } catch (error) {
      if (error.response?.status === 404) {
        router.push('/');
      }
    }
  };

  const [data, { loading }, fetch] = useFetch(getSchedule, {
    lazy: true,
  });

  const setSchedule = async ({ date, ...data }: ISchedule) => {
    try {
      return axios.post('/api/schedule', {
        ...data,
        date: dateFormatted(date),
        username: router.query.username,
        time,
      });
    } catch (error) {
      console.error(error.response);
    }
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
    onSubmit: async (values) => {
      try {
        await setSchedule({ ...values, time, date: when });
        toggleModal();
        refresh();
      } catch (error) {
        console.error(error);
      }
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Campo obrigat??rio'),
      phone: yup.string().required('Campo obrigat??rio'),
    }),
  });

  const toggleModal = (time?: string) => {
    values.name = '';
    values.phone = '';
    setTime(time);
    setIsOpenModal((prevState) => !prevState);
  };

  const refresh = () => {
    if (username) fetch(when, username);
  };

  useEffect(() => {
    refresh();
  }, [when, username]);

  return (
    <Container>
      <Box display="flex" mt="5" justifyContent="center">
        <Logo width="250px" />
      </Box>
      <DateSelect setDate={setWhen} date={when} />

      {loading && (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      )}

      <SimpleGrid p={4} columns={2} spacing={4} justifyItems="center">
        {data?.map(({ time, isBlocked }) => (
          <TimeBlock
            key={time}
            time={time}
            click={() => toggleModal(time)}
            disabled={isBlocked}
          />
        ))}

        <Modal
          title={`Fa??a sua reserva. Hor??rio: ${time}`}
          isOpen={isOpenModal}
          onClose={toggleModal}
          click={handleSubmit}
          isLoading={isSubmitting}
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
              mask={['(99) 9999-9999', '(99) 99999-9999']}
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
