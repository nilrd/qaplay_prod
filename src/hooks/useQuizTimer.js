import { useState, useEffect, useRef } from 'react'

/**
 * Hook personalizado para gerenciar temporizador de quiz
 * Padroniza a lógica de tempo em todos os quizzes
 * 
 * @param {number} initialTime - Tempo inicial em segundos
 * @param {boolean} gameStarted - Se o jogo foi iniciado
 * @param {boolean} gameFinished - Se o jogo foi finalizado
 * @param {function} onTimeUp - Callback quando o tempo acabar
 * @returns {object} - Estado e funções do temporizador
 */
export const useQuizTimer = (initialTime, gameStarted, gameFinished, onTimeUp) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const timerRef = useRef(null)

  // Atualizar tempo inicial quando mudar
  useEffect(() => {
    setTimeLeft(initialTime)
  }, [initialTime])

  // Lógica do temporizador
  useEffect(() => {
    if (gameStarted && !gameFinished && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (onTimeUp) onTimeUp()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [gameStarted, gameFinished, timeLeft, onTimeUp])

  // Função para resetar o temporizador
  const resetTimer = (newTime = initialTime) => {
    setTimeLeft(newTime)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  // Função para pausar o temporizador
  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  // Função para retomar o temporizador
  const resumeTimer = () => {
    if (gameStarted && !gameFinished && timeLeft > 0 && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (onTimeUp) onTimeUp()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  return {
    timeLeft,
    resetTimer,
    pauseTimer,
    resumeTimer
  }
}

/**
 * Função utilitária para calcular tempo baseado no número de questões
 * Implementa a regra de negócio: 60 segundos por questão
 * 
 * @param {number} questionCount - Número de questões
 * @returns {number} - Tempo total em segundos
 */
export const calculateQuizTime = (questionCount) => {
  return questionCount * 60
}

/**
 * Função utilitária para formatar tempo em formato legível
 * 
 * @param {number} seconds - Tempo em segundos
 * @returns {string} - Tempo formatado (MM:SS ou HH:MM:SS)
 */
export const formatQuizTime = (seconds) => {
  if (seconds === null || seconds === undefined) return 'Livre'
  
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

/**
 * Função utilitária para obter classes CSS baseadas no tempo restante
 * 
 * @param {number} timeLeft - Tempo restante em segundos
 * @returns {string} - Classes CSS para estilização
 */
export const getTimeLeftClasses = (timeLeft) => {
  if (timeLeft <= 60 && timeLeft > 0) {
    return 'text-red-500 font-semibold animate-pulse'
  } else if (timeLeft <= 300 && timeLeft > 60) {
    return 'text-orange-500 font-semibold'
  }
  return 'text-muted-foreground'
}
