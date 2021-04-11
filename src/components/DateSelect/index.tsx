import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, IconButton, Text } from '@chakra-ui/react';
import dateFormatted from '@/utils/DateFormatted';

interface DateSelect {
  date: Date;
  setDate: (date: Date) => void;
}

export const DateSelect = ({ date, setDate }: DateSelect) => {
  const nextDay = () => {
    let nextDate = new Date();
    nextDate = new Date(nextDate.setDate(date.getDate() + 1));
    setDate(nextDate);
  };

  const previousDay = () => {
    let previousDate = new Date();
    previousDate = new Date(previousDate.setDate(date.getDate() - 1));
    setDate(previousDate);
  };

  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <Box
      p={4}
      mt={10}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <IconButton
        aria-label="anterior"
        icon={<ChevronLeftIcon />}
        bg="transparent"
        onClick={previousDay}
      />
      <Text flex={1} textAlign="center">
        {dateFormatted(date, dateOptions)}
      </Text>
      <IconButton
        aria-label="próximo"
        icon={<ChevronRightIcon />}
        bg="transparent"
        onClick={nextDay}
      />
    </Box>
  );
};
