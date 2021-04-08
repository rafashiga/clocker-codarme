interface LogoProps {
  width?: string;
}

export const Logo = ({ width }: LogoProps) => {
  return <img src="img/logo.svg" alt="Clocker logo" width={width ?? '100%'} />;
};
