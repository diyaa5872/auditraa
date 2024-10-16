import { WavyBackground } from "./ui/wavy-background";
import { useMediaQuery } from 'react-responsive';

export default function Header() {
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 480px) and (max-width: 767px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 479px)' });

  return (
    <WavyBackground className="flex flex-col justify-center items-center min-h-screen max-w-4xl mx-auto pb-20">
      <p
        style={{
          fontSize: isDesktop ? 48 : isTablet ? 36 : 28,
          lineHeight: 1.2,
          fontWeight: 900, /* increased font weight for extra boldness */
        }}
        className="text-white font-bold inter-var text-center"
      >
        Auditra, AI Smart Contract
      </p>
      <p
        style={{
          fontSize: isDesktop ? 48 : isTablet ? 36 : 28,
          lineHeight: 1.2,
          fontWeight: 900, /* increased font weight for extra boldness */
        }}
        className="text-white font-bold inter-var text-center"
      >
        Auditor
      </p>
      <p
        style={{
          fontSize: isDesktop ? 24 : isTablet ? 20 : 18,
          lineHeight: 1.2,
        }}
        className="text-white font-normal inter-var text-center mt-4"
      >
        Leverage the power of AI to audit your smart contracts
      </p>
    </WavyBackground>
  );
}