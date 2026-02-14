import { useState, useRef } from 'react';
import NeonHeartsBackground from './components/NeonHeartsBackground';
import SuccessMeme from './components/SuccessMeme';
import { useEvasiveButton } from './hooks/useEvasiveButton';

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const yessButtonRef = useRef<HTMLButtonElement>(null);
  const { position, handleEvade, buttonRef } = useEvasiveButton(yessButtonRef);

  if (accepted) {
    return (
      <>
        <NeonHeartsBackground />
        <SuccessMeme />
      </>
    );
  }

  return (
    <>
      <NeonHeartsBackground />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="neon-text mb-8 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Hridya,
          </h1>
          <h2 className="neon-text-secondary mb-12 text-3xl font-semibold sm:text-4xl md:text-5xl">
            Will you be my Valentine? 💕
          </h2>
          
          <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <button
              ref={yessButtonRef}
              onClick={() => setAccepted(true)}
              className="neon-button z-20 rounded-full px-12 py-4 text-xl font-bold transition-all hover:scale-110 sm:text-2xl"
            >
              yess
            </button>
            
            <button
              ref={buttonRef}
              onMouseEnter={handleEvade}
              onPointerDown={handleEvade}
              onTouchStart={handleEvade}
              style={{
                position: position ? 'fixed' : 'relative',
                left: position ? `${position.x}px` : 'auto',
                top: position ? `${position.y}px` : 'auto',
                transition: position ? 'none' : 'all 0.2s',
              }}
              className="neon-button-secondary z-10 rounded-full px-12 py-4 text-xl font-bold transition-all hover:scale-110 sm:text-2xl"
            >
              i dont like you
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
