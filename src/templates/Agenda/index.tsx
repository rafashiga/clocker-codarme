import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { Button } from '@chakra-ui/button';
import { useRouter } from 'next/router';

const AgendaTemplate = () => {
  const { auth, logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    !auth.user && router.push('/');
  }, [auth.user]);

  return <Button onClick={logout}>Sair</Button>;
};

export default AgendaTemplate;
