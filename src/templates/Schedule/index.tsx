import { useContext, useEffect, useState } from 'react';
import { useFetch } from '@refetty/react';
import axios from 'axios';
import { useRouter } from 'next/router';

import { AuthContext } from '@/contexts/AuthContext';
import dateFormatted from '@/utils/DateFormatted';
import { Logo, Header, TimeBlock } from '@/components';
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

const getSchedule = async (when: Date) => {
  return await axios.get('/api/schedule', {
    params: {
      when,
      username: window.location.pathname,
    },
  });
};

const ScheduleTemplate = () => {
  const { auth, logout } = useContext(AuthContext);
  const router = useRouter();
  const [when, setWhen] = useState(() => new Date());

  const [data, { loading, status, error }, fetch] = useFetch(getSchedule, {
    lazy: true,
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

  useEffect(() => {
    !auth.user && router.push('/schedule');
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
          <TimeBlock key={time} time={time} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default ScheduleTemplate;
