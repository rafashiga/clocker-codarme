import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '@/contexts/AuthContext';
import { Footer } from '@/components';
import '@/styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <main className="main">
          <Component {...pageProps} />
        </main>
        <Footer />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
