'use client';

import { useSpeechRecognition } from './speech-widget-context';
import { Selectable } from '@/components/playground/core/selectable';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Mic,
  Square,
  Pause,
  Play,
  X
} from 'lucide-react';

export function SpeechWidget() {
  const {
    isListening,
    transcript,
    interimTranscript,
    error,
    stopListening,
    resetTranscript,
    startListening
  } = useSpeechRecognition();
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pausedTranscript, setPausedTranscript] = useState('');

  useEffect(() => {
    if (isListening || transcript) {
      setIsVisible(true);
    }
  }, [isListening, transcript]);

  // Handle when recognition stops - smooth transition
  useEffect(() => {
    if (!isListening && transcript && !isPaused) {
      setIsProcessing(true);
      const timer = setTimeout(() => {
        setIsProcessing(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isListening, transcript, isPaused]);

  const handleCancel = () => {
    stopListening();
    resetTranscript();
    setPausedTranscript('');
    setIsVisible(false);
    setIsPaused(false);
    setIsProcessing(false);
  };

  const handleStop = () => {
    stopListening();
    setIsPaused(false);
    // Transcript will be finalized automatically by Web Speech API
  };

  const handlePauseResume = () => {
    if (isPaused) {
      // Resume: start listening again
      setPausedTranscript(transcript); // Keep the paused transcript
      startListening();
      setIsPaused(false);
    } else {
      // Pause: stop listening but keep transcript
      stopListening();
      setPausedTranscript(transcript);
      setIsPaused(true);
    }
  };

  const displayTranscript = isPaused ? pausedTranscript : transcript;

  if (!isVisible && !isListening) {
    return null;
  }

  return (
    <motion.div
      className='fixed inset-0 z-[90] flex items-center justify-center pointer-events-none'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className='pointer-events-auto w-96 rounded-3xl bg-white p-8 shadow-2xl'
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Header with icon */}
        <div className='mb-6 flex items-center justify-center gap-3'>
          <motion.div
            animate={isListening && !isPaused ? { scale: [1, 1.2, 1] } : {}}
            transition={{
              duration: 0.6,
              repeat: isListening && !isPaused ? Infinity : 0
            }}
          >
            <Mic 
              className={`size-8 transition-colors ${
                isListening && !isPaused
                  ? 'text-red-500'
                  : isPaused
                    ? 'text-amber-500'
                    : isProcessing
                      ? 'text-blue-500'
                      : 'text-gray-500'
              }`}
            />
          </motion.div>
          <h2 className='text-3xl font-bold text-gray-800'>
            {isListening && !isPaused
              ? 'Listening...'
              : isPaused
                ? 'Paused'
                : isProcessing
                  ? 'Processing...'
                  : 'Speech Recognition'}
          </h2>
        </div>

        {/* Listening animation bars */}
        <AnimatePresence>
          {isListening && !isPaused && (
            <motion.div
              className='mb-6 flex justify-center gap-2 h-10'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className='w-2 rounded-full bg-red-500'
                  animate={{ height: ['24px', '40px', '24px'] }}
                  transition={{
                    duration: 0.4,
                    repeat: Infinity,
                    delay: i * 0.08
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status indicator */}
        <motion.div 
          className='mb-6 text-center h-10'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <p className='text-sm font-semibold text-gray-500 uppercase tracking-wide'>
            {isListening && !isPaused
              ? '🎤 Recording...'
              : isPaused
                ? '⏸️ Paused - Ready to Resume'
                : isProcessing
                  ? '⏳ Processing speech...'
                  : displayTranscript
                    ? '✓ Done'
                    : '○ Ready'}
          </p>
        </motion.div>

        {/* Interim transcript */}
        <AnimatePresence>
          {interimTranscript && !isPaused && (
            <motion.div
              className='mb-4 rounded-lg bg-blue-50 p-4 border-l-4 border-blue-400'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <p className='text-lg italic text-blue-700'>{interimTranscript}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final/Paused transcript */}
        <AnimatePresence>
          {displayTranscript && (
            <motion.div
              className='mb-6 min-h-20 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 p-4 border border-emerald-200'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <p className='text-2xl font-semibold text-gray-800 leading-relaxed'>
                {displayTranscript}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              className='mb-6 rounded-lg bg-red-50 p-4 border border-red-200'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <p className='text-lg text-red-700 font-medium'>
                ⚠️ Error: {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Control buttons */}
        <motion.div 
          className='flex gap-3 justify-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Pause/Resume button - show when listening OR paused */}
          {(isListening || isPaused) && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Selectable
                onPrimaryPress={handlePauseResume}
                className='rounded-full bg-amber-400 p-4 flex items-center justify-center hover:bg-amber-500 transition-colors shadow-lg'
              >
                {isPaused ? (
                  <Play className='size-6 text-white' />
                ) : (
                  <Pause className='size-6 text-white' />
                )}
              </Selectable>
            </motion.div>
          )}

          {/* Stop button - only show when actively listening */}
          {isListening && !isPaused && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Selectable
                onPrimaryPress={handleStop}
                className='rounded-full bg-orange-500 p-4 flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg'
              >
                <Square className='size-6 text-white' />
              </Selectable>
            </motion.div>
          )}

          {/* Cancel button */}
          <Selectable
            onPrimaryPress={handleCancel}
            className='rounded-full bg-red-500 p-4 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg'
          >
            <X className='size-6 text-white' />
          </Selectable>
        </motion.div>

        {/* Helper text */}
        <motion.p 
          className='mt-6 text-center text-xs text-gray-400'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {isPaused
            ? 'Click Play to resume or X to cancel'
            : 'Speak clearly and naturally. Click stop when done.'}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
