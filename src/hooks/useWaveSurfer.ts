import { remote } from '@/lib/utils';
import { useEffect, useId, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

// Global state for managing audio players
const audioPlayers = new Map<string, () => void>();
let currentPlayingId: string | null = null;

const WAVESURFER_CONFIG = {
  waveColor: '#e5e7eb',
  progressColor: '#2b2c52',
  height: 4,
  cursorWidth: 12,
  cursorColor: '#2b2c52',
  barWidth: 0,
  barGap: 0,
  normalize: false,
  hideScrollbar: true
} as const;

export default function useWaveSurfer({ src }: { src: string | null | undefined }) {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const playerId = useId();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isError, setIsError] = useState(!src);
  const [duration, setDuration] = useState<number | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLMediaElement | null>(null);

  useEffect(() => {
    const container = waveformRef.current;
    if (!container || !src) return;

    wavesurferRef.current?.destroy(); // Cleanup previous instance
    const ws = WaveSurfer.create({
      container,
      ...WAVESURFER_CONFIG
    });
    wavesurferRef.current = ws;

    // Event handlers
    const handlePause = () => setIsPlaying(false);

    const handleReady = () => {
      const d = ws.getDuration();
      setDuration(isFinite(d) ? d : null);
      // Get the audio element for visualizer
      const media = ws.getMediaElement();
      if (media) setAudioElement(media);

      // Style the cursor to be circular after WaveSurfer is ready
      setTimeout(() => {
        const cursor = container.querySelector('[part="cursor"]') as HTMLElement;
        if (cursor) {
          cursor.style.borderRadius = '50%';
          cursor.style.width = '12px';
          cursor.style.height = '12px';
          cursor.style.top = '50%';
          cursor.style.transform = 'translateY(-50%)';
          cursor.style.marginLeft = '-6px';
        }
      }, 100);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      // Pause other players when this one starts playing
      if (currentPlayingId && currentPlayingId !== playerId) {
        audioPlayers.get(currentPlayingId)?.();
      }
      currentPlayingId = playerId;
    };

    const handleError = (err: Error) => {
      // eslint-disable-next-line no-console
      console.error('WaveSurfer error:', err);
      setIsError(true);
    };

    const handleFinish = () => {
      setIsPlaying(false);
      ws.seekTo(0);
    };

    // Register events
    ws.on('ready', handleReady);
    ws.on('error', handleError);
    ws.on('play', handlePlay);
    ws.on('pause', handlePause);
    ws.on('finish', handleFinish);

    ws.load(remote(src));
    audioPlayers.set(playerId, () => ws.pause()); // Register this player's pause function

    return () => {
      // Cleanup
      ws.un('error', handleError);
      ws.un('play', handlePlay);
      ws.un('pause', handlePause);
      ws.un('finish', handleFinish);
      ws.un('ready', handleReady);
      ws.destroy();
      audioPlayers.delete(playerId);
      if (currentPlayingId === playerId) currentPlayingId = null;
    };
  }, [src, playerId]);

  const togglePlay = () => {
    wavesurferRef.current?.playPause();
  };

  const skipForward = () => {
    const ws = wavesurferRef.current;
    if (!ws) return;
    const currentTime = ws.getCurrentTime();
    const duration = ws.getDuration();
    if (!isFinite(duration) || duration === 0) return;
    const newTime = Math.min(currentTime + 30, duration);
    ws.seekTo(newTime / duration);
  };

  const skipBackward = () => {
    const ws = wavesurferRef.current;
    if (!ws) return;
    const currentTime = ws.getCurrentTime();
    const duration = ws.getDuration();
    if (!isFinite(duration) || duration === 0) return;
    const newTime = Math.max(currentTime - 30, 0);
    ws.seekTo(newTime / duration);
  };

  return { waveformRef, isPlaying, isError, togglePlay, duration, skipForward, skipBackward, audioElement };
}
