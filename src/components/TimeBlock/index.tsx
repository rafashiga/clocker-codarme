import { Button } from '@chakra-ui/react';

interface TimeBlockProps {
  time: string;
}

export const TimeBlock = ({ time }: TimeBlockProps) => {
  return (
    <Button p={8} width={150} bg="blue.500" color="white">
      {time}
    </Button>
  );
};
