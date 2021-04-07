import { useState, useEffect } from 'react';
import { Container, Spinner } from '@chakra-ui/react';
import LoginTemplate from '@/templates/Login';
import firebase from '@/config/firebase';
import AgendaTemplate from '@/templates/Agenda';

export default function Home() {
  const [auth, setAuth] = useState({
    loading: true,
    user: false,
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
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
