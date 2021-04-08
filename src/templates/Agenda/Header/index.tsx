import { Box } from '@chakra-ui/react';

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <Box
      p={4}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      {children}
    </Box>
  );
};

export default Header;
