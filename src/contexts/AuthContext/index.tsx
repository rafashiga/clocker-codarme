import { useState, createContext, ReactNode, useEffect } from 'react';
import { firebaseClient, persistenceMode } from '@/config/firebase';

interface Auth {
  loading: boolean;
  user: boolean;
}

interface AuthContextData {
  auth: Auth;
  setAuth: (values: Auth) => void;
  login: ({ email, password }) => void;
  signup: ({ email, password, username }) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState({
    loading: true,
    user: false,
  });

  useEffect(() => {
    const unsubscribe = firebaseClient.auth().onAuthStateChanged((user) => {
      setAuth({
        loading: false,
        user: !!user,
      });
    });

    return () => unsubscribe();
  }, []);

  const login = async ({ email, password }) => {
    firebaseClient.auth().setPersistence(persistenceMode);

    try {
      await firebaseClient.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('LOGIN ERROR: ', error);
    }
  };

  const signup = async ({ email, password, username }) => {
    try {
      await firebaseClient
        .auth()
        .createUserWithEmailAndPassword(email, password);
      login({ email, password });
      // setupProfile(token, username);

      // const res = await axios.post(
      //   '/api/profile',
      //   {
      //     username: values.username,
      //   },
      //   {
      //     headers: {
      //       Authentication: `Bearer ${user.getToken()}`,
      //     },
      //   }
      // );
    } catch (error) {
      console.error('SIGNUP ERROR: ', error);
    }
  };

  const logout = () => firebaseClient.auth().signOut();

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
