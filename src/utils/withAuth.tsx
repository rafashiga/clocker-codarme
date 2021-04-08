import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useContext } from 'react';

const withAuth = (Component: any) => {
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  return (props: any) => {
    if (typeof window === 'undefined') {
      if (!auth) {
        router.replace('/');
        return;
      }

      return <Component {...props} />;
    }

    return;
  };
};

export default withAuth;
