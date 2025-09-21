import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User, Linkedin } from 'lucide-react'

const UserInfoModal = ({ onStart, onClose }) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    linkedinUrl: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userInfo.name.trim()) {
      onStart(userInfo)
    }
  }

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden modal-container">
        <CardHeader className="flex-shrink-0 text-center space-y-2">
          <CardTitle className="text-xl">Antes de Começar</CardTitle>
          <CardDescription className="text-sm modal-description">
            Precisamos de algumas informações para personalizar sua experiência e gerar seu certificado
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto space-y-4 pr-1">
          <form id="user-info-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-2 text-sm">
                <User className="w-4 h-4" />
                <span>Nome Completo *</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome completo"
                value={userInfo.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                autoComplete="name"
                required
                className="w-full text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin" className="flex items-center space-x-2 text-sm">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn (opcional)</span>
              </Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/seu-perfil"
                value={userInfo.linkedinUrl}
                onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                autoComplete="url"
                className="w-full text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Será usado para compartilhamento do certificado
              </p>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg text-xs">
              <p className="text-blue-800">
                <strong>Lembre-se:</strong> Você terá 60 minutos para completar 100 questões. 
                Se minimizar o navegador ou trocar de aba, a questão atual será marcada como incorreta.
              </p>
            </div>

          </form>
        </CardContent>
        
        {/* Rodapé fixo com botões de ação */}
        <div className="flex-shrink-0 p-6 pt-4 border-t border-border modal-footer">
          <div className="flex space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="flex-1 text-sm"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              form="user-info-form"
              className="flex-1 text-sm"
              disabled={!userInfo.name.trim()}
            >
              Iniciar Desafio
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default UserInfoModal

