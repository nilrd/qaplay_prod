import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone, MessageCircle, X, MapPin, Clock, Star } from 'lucide-react';

const ContactDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="default" className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <MessageCircle className="mr-2 h-4 w-4" />
          Vamos Conversar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl mx-auto p-0 overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-card dark:via-card dark:to-card">
        {/* Header com design moderno */}
        <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 text-white overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white rounded-full"></div>
          </div>
          
          <AlertDialogHeader className="relative z-10">
            <div className="flex items-start space-x-6">
              {/* Foto do criador */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm p-1 shadow-xl">
                  <img 
                    src="/nilson-photo.png" 
                    alt="Nilson Brites" 
                    className="w-full h-full rounded-xl object-cover border-2 border-white/30" 
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Informações do criador */}
              <div className="flex-1 space-y-3">
                <div>
                  <AlertDialogTitle className="text-3xl font-bold text-white mb-1">
                    Nilson Brites
                  </AlertDialogTitle>
                  <p className="text-blue-100 font-medium">Quality Assurance Engineer</p>
                </div>
                
                <AlertDialogDescription className="text-white/90 text-sm leading-relaxed">
                  Especialista em QA com paixão por ensinar e compartilhar conhecimento. 
                  Criador do QAPlay e entusiasta de automação de testes.
                </AlertDialogDescription>
                
                {/* Status e localização */}
                <div className="flex items-center space-x-4 text-sm text-blue-100">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Disponível</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>São Paulo, BR</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>GMT-3</span>
                  </div>
                </div>
              </div>
            </div>
          </AlertDialogHeader>
        </div>

        {/* Conteúdo principal */}
        <div className="p-8 bg-background/95 backdrop-blur-sm">
          {/* Seção de contatos */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-foreground">Vamos nos conectar!</h3>
              <p className="text-muted-foreground text-sm">
                Escolha a melhor forma de entrar em contato comigo
              </p>
            </div>
            
            {/* Grid de contatos */}
            <div className="grid grid-cols-2 gap-4">
              <Button asChild variant="outline" size="lg" className="h-16 flex-col space-y-2 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md transition-all duration-300 group dark:hover:bg-blue-500/10">
                <a href="https://www.linkedin.com/in/nilsondasilvabrites/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="h-16 flex-col space-y-2 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all duration-300 group dark:hover:bg-gray-500/10">
                <a href="https://github.com/nilrd" target="_blank" rel="noopener noreferrer">
                  <Github className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">GitHub</span>
                </a>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="h-16 flex-col space-y-2 hover:bg-red-50 hover:border-red-300 hover:shadow-md transition-all duration-300 group dark:hover:bg-red-500/10">
                <a href="mailto:nilson.brites@gmail.com">
                  <Mail className="h-6 w-6 text-red-600 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">E-mail</span>
                </a>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="h-16 flex-col space-y-2 hover:bg-green-50 hover:border-green-300 hover:shadow-md transition-all duration-300 group dark:hover:bg-green-500/10">
                <a href="https://wa.me/5511940825120" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">WhatsApp</span>
                </a>
              </Button>
            </div>
            
            {/* Card de informações adicionais */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-500/10 p-6 rounded-xl border border-blue-200/50 dark:border-blue-500/20">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Sobre mim</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Sou apaixonado por Quality Assurance e educação. Criador do QAPlay, 
                    uma plataforma gamificada para ensinar QA. Sempre aberto a novas 
                    oportunidades, colaborações e conversas sobre automação de testes.
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>• Especialista em Automação</span>
                    <span>• CTFL Certified</span>
                    <span>• Mentor QA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer elegante */}
        <AlertDialogFooter className="p-6 bg-muted/30 border-t border-border/50">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Respondo em até 24h</span>
            </div>
            <AlertDialogCancel className="px-6 font-medium hover:bg-muted transition-colors">
              <X className="mr-2 h-4 w-4" />
              Fechar
            </AlertDialogCancel>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ContactDialog;

