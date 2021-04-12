import { useContext, useEffect, useState } from 'react';
import { useFetch } from '@refetty/react';
import axios from 'axios';
import { useRouter } from 'next/router';

import { AuthContext } from '@/contexts/AuthContext';
import dateFormatted from '@/utils/DateFormatted';
import { Logo, Header, DateSelect } from '@/components';
import { getToken } from '@/config/firebase/client';
import { Box, Container, Button, Text, Spinner, Alert } from '@chakra-ui/react';

const AgendaTemplate = () => {
  const { auth, logout } = useContext(AuthContext);
  const router = useRouter();
  const [when, setWhen] = useState(() => new Date());

  const getAgenda = async (when: Date) => {
    try {
      const token = await getToken();
      return await axios.get('/api/agenda', {
        params: {
          date: dateFormatted(when),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const [data, { loading }, fetch] = useFetch(getAgenda, {
    lazy: true,
  });

  useEffect(() => {
    !auth.user && router.push('/');
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
      {!loading && data?.length ? (
        data.map((doc) => (
          <Box
            display="flex"
            key={doc.time}
            background="gray.100"
            borderRadius={8}
            p={4}
            mt={2}
            alignItems="center"
          >
            <Box flex={1}>{doc.time}</Box>
            <Box textAlign="right">
              <Text fontSize="2xl">{doc.name}</Text>
              <Text fontSize="sm">{doc.phone}</Text>
            </Box>
          </Box>
        ))
      ) : (
        <Alert mt={4} status="info">
          0 usuários agendados
        </Alert>
      )}
    </Container>
  );
};

export default AgendaTemplate;
