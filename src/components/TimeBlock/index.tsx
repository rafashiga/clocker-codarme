import { Button } from '@chakra-ui/react';

interface TimeBlockProps {
  time: string;
  click: () => void;
  disabled: boolean;
}

export const TimeBlock = ({ time, click, disabled }: TimeBlockProps) => {
  return (
    <Button
      onClick={click}
      p={8}
      width={150}
      bg="blue.500"
      color="white"
      disabled={disabled}
    >
      {time}
    </Button>
  );
};
