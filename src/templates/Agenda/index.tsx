import { Button } from '@chakra-ui/button';
import { firebaseClient } from '@/config/firebase';

const AgendaTemplate = () => {
  const logout = () => firebaseClient.auth().signOut();

  return <Button onClick={logout}>Sair</Button>;
};

export default AgendaTemplate;
