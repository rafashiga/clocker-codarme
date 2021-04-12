import { Box, Text } from '@chakra-ui/layout';
import Link from 'next/link';

export const Footer = () => {
  return (
    <Box display="flex" textAlign="center" justifyContent="center">
      <Text>
        {`Developed by `}
        <Link href="http://shiga.vercel.app">Rafael Shiga</Link>
      </Text>
    </Box>
  );
};
