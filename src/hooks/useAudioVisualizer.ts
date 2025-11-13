import { useEffect, useRef } from 'react';

interface UseAudioVisualizerProps {
  isPlaying: boolean;
  audioElement?: HTMLMediaElement | null;
}

export default function useAudioVisualizer({ isPlaying, audioElement }: UseAudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    if (!audioElement || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw initial static bars with random heights
    const drawInitial = () => {
      const barWidth = 3;
      const barGap = 8;
      const barCount = Math.floor(canvas.width / (barWidth + barGap));
      const centerY = canvas.height / 2;
      const centerX = canvas.width / 2;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#2b2c52';

      for (let i = 0; i < Math.floor(barCount / 2); i++) {
        // Create random, messy wave pattern that looks like real audio (2-30px total)
        const amplitude = 1 + Math.random() * 14; // Random between 1-15px each side

        const xRight = centerX + i * (barWidth + barGap);

        // Top half
        ctx.beginPath();
        ctx.moveTo(xRight, centerY);
        ctx.lineTo(xRight, centerY - amplitude + barWidth / 2);
        ctx.arcTo(xRight, centerY - amplitude, xRight + barWidth, centerY - amplitude, barWidth / 2);
        ctx.lineTo(xRight + barWidth, centerY - amplitude + barWidth / 2);
        ctx.lineTo(xRight + barWidth, centerY);
        ctx.fill();

        // Bottom half
        ctx.beginPath();
        ctx.moveTo(xRight, centerY);
        ctx.lineTo(xRight, centerY + amplitude - barWidth / 2);
        ctx.arcTo(xRight, centerY + amplitude, xRight + barWidth, centerY + amplitude, barWidth / 2);
        ctx.lineTo(xRight + barWidth, centerY + amplitude - barWidth / 2);
        ctx.lineTo(xRight + barWidth, centerY);
        ctx.fill();

        // Mirror to left
        const xLeft = centerX - (i + 1) * (barWidth + barGap);

        // Top half
        ctx.beginPath();
        ctx.moveTo(xLeft, centerY);
        ctx.lineTo(xLeft, centerY - amplitude + barWidth / 2);
        ctx.arcTo(xLeft, centerY - amplitude, xLeft + barWidth, centerY - amplitude, barWidth / 2);
        ctx.lineTo(xLeft + barWidth, centerY - amplitude + barWidth / 2);
        ctx.lineTo(xLeft + barWidth, centerY);
        ctx.fill();

        // Bottom half
        ctx.beginPath();
        ctx.moveTo(xLeft, centerY);
        ctx.lineTo(xLeft, centerY + amplitude - barWidth / 2);
        ctx.arcTo(xLeft, centerY + amplitude, xLeft + barWidth, centerY + amplitude, barWidth / 2);
        ctx.lineTo(xLeft + barWidth, centerY + amplitude - barWidth / 2);
        ctx.lineTo(xLeft + barWidth, centerY);
        ctx.fill();
      }
    };

    // Set canvas size to match container
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = 80; // Fixed height

      // Redraw initial waves after resize (when paused)
      if (!isPlaying) {
        drawInitial();
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create audio context and analyser
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;

      try {
        sourceRef.current = audioContextRef.current.createMediaElementSource(audioElement);
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      } catch (e) {
        // Source already connected
        // eslint-disable-next-line no-console
        console.warn('Audio source already connected', e);
      }
    }

    // Resume audio context on user interaction
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!isPlaying) return;

      animationFrameRef.current = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate dimensions
      const barWidth = 3;
      const barGap = 8;
      const barCount = Math.floor(canvas.width / (barWidth + barGap));
      const centerY = canvas.height / 2;
      const centerX = canvas.width / 2;

      // Set blue color for all bars
      ctx.fillStyle = '#2b2c52';

      // Use only first 20% of frequency data (more focused on active lower frequencies)
      const activeBufferLength = Math.floor(bufferLength * 0.2);

      for (let i = 0; i < Math.floor(barCount / 2); i++) {
        // Map bars to the more active frequency range and repeat pattern
        // Create repeating pattern by using modulo to cycle through active frequencies
        const patternRepeat = 10; // Repeat pattern every 10 bars
        const dataIndex = Math.floor(((i % patternRepeat) / patternRepeat) * activeBufferLength);
        const maxHeight = 30; // Max 60px total height (30px each side)
        const rawAmplitude = (dataArray[dataIndex] / 255) * maxHeight;

        // Add slight variation to minimum height for more organic movement
        const minHeight = 1 + Math.random() * 0.5; // Min 2px total (1px each side)
        const amplitude = Math.max(rawAmplitude, minHeight);

        // Draw bars spreading from center to right
        const xRight = centerX + i * (barWidth + barGap);

        // Top half (rounded at top only)
        ctx.beginPath();
        ctx.moveTo(xRight, centerY);
        ctx.lineTo(xRight, centerY - amplitude + barWidth / 2);
        ctx.arcTo(xRight, centerY - amplitude, xRight + barWidth, centerY - amplitude, barWidth / 2);
        ctx.lineTo(xRight + barWidth, centerY - amplitude + barWidth / 2);
        ctx.lineTo(xRight + barWidth, centerY);
        ctx.fill();

        // Bottom half (rounded at bottom only)
        ctx.beginPath();
        ctx.moveTo(xRight, centerY);
        ctx.lineTo(xRight, centerY + amplitude - barWidth / 2);
        ctx.arcTo(xRight, centerY + amplitude, xRight + barWidth, centerY + amplitude, barWidth / 2);
        ctx.lineTo(xRight + barWidth, centerY + amplitude - barWidth / 2);
        ctx.lineTo(xRight + barWidth, centerY);
        ctx.fill();

        // Draw bars spreading from center to left (mirror)
        const xLeft = centerX - (i + 1) * (barWidth + barGap);

        // Top half (rounded at top only)
        ctx.beginPath();
        ctx.moveTo(xLeft, centerY);
        ctx.lineTo(xLeft, centerY - amplitude + barWidth / 2);
        ctx.arcTo(xLeft, centerY - amplitude, xLeft + barWidth, centerY - amplitude, barWidth / 2);
        ctx.lineTo(xLeft + barWidth, centerY - amplitude + barWidth / 2);
        ctx.lineTo(xLeft + barWidth, centerY);
        ctx.fill();

        // Bottom half (rounded at bottom only)
        ctx.beginPath();
        ctx.moveTo(xLeft, centerY);
        ctx.lineTo(xLeft, centerY + amplitude - barWidth / 2);
        ctx.arcTo(xLeft, centerY + amplitude, xLeft + barWidth, centerY + amplitude, barWidth / 2);
        ctx.lineTo(xLeft + barWidth, centerY + amplitude - barWidth / 2);
        ctx.lineTo(xLeft + barWidth, centerY);
        ctx.fill();
      }
    };

    // Draw initial static state
    drawInitial();

    if (isPlaying) {
      draw();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, audioElement]);

  return { canvasRef };
}
