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
      color: 'text-blue-600 hover:text-blue-700',
      bgColor: 'hover:bg-blue-50'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/nilrd',
      color: 'text-gray-800 hover:text-gray-900',
      bgColor: 'hover:bg-gray-50'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://wa.me/5511940825120',
      color: 'text-green-600 hover:text-green-700',
      bgColor: 'hover:bg-green-50'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/nilsbrites',
      color: 'text-pink-600 hover:text-pink-700',
      bgColor: 'hover:bg-pink-50'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:nilson.brites@gmail.com',
      color: 'text-red-600 hover:text-red-700',
      bgColor: 'hover:bg-red-50'
    },
    {
      name: 'Telefone',
      icon: Phone,
      url: 'tel:+5511940825120',
      color: 'text-purple-600 hover:text-purple-700',
      bgColor: 'hover:bg-purple-50'
    }
  ]

  const handleContactClick = (url) => {
    window.open(url, '_blank')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <MessageCircle className="w-5 h-5 text-primary" />
            <span>Entre em Contato</span>
          </DialogTitle>
          <DialogDescription className="text-base">
            Vamos conversar! Escolha uma das formas abaixo para entrar em contato comigo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {contactInfo.map((contact) => {
              const Icon = contact.icon
              return (
                <Card 
                  key={contact.name}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${contact.bgColor} border-0 shadow-sm`}
                  onClick={() => handleContactClick(contact.url)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 ${contact.color} flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-foreground text-sm block">{contact.name}</span>
                        <span className="text-xs text-muted-foreground truncate">
                          {contact.name === 'WhatsApp' || contact.name === 'Telefone' ? '(11) 94082-5120' : 
                           contact.name === 'Email' ? 'nilson.brites@gmail.com' :
                           contact.name === 'Instagram' ? '@nilsbrites' : 'Clique para acessar'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="pt-3 border-t">
            <p className="text-sm text-muted-foreground text-center">
              Prefere enviar um email? Use o botão acima ou envie para{' '}
              <span className="font-semibold text-foreground">nilson.brites@gmail.com</span>
            </p>
          </div>

          <div className="flex justify-center pt-2">
            <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ContactModal
