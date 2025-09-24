import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Linkedin, Github, MessageCircle, Instagram, Mail, Phone } from 'lucide-react'

const ContactModal = ({ isOpen, onClose }) => {
  const contactInfo = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/nilsondasilvabrites/',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/nilrd',
      color: 'text-gray-800 dark:text-gray-200',
      bgColor: 'hover:bg-gray-50 dark:hover:bg-gray-800/20'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://wa.me/5511940825120',
      color: 'text-green-600',
      bgColor: 'hover:bg-green-50 dark:hover:bg-green-900/20'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:nilson.brites@gmail.com',
      color: 'text-red-600',
      bgColor: 'hover:bg-red-50 dark:hover:bg-red-900/20'
    }
  ]

  const handleContactClick = (url) => {
    window.open(url, '_blank')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <MessageCircle className="w-5 h-5 text-primary" />
            <span>Vamos nos conectar!</span>
          </DialogTitle>
          <DialogDescription className="text-base">
            Escolha uma das formas abaixo para entrar em contato comigo.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Coluna da Esquerda: Card de Perfil */}
          <div className="flex justify-center">
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800 w-full max-w-sm">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Foto de Perfil */}
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src="/Nilson Brites1.jpg" 
                    alt="Nilson Brites" 
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 20%' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center" style={{display: 'none'}}>
                    <MessageCircle className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                {/* Informações Pessoais */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">Nilson Brites</h3>
                  <p className="text-lg text-primary font-semibold">Quality Assurance Engineer</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Coluna da Direita: Botões de Contato */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {contactInfo.map((contact) => {
                const Icon = contact.icon
                return (
                  <Card 
                    key={contact.name}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${contact.bgColor} border-0 shadow-sm`}
                    onClick={() => handleContactClick(contact.url)}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center space-y-3 text-center">
                        <Icon className={`w-8 h-8 ${contact.color} flex-shrink-0`} />
                        <div className="space-y-1">
                          <span className="font-semibold text-foreground text-base block">{contact.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {contact.name === 'WhatsApp' ? '(11) 94082-5120' : 
                             contact.name === 'Email' ? 'nilson.brites@gmail.com' : 
                             'Clique para acessar'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="flex justify-center pt-4">
              <Button variant="outline" onClick={onClose} className="px-8">
                Fechar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ContactModal
