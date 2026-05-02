import { useEffect, useRef } from 'react';
import clickSound from '../assets/audio/Click.mp3';

export function useClickSound(soundPath = clickSound) {
  const audioPoolRef = useRef([]);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    // Create a pool of audio elements for instant playback
    const poolSize = 5;
    audioPoolRef.current = [];
    
    for (let i = 0; i < poolSize; i++) {
      const audio = new Audio(soundPath);
      audio.volume = 0.3;
      audio.preload = 'auto';
      // Force load the audio
      audio.load();
      audioPoolRef.current.push(audio);
    }

    // Add click event listener to the entire document
    const handleClick = (e) => {
      // Check if clicked element is interactive
      const target = e.target;
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.onclick !== null ||
        target.getAttribute('role') === 'button' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('clickable');

      if (isInteractive) {
        // Get next audio from pool
        const audio = audioPoolRef.current[currentIndexRef.current];
        currentIndexRef.current = (currentIndexRef.current + 1) % audioPoolRef.current.length;
        
        // Reset and play instantly
        audio.currentTime = 0;
        audio.play().catch(err => {
          console.log('Click sound play prevented:', err);
        });
      }
    };

    // Use capture phase for faster response
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
      audioPoolRef.current.forEach(audio => {
        audio.pause();
        audio.src = '';
      });
      audioPoolRef.current = [];
    };
  }, [soundPath]);
}

// Alternative: Direct play function for specific elements
export function playClickSound(soundPath = clickSound, volume = 0.3) {
  const audio = new Audio(soundPath);
  audio.volume = volume;
  audio.play().catch(err => {
    console.log('Click sound play prevented:', err);
  });
}
