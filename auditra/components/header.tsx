import { WavyBackground } from "./ui/wavy-background";
import { useMediaQuery } from 'react-responsive';

export default function Header() {
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 480px) and (max-width: 767px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 479px)' });

  return (
    <WavyBackground className="flex flex-col justify-center items-center min-h-screen max-w-4xl mx-auto pb-20">
      <p
        className={`text-white font-bold inter-var text-center ${isDesktop ? 'text-6xl' : isTablet ? 'text-4xl' : 'text-3xl'} font-extrabold`}
      >
        Auditra, AI Smart Contract
      </p>
      <p
        className={`text-white font-bold inter-var text-center ${isDesktop ? 'text-6xl' : isTablet ? 'text-4xl' : 'text-3xl'} font-extrabold`}
      >
        Auditor
      </p>
      <p
        className={`text-white font-normal inter-var text-center mt-4 ${isDesktop ? 'text-2xl' : isTablet ? 'text-xl' : 'text-lg'}`}
      >
        Leverage the power of AI to audit your smart contracts
      </p>
    </WavyBackground>
  );
}


