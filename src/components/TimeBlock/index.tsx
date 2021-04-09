import { Button } from '@chakra-ui/react';

interface TimeBlockProps {
  time: string;
  click: () => void;
}

export const TimeBlock = ({ time, click }: TimeBlockProps) => {
  return (
    <Button onClick={click} p={8} width={150} bg="blue.500" color="white">
      {time}
    </Button>
  );
};
