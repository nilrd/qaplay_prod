import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/dialog'
import { Button } from '@components/ui/button'
import { Card, CardContent } from '@components/ui/card'
import { MessageCircle, Mail, Bug, AlertTriangle } from 'lucide-react'

const BugReportModal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Olá! Encontrei um bug no QAPlay e gostaria de reportar:")
    window.open(`https://wa.me/5511940825120?text=${message}`, '_blank')
    setIsOpen(false)
  }

  const handleEmailClick = () => {
    const subject = encodeURIComponent("Bug Report - QAPlay")
    const body = encodeURIComponent("Olá Nilson,\n\nEncontrei um bug no QAPlay:\n\nDescrição do problema:\n\nPassos para reproduzir:\n\nResultado esperado:\n\nResultado atual:\n\nObrigado!")
    window.open(`mailto:nilson.brites@gmail.com?subject=${subject}&body=${body}`, '_blank')
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Bug className="h-5 w-5 text-orange-500" />
            Reportar Bug
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto" />
            <p className="text-sm text-muted-foreground">
              Encontrou algum problema? Nos ajude a melhorar reportando o bug!
            </p>
          </div>

          <div className="space-y-3">
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleWhatsAppClick}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">WhatsApp</h3>
                    <p className="text-xs text-muted-foreground">(11) 94082-5120</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleEmailClick}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">E-mail</h3>
                    <p className="text-xs text-muted-foreground">nilson.brites@gmail.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Escolha uma das opções acima para reportar o bug
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BugReportModal
