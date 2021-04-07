import { useState, useEffect } from 'react';
import { Container, Spinner } from '@chakra-ui/react';
import LoginTemplate from '@/templates/Login';
import { firebaseClient } from '@/config/firebase';
import AgendaTemplate from '@/templates/Agenda';

export default function Home() {
  const [auth, setAuth] = useState({
    loading: true,
    user: false,
  });

  useEffect(() => {
    firebaseClient.auth().onAuthStateChanged((user) => {
      setAuth({
        loading: false,
        user: !!user,
      });
    });
  }, []);

  if (auth.loading) {
    return (
      <Container p={4} centerContent>
        <Spinner />
      </Container>
    );
  }

  return auth.user ? <AgendaTemplate /> : <LoginTemplate />;
}
