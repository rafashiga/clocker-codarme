interface OptionsProps {
  weekday?: string;
  year: string;
  month: string;
  day: string;
}

const dateFormatted = (date: Date, options: OptionsProps) => {
  const locale = 'pt-br';

  return date.toLocaleDateString(locale, options as any);
};

export default dateFormatted;
