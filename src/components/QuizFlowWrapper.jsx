import { useQuizFlow } from '@/hooks/useQuizFlow'
import QuizConfigModal from '@/components/QuizConfigModal'
import UserInfoModal from '@/components/UserInfoModal'
import CertificateModal from '@/components/CertificateModal'

const QuizFlowWrapper = ({ 
  quizTitle, 
  children, 
  onQuizStart, 
  onUserInfoSubmit,
  onShowCertificate,
  score,
  onShareLinkedIn 
}) => {
  const {
    showConfigModal,
    showUserModal,
    showCertificate,
    quizConfigured,
    userInfo,
    totalQuestions,
    totalTime,
    handleQuizStart,
    handleUserInfoSubmit,
    handleClose,
    restartFlow,
    showCertificateModal,
    setShowCertificate
  } = useQuizFlow(quizTitle)

  // Se o quiz não foi configurado ainda, mostrar apenas o modal de configuração
  if (!quizConfigured) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <QuizConfigModal
          isOpen={showConfigModal}
          onClose={handleClose}
          onStart={handleQuizStart}
          quizTitle={quizTitle}
        />
      </div>
    )
  }

  // Se o quiz foi configurado mas o usuário ainda não inseriu as informações, mostrar o modal de usuário
  if (quizConfigured && !userInfo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <UserInfoModal
          onStart={(info) => {
            const success = handleUserInfoSubmit(info)
            if (success && onUserInfoSubmit) {
              onUserInfoSubmit(info)
            }
          }}
          onClose={() => {
            handleClose()
            if (onUserInfoSubmit) {
              onUserInfoSubmit(null)
            }
          }}
        />
      </div>
    )
  }

  // Renderizar o conteúdo do quiz com os modais
  return (
    <>
      {children}
      
      {/* Modais */}
      {showUserModal && (
        <UserInfoModal
          onStart={(info) => {
            const success = handleUserInfoSubmit(info)
            if (success && onUserInfoSubmit) {
              onUserInfoSubmit(info)
            }
          }}
          onClose={() => {
            setShowUserModal(false)
            if (onUserInfoSubmit) {
              onUserInfoSubmit(null)
            }
          }}
        />
      )}

      {showCertificate && userInfo && (
        <CertificateModal
          isOpen={showCertificate}
          onClose={() => setShowCertificate(false)}
          fullName={userInfo.fullName || ''}
          score={score || 0}
          totalQuestions={totalQuestions || 1}
          linkedinProfile={userInfo.linkedinUrl || ''}
        />
      )}
    </>
  )
}

export default QuizFlowWrapper
