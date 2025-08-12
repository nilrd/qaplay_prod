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
      <AlertDialogContent className="w-[95%] max-w-sm sm:max-w-md mx-auto p-0 overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-card dark:via-card dark:to-card rounded-lg max-h-[90vh] overflow-y-auto">
        {/* Header com design moderno - mais compacto */}
        <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-4 sm:p-6 text-white overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-full -translate-x-10 -translate-y-10 sm:-translate-x-16 sm:-translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-full translate-x-8 translate-y-8 sm:translate-x-12 sm:translate-y-12"></div>
            <div className="absolute top-1/2 right-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full"></div>
          </div>
          
          <AlertDialogHeader className="relative z-10">
            <div className="flex items-start space-x-3 sm:space-x-4">
              {/* Foto do criador - menor em mobile */}
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/20 backdrop-blur-sm p-0.5 shadow-lg">
                  <img 
                    src="/nilson-photo.png" 
                    alt="Nilson Brites" 
                    className="w-full h-full rounded-lg object-cover border border-white/30" 
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Informações do criador - texto menor em mobile */}
              <div className="flex-1 space-y-1.5 sm:space-y-2">
                <div>
                  <AlertDialogTitle className="text-xl sm:text-2xl font-bold text-white mb-0.5">
                    Nilson Brites
                  </AlertDialogTitle>
                  <p className="text-blue-100 text-xs sm:text-sm font-medium">Quality Assurance Engineer</p>
                </div>
                
                <AlertDialogDescription className="text-white/90 text-xs leading-relaxed hidden sm:block">
                  Especialista em QA com paixão por ensinar e compartilhar conhecimento. 
                  Criador do QAPlay e entusiasta de automação de testes.
                </AlertDialogDescription>
                
                {/* Status e localização - simplificado em mobile */}
                <div className="flex items-center space-x-2 sm:space-x-3 text-xs text-blue-100">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="hidden sm:inline">Disponível</span>
                    <span className="sm:hidden">Online</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span className="hidden sm:inline">São Paulo, BR</span>
                    <span className="sm:hidden">SP</span>
                  </div>
                </div>
              </div>
            </div>
          </AlertDialogHeader>
        </div>

        {/* Conteúdo principal - espaçamento reduzido */}
        <div className="p-4 sm:p-6 bg-background/95 backdrop-blur-sm">
          {/* Seção de contatos */}
          <div className="space-y-4 sm:space-y-5">
            <div className="text-center space-y-1">
              <h3 className="text-lg font-semibold text-foreground">Vamos nos conectar!</h3>
              <p className="text-muted-foreground text-sm hidden sm:block">
                Escolha a melhor forma de entrar em contato comigo
              </p>
            </div>
            
            {/* Grid de contatos - ajustado para mobile */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <Button asChild variant="outline" size="lg" className="h-12 sm:h-14 flex-col space-y-1 sm:space-y-1.5 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md transition-all duration-300 group dark:hover:bg-blue-500/10">
                <a href="https://www.linkedin.com/in/nilsondasilvabrites/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">LinkedIn</span>
                </a>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="h-12 sm:h-14 flex-col space-y-1 sm:space-y-1.5 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all duration-300 group dark:hover:bg-gray-500/10">
                <a href="https://github.com/nilrd" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">GitHub</span>
                </a>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="h-12 sm:h-14 flex-col space-y-1 sm:space-y-1.5 hover:bg-red-50 hover:border-red-300 hover:shadow-md transition-all duration-300 group dark:hover:bg-red-500/10">
                <a href="mailto:nilson.brites@gmail.com">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">E-mail</span>
                </a>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="h-12 sm:h-14 flex-col space-y-1 sm:space-y-1.5 hover:bg-green-50 hover:border-green-300 hover:shadow-md transition-all duration-300 group dark:hover:bg-green-500/10">
                <a href="https://wa.me/5511940825120" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">WhatsApp</span>
                </a>
              </Button>
            </div>
            
            {/* Card de informações adicionais - compacto em mobile */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-500/10 p-3 sm:p-5 rounded-lg border border-blue-200/50 dark:border-blue-500/20">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md flex items-center justify-center flex-shrink-0">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
                <div className="space-y-1 sm:space-y-1.5">
                  <h4 className="font-semibold text-foreground text-sm">Sobre mim</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Sou apaixonado por Quality Assurance e educação. Criador do QAPlay, 
                    uma plataforma gamificada para ensinar QA. Sempre aberto a novas 
                    oportunidades, colaborações e conversas sobre automação de testes.
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-1 sm:space-y-0 text-xs text-muted-foreground">
                    <span>• Especialista em Automação</span>
                    <span>• Mentor QA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer elegante - mais compacto */}
        <AlertDialogFooter className="p-3 sm:p-4 bg-muted/30 border-t border-border/50">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="hidden sm:inline">Respondo em até 24h</span>
              <span className="sm:hidden">24h</span>
            </div>
            <AlertDialogCancel className="px-3 sm:px-5 py-2 font-medium hover:bg-muted transition-colors text-xs sm:text-sm">
              <X className="mr-1 sm:mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
              Fechar
            </AlertDialogCancel>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ContactDialog;

