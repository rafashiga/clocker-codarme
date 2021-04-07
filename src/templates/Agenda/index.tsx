import { Button } from '@chakra-ui/button';
import firebase from '@/config/firebase';

const AgendaTemplate = () => {
  const logout = () => firebase.auth().signOut();

  return <Button onClick={logout}>Sair</Button>;
};

export default AgendaTemplate;
