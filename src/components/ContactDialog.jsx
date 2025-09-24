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
      <AlertDialogContent className="w-[96%] max-w-[320px] xs:max-w-sm sm:max-w-md mx-auto p-0 overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-card dark:via-card dark:to-card rounded-lg max-h-[95vh] min-h-0 overflow-y-auto">
        {/* Header com design moderno - totalmente responsivo */}
        <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-3 xs:p-4 sm:p-6 text-white overflow-hidden">
          {/* Background pattern - ajustado para mobile */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-16 h-16 xs:w-20 xs:h-20 sm:w-32 sm:h-32 bg-white rounded-full -translate-x-8 -translate-y-8 xs:-translate-x-10 xs:-translate-y-10 sm:-translate-x-16 sm:-translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 xs:w-16 xs:h-16 sm:w-24 sm:h-24 bg-white rounded-full translate-x-6 translate-y-6 xs:translate-x-8 xs:translate-y-8 sm:translate-x-12 sm:translate-y-12"></div>
            <div className="absolute top-1/2 right-1/4 w-8 h-8 xs:w-12 xs:h-12 sm:w-16 sm:h-16 bg-white rounded-full"></div>
          </div>
          
          <AlertDialogHeader className="relative z-10">
            <div className="flex items-start space-x-2 xs:space-x-3 sm:space-x-4">
              {/* Foto do criador - escalável */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-lg xs:rounded-xl bg-white/20 backdrop-blur-sm p-0.5 shadow-lg">
                  <img 
                    src="/Nilson Brites1.jpg" 
                    alt="Nilson Brites" 
                    className="w-full h-full rounded-md xs:rounded-lg object-cover border border-white/30" 
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 xs:-bottom-1 xs:-right-1 w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 bg-green-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <div className="w-0.5 h-0.5 xs:w-1 xs:h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Informações do criador - texto escalável */}
              <div className="flex-1 space-y-1 xs:space-y-1.5 sm:space-y-2 min-w-0">
                <div>
                  <AlertDialogTitle className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-0.5 leading-tight">
                    Nilson Brites
                  </AlertDialogTitle>
                  <p className="text-blue-100 text-xs sm:text-sm font-medium">Quality Assurance Engineer</p>
                </div>
                
                <AlertDialogDescription className="text-white/90 text-xs leading-relaxed hidden xs:block">
                  Quality Assurance Engineer que acredita no poder da colaboração para aprender e evoluir o conhecimento em QA.
                </AlertDialogDescription>
                
                {/* Status e localização - adaptável */}
                <div className="flex items-center space-x-2 xs:space-x-3 text-xs text-blue-100">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="hidden xs:inline">Disponível</span>
                    <span className="xs:hidden">Online</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-2.5 w-2.5 xs:h-3 xs:w-3" />
                    <span className="hidden xs:inline">São Paulo, BR</span>
                    <span className="xs:hidden">SP</span>
                  </div>
                </div>
              </div>
            </div>
          </AlertDialogHeader>
        </div>

        {/* Conteúdo principal - totalmente responsivo */}
        <div className="p-3 xs:p-4 sm:p-6 bg-background/95 backdrop-blur-sm">
          {/* Seção de contatos */}
          <div className="space-y-3 xs:space-y-4 sm:space-y-5">
            <div className="text-center space-y-1">
              <h3 className="text-base xs:text-lg font-semibold text-foreground">Vamos nos conectar!</h3>
              <p className="text-muted-foreground text-xs xs:text-sm hidden xs:block">
                Escolha a melhor forma de entrar em contato comigo
              </p>
            </div>
            
            {/* Grid de contatos - totalmente adaptável */}
            <div className="grid grid-cols-2 gap-1.5 xs:gap-2 sm:gap-3">
              <Button asChild variant="outline" size="lg" className="h-10 xs:h-12 sm:h-14 flex-col space-y-0.5 xs:space-y-1 sm:space-y-1.5 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md transition-all duration-300 group dark:hover:bg-blue-500/10 text-xs xs:text-sm">
                <a href="https://www.linkedin.com/in/nilsondasilvabrites/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">LinkedIn</span>
                </a>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="h-10 xs:h-12 sm:h-14 flex-col space-y-0.5 xs:space-y-1 sm:space-y-1.5 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all duration-300 group dark:hover:bg-gray-500/10 text-xs xs:text-sm">
                <a href="https://github.com/nilrd" target="_blank" rel="noopener noreferrer">
                  <Github className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">GitHub</span>
                </a>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="h-10 xs:h-12 sm:h-14 flex-col space-y-0.5 xs:space-y-1 sm:space-y-1.5 hover:bg-red-50 hover:border-red-300 hover:shadow-md transition-all duration-300 group dark:hover:bg-red-500/10 text-xs xs:text-sm">
                <a href="mailto:nilson.brites@gmail.com">
                  <Mail className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-red-600 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">E-mail</span>
                </a>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="h-10 xs:h-12 sm:h-14 flex-col space-y-0.5 xs:space-y-1 sm:space-y-1.5 hover:bg-green-50 hover:border-green-300 hover:shadow-md transition-all duration-300 group dark:hover:bg-green-500/10 text-xs xs:text-sm">
                <a href="https://wa.me/5511940825120" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-green-600 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">WhatsApp</span>
                </a>
              </Button>
            </div>
            
          </div>
        </div>

        {/* Footer elegante - responsivo */}
        <AlertDialogFooter className="p-2.5 xs:p-3 sm:p-4 bg-muted/30 border-t border-border/50">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-1.5 xs:space-x-2 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="hidden xs:inline">Respondo em até 24h</span>
              <span className="xs:hidden">24h</span>
            </div>
            <AlertDialogCancel className="px-2.5 xs:px-3 sm:px-5 py-1.5 xs:py-2 font-medium hover:bg-muted transition-colors text-xs">
              <X className="mr-1 xs:mr-1.5 h-3 w-3 xs:h-4 xs:w-4" />
              Fechar
            </AlertDialogCancel>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ContactDialog;

