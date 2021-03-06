import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Spinner } from '@chakra-ui/react';
import { AuthContext } from '@/contexts/AuthContext';

export default function Home() {
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!auth.loading) {
      auth.user ? router.push('/agenda') : router.push('/login');
    }
  }, [auth.user, auth.loading]);

  return (
    <Container p={4} centerContent>
      <Spinner />
    </Container>
  );
}
