import React from 'react';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, MessageCircle, X } from 'lucide-react';

const ContactDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="default" className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <MessageCircle className="mr-2 h-4 w-4" />
          Vamos Conversar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[96%] max-w-[480px] mx-auto p-0 overflow-hidden border-0 shadow-2xl bg-white dark:bg-card rounded-lg">
        {/* Header simplificado */}
        <AlertDialogHeader className="p-6 pb-4">
          <div className="text-center">
            <AlertDialogTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Entre em Contato
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
              Escolha a melhor forma de entrar em contato
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        {/* Grid de contatos 2x2 */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-4">
            {/* LinkedIn */}
            <Button asChild variant="outline" className="h-16 flex-col space-y-2 hover:bg-blue-50 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group">
              <a href="https://www.linkedin.com/in/nilsondasilvabrites/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-sm">LinkedIn</span>
              </a>
            </Button>
            
            {/* GitHub */}
            <Button asChild variant="outline" className="h-16 flex-col space-y-2 hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg transition-all duration-300 group">
              <a href="https://github.com/nilrd" target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-sm">GitHub</span>
              </a>
            </Button>
            
            {/* E-mail */}
            <Button asChild variant="outline" className="h-16 flex-col space-y-2 hover:bg-red-50 hover:border-red-300 hover:shadow-lg transition-all duration-300 group">
              <a href="mailto:nilson.brites@gmail.com">
                <Mail className="h-6 w-6 text-red-600 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-sm">E-mail</span>
              </a>
            </Button>
            
            {/* WhatsApp */}
            <Button asChild variant="outline" className="h-16 flex-col space-y-2 hover:bg-green-50 hover:border-green-300 hover:shadow-lg transition-all duration-300 group">
              <a href="https://wa.me/5511940825120" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-sm">WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Footer simplificado */}
        <AlertDialogFooter className="p-4 pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Respondo em até 24h</span>
            </div>
            <AlertDialogCancel className="px-4 py-2 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
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

