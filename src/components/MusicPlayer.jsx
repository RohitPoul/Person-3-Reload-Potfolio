import { useState, useEffect, useRef } from 'react';

export default function MusicPlayer({ src, autoPlay = false, volume = 0.5 }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [autoplayAttempted, setAutoplayAttempted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set up audio for streaming
    audio.volume = volume;
    audio.preload = 'metadata'; // Only load metadata, not the entire file
    
    const handleCanPlay = () => {
      setIsLoaded(true);
      
      // Try autoplay when audio is ready
      if (autoPlay && !autoplayAttempted) {
        setAutoplayAttempted(true);
        audio.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(err => {
            console.log('Autoplay blocked by browser. User interaction required.');
            // Set up one-time click listener to start music on first user interaction
            const startOnInteraction = () => {
              audio.play()
                .then(() => setIsPlaying(true))
                .catch(e => console.log('Play failed:', e));
              document.removeEventListener('click', startOnInteraction);
              document.removeEventListener('keydown', startOnInteraction);
            };
            document.addEventListener('click', startOnInteraction, { once: true });
            document.addEventListener('keydown', startOnInteraction, { once: true });
          });
      }
    };
    
    const handleError = (e) => {
      console.error('Audio loading error:', e);
      setIsPlaying(false);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, [volume, autoPlay, autoplayAttempted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) return;

    if (isPlaying) {
      audio.play().catch(err => {
        console.log('Play prevented:', err);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, isLoaded]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={src} 
        loop
        preload="metadata"
      />
      
      <button 
        className="p3-cd-player"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        disabled={!isLoaded}
      >
        <div className={`p3-cd-disc ${isPlaying ? 'spinning' : ''}`}>
          <div className="p3-cd-center" />
          <div className="p3-cd-shine" />
          <div className="p3-cd-grooves" />
        </div>
        <div className="p3-play-icon">
          {!isLoaded ? '⏳' : isPlaying ? '❚❚' : '▶'}
        </div>
      </button>

      <style>{`
        .p3-cd-player {
          position: fixed;
          bottom: 80px;
          right: 20px;
          z-index: 20000;
          width: 70px;
          height: 70px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: transform 0.3s ease;
        }

        .p3-cd-player:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .p3-cd-player:not(:disabled):hover {
          transform: scale(1.1);
        }

        .p3-cd-player:not(:disabled):active {
          transform: scale(0.95);
        }

        .p3-cd-disc {
          position: absolute;
          width: 70px;
          height: 70px;
          background: radial-gradient(circle at center, 
            #2a2a2a 0%, 
            #0a0a0a 15%, 
            #1a1a1a 16%,
            #0f0f0f 17%,
            #2a2a2a 40%,
            #1a1a1a 60%,
            #0a0a0a 80%,
            #000 100%
          );
          border-radius: 50%;
          box-shadow: 
            inset 0 0 15px rgba(0, 0, 0, 0.9),
            inset 0 0 30px rgba(0, 0, 0, 0.6),
            0 4px 15px rgba(0, 0, 0, 0.8),
            0 0 0 2px rgba(50, 50, 50, 0.3);
          transition: transform 0.3s ease;
        }

        .p3-cd-disc.spinning {
          animation: cdSpin 2s linear infinite;
        }

        @keyframes cdSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .p3-cd-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, #4a4a4a 0%, #1a1a1a 50%, #0a0a0a 100%);
          border-radius: 50%;
          box-shadow: 
            inset 0 2px 4px rgba(255, 255, 255, 0.1),
            inset 0 -2px 4px rgba(0, 0, 0, 0.5),
            0 2px 6px rgba(0, 0, 0, 0.6);
        }

        .p3-cd-shine {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(255, 255, 255, 0.05) 30deg,
            rgba(255, 255, 255, 0.15) 60deg,
            rgba(200, 200, 255, 0.1) 90deg,
            rgba(255, 255, 255, 0.05) 120deg,
            transparent 150deg,
            rgba(255, 255, 255, 0.03) 210deg,
            rgba(255, 255, 255, 0.08) 240deg,
            rgba(200, 200, 255, 0.06) 270deg,
            rgba(255, 255, 255, 0.03) 300deg,
            transparent 330deg,
            transparent 360deg
          );
          border-radius: 50%;
          opacity: 0.7;
        }

        .p3-cd-grooves {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-radial-gradient(
            circle at center,
            transparent 0px,
            transparent 2px,
            rgba(0, 0, 0, 0.1) 2px,
            rgba(0, 0, 0, 0.1) 3px
          );
          border-radius: 50%;
          opacity: 0.3;
        }

        .p3-play-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: Arial, sans-serif;
          font-size: 20px;
          color: white;
          font-weight: bold;
          z-index: 2;
          text-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.8),
            0 0 10px rgba(255, 255, 255, 0.3);
          pointer-events: none;
          filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
        }

        @media (max-width: 768px) {
          .p3-cd-player {
            bottom: max(100px, calc(env(safe-area-inset-bottom) + 100px));
            right: 15px;
            width: 60px;
            height: 60px;
          }

          .p3-cd-disc {
            width: 60px;
            height: 60px;
          }

          .p3-cd-center {
            width: 18px;
            height: 18px;
          }

          .p3-play-icon {
            font-size: 18px;
          }
        }
      `}</style>
    </>
  );
}
