import { useEffect, useState } from 'react';

interface MatrixRainProps {
  isVisible: boolean;
  onComplete: () => void;
}

const MatrixRain = ({ isVisible, onComplete }: MatrixRainProps) => {
  const [rainDrops, setRainDrops] = useState<Array<{
    id: string;
    text: string;
    left: number;
    animationDuration: number;
    delay: number;
  }>>([]);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    console.log('MatrixRain useEffect triggered, isVisible:', isVisible);
    
    if (!isVisible) {
      setShowCode(false);
      return;
    }

    console.log('Setting up matrix rain animation...');

    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const drops: any[] = [];

    // Create 50 falling code streams
    for (let i = 0; i < 50; i++) {
      const text = Array.from({ length: 20 }, () => 
        matrixChars[Math.floor(Math.random() * matrixChars.length)]
      ).join('\n');

      drops.push({
        id: `drop-${i}`,
        text,
        left: Math.random() * 100,
        animationDuration: 2 + Math.random() * 3,
        delay: Math.random() * 2,
      });
    }

    setRainDrops(drops);
    console.log('Rain drops created:', drops.length);

    // Start showing code after the black fade-in
    const codeTimer = setTimeout(() => {
      console.log('Starting to show matrix code');
      setShowCode(true);
    }, 800);

    // Auto complete after full animation sequence
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(codeTimer);
      clearTimeout(completeTimer);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  console.log('Rendering MatrixRain component, showCode:', showCode, 'rainDrops:', rainDrops.length);

  return (
    <div className="matrix-rain fixed inset-0 z-50 pointer-events-none">
      {showCode && rainDrops.map((drop) => (
        <div
          key={drop.id}
          className="matrix-code animate absolute"
          style={{
            left: `${drop.left}%`,
            animationDuration: `${drop.animationDuration}s`,
            animationDelay: `${drop.delay}s`,
          }}
        >
          {drop.text}
        </div>
      ))}
      {showCode && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="text-6xl font-bold text-electric-blue animate-pulse"
            style={{
              animation: 'matrix-code-fade-in 1s ease-out 1.2s forwards, pulse 2s infinite 2.2s',
              opacity: 0
            }}
          >
            TechBlog
          </div>
        </div>
      )}
    </div>
  );
};

export default MatrixRain;