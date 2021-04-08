import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Spinner } from '@chakra-ui/react';
import LoginTemplate from '@/templates/Login';
import { AuthContext } from '@/contexts/AuthContext';

export default function Login() {
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    auth.user && router.push('/agenda');
  }, [auth.user]);

  return <LoginTemplate />;
}
