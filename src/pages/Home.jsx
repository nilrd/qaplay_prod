import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Play, Trophy, Users, BookOpen, Target, Gamepad2, User, Award, Code, Lightbulb, ArrowRight, Star, Clock, CheckCircle, MessageCircle } from 'lucide-react'
import ContactModal from '@/components/ContactModal'

const Home = () => {
  const [showContactModal, setShowContactModal] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Layout de Duas Colunas */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            
            {/* Coluna da Esquerda: Apresentação de Nilson Brites */}
            <div className="flex flex-col flex-1">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800 h-full flex flex-col">
                {/* Conteúdo Principal */}
                <div className="flex flex-col items-center text-center space-y-4 flex-grow">
                  {/* Foto de Perfil */}
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src="/Nilson Brites1 (3).png" 
                      alt="Nilson Brites" 
                      className="w-full h-full object-cover object-center object-top"
                      style={{ objectPosition: 'center 20%' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center" style={{display: 'none'}}>
                      <User className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  {/* Informações Pessoais */}
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">Nilson Brites</h2>
                    <p className="text-lg text-primary font-semibold">Quality Assurance Engineer</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Quality Assurance Engineer que acredita no poder da colaboração para aprender e evoluir o conhecimento em QA.
                    </p>
                  </div>
                </div>
                
                {/* Botão de Ação - Posicionado na base */}
                <Button asChild size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mt-auto">
                  <Link to="/sobre">
                    <User className="mr-2 h-5 w-5" />
                    Ver Perfil Completo
                  </Link>
                </Button>
              </Card>
            </div>

            {/* Coluna da Direita: Apresentação do QAPlay */}
            <div className="flex flex-col flex-1">
              <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800 h-full flex flex-col">
                {/* Conteúdo Principal */}
                <div className="flex flex-col space-y-4 flex-grow">
                  {/* Título e Descrição */}
                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                      Bem-vindo ao <span className="text-primary">QAPlay</span>
                    </h1>
                    
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      Uma plataforma de desafios para profissionais de QA, desenvolvida como um projeto de portfólio para demonstrar habilidades práticas em automação e qualidade de software.
                    </p>
                  </div>

                  {/* Destaques com Ícones */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground">Desafios Práticos</h3>
                        <p className="text-muted-foreground text-sm">Quizzes elaborados com base em cenários e documentações reais.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground">Feedback Imediato</h3>
                        <p className="text-muted-foreground text-sm">Explicações detalhadas para cada questão, correta ou incorreta.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground">Valide sua Expertise</h3>
                        <p className="text-muted-foreground text-sm">Meça seu conhecimento e identifique pontos de aprimoramento.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botão de Ação Principal - Posicionado na base */}
                <Button size="lg" className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 mt-auto" asChild>
                  <Link to="/quizzes">
                    <Play className="mr-2 h-5 w-5" />
                    Começar um Desafio
                  </Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Layout Principal - Grade Simétrica de 3 Colunas */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Sobre Mim */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300 h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-xl text-foreground">Sobre Mim</CardTitle>
                  <CardDescription className="text-muted-foreground">Quality Assurance Engineer</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col h-full">
              <p className="text-muted-foreground leading-relaxed flex-grow">
                Quality Assurance Engineer apaixonado por ensinar e compartilhar conhecimento. 
                Especialista em automação de testes e metodologias ágeis.
              </p>
              <Button asChild className="w-full mt-auto">
                <Link to="/sobre">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Ver Currículo Completo
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Card 2: Desafio Principal CTFL 4.0 */}
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800 hover:shadow-lg transition-all duration-300 h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-foreground">Desafio de Conhecimento QA</CardTitle>
                  <CardDescription className="text-muted-foreground">CTFL 4.0 - O ponto de partida ideal</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col h-full">
              <p className="text-muted-foreground leading-relaxed flex-grow">
                Teste seus fundamentos de Quality Assurance baseado no syllabus oficial CTFL 4.0 
                e avalie seu nível com feedback detalhado.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">Baseado no CTFL 4.0</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">Feedback detalhado</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">Certificado personalizado</span>
                </div>
              </div>
              <Button asChild className="w-full mt-auto bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white">
                <Link to="/jogos/ctfl-100-quiz">
                  <Play className="mr-2 h-4 w-4" />
                  🚀 Iniciar Desafio Principal
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Card 3: Explore Outros Quizzes */}
          <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300 h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-foreground">Mestre da Automação e Mais</CardTitle>
                  <CardDescription className="text-muted-foreground">Pronto para o próximo nível?</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col h-full">
              <p className="text-muted-foreground leading-relaxed flex-grow">
                Aprofunde seus conhecimentos em frameworks de automação, boas práticas e 
                outras ferramentas essenciais do mercado.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">Page Object Model</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">Cucumber & BDD</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">Boas Práticas</span>
                </div>
              </div>
              <Button asChild className="w-full mt-auto bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                <Link to="/quizzes">
                  <Gamepad2 className="mr-2 h-4 w-4" />
                  🎮 Ver todos os Quizzes
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Modal de Contato */}
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </div>
  )
}

export default Home