interface OptionsProps {
  weekday?: string;
  year: string;
  month: string;
  day: string;
}

const dateFormatted = (date: Date, options?: OptionsProps) => {
  const locale = 'pt-br';

  if (options) {
    return date.toLocaleDateString(locale, options as any);
  } else {
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(
      -2
    )}-${date.getDate()}`;
  }
};

export default dateFormatted;
