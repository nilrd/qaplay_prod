import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useQuizFlow = (quizTitle, onQuizStartCallback) => {
  const navigate = useNavigate()
  
  // Estados dos modais
  const [showConfigModal, setShowConfigModal] = useState(true)
  const [showUserModal, setShowUserModal] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)
  
  // Estados do quiz
  const [quizConfigured, setQuizConfigured] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [totalQuestions, setTotalQuestions] = useState(20)
  const [totalTime, setTotalTime] = useState(20 * 60)
  
  // Função para iniciar o quiz com configurações
  const handleQuizStart = (questionCount, timeInSeconds) => {
    setTotalQuestions(questionCount)
    setTotalTime(timeInSeconds)
    setQuizConfigured(true)
    setShowConfigModal(false)
    setShowUserModal(true) // Mostrar modal de usuário após configuração
    
    // Chamar a função callback se fornecida
    if (onQuizStartCallback) {
      onQuizStartCallback(questionCount, timeInSeconds)
    }
  }

  // Função para lidar com informações do usuário
  const handleUserInfoSubmit = (info) => {
    setUserInfo(info)
    setShowUserModal(false)
    return true // Indica que o quiz pode começar
  }

  // Função para fechar modais e voltar
  const handleClose = () => {
    setShowConfigModal(false)
    setShowUserModal(false)
    setShowCertificate(false)
    navigate('/quizzes')
  }

  // Função para reiniciar o fluxo
  const restartFlow = () => {
    setQuizConfigured(false)
    setShowConfigModal(true)
    setShowUserModal(false)
    setShowCertificate(false)
    setUserInfo(null)
  }

  // Função para mostrar certificado
  const showCertificateModal = () => {
    setShowCertificate(true)
  }

  return {
    // Estados dos modais
    showConfigModal,
    showUserModal,
    showCertificate,
    quizConfigured,
    userInfo,
    totalQuestions,
    totalTime,
    
    // Funções
    handleQuizStart,
    handleUserInfoSubmit,
    handleClose,
    restartFlow,
    showCertificateModal,
    
    // Setters para controle direto quando necessário
    setShowConfigModal,
    setShowUserModal,
    setShowCertificate,
    setUserInfo
  }
}
