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
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Antes de Começar</CardTitle>
          <CardDescription>
            Precisamos de algumas informações para personalizar sua experiência e gerar seu certificado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Nome Completo *</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome completo"
                value={userInfo.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin" className="flex items-center space-x-2">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn (opcional)</span>
              </Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/seu-perfil"
                value={userInfo.linkedinUrl}
                onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Será usado para compartilhamento do certificado
              </p>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg text-sm">
              <p className="text-blue-800">
                <strong>Lembre-se:</strong> Você terá 60 minutos para completar 100 questões. 
                Se minimizar o navegador ou trocar de aba, a questão atual será marcada como incorreta.
              </p>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="flex-1"
                disabled={!userInfo.name.trim()}
              >
                Iniciar Desafio
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserInfoModal

