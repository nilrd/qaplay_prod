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
      {/* Hero Section - Layout Desktop Centralizado */}
      <section className="text-center py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Badge e Título Principal */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/20">
              <User className="w-4 h-4" />
              <span className="text-gray-800 dark:text-gray-200 font-semibold">por Nilson Brites</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Olá, sou Nilson Brites.<br />
              <span className="text-primary">E este é o meu convite para você.</span>
            </h1>
            
            <div className="max-w-4xl mx-auto space-y-8">
              <p className="text-xl text-muted-foreground">
                Um mergulho prático no universo de Quality Assurance, construído por quem vive isso todos os dias.
              </p>
              
              {/* Pílulas de Informação */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Pílula 1 */}
                <div className="text-center space-y-4 p-6 bg-muted/30 rounded-lg border border-border/50">
                  <div className="text-4xl">🧩</div>
                  <h3 className="text-xl font-bold text-foreground">Mais que um Portfólio</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    O QAPlay é um projeto vivo. Em vez de apenas descrever minhas habilidades, 
                    decidi construí-las em uma aplicação funcional que você pode usar e testar agora.
                  </p>
                </div>

                {/* Pílula 2 */}
                <div className="text-center space-y-4 p-6 bg-muted/30 rounded-lg border border-border/50">
                  <div className="text-4xl">🎯</div>
                  <h3 className="text-xl font-bold text-foreground">Desafie seu Conhecimento</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Teste suas habilidades com quizzes elaborados, baseados em temas essenciais de QA. 
                    Cada pergunta é uma oportunidade de aprendizado e autoavaliação.
                  </p>
                </div>

                {/* Pílula 3 */}
                <div className="text-center space-y-4 p-6 bg-muted/30 rounded-lg border border-border/50">
                  <div className="text-4xl">🛡️</div>
                  <h3 className="text-xl font-bold text-foreground">A Visão de um QA</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Cada detalhe, da validação de respostas à experiência do usuário, foi pensado com a 
                    mentalidade de um Quality Assurance. Este site é a minha forma de dizer: "Veja a qualidade que eu entrego".
                  </p>
                </div>
              </div>
              
              <p className="text-xl font-semibold text-foreground text-center">
                Vamos começar o desafio?
              </p>
            </div>
          </div>
          
          {/* Botões de Ação Melhorados */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300" asChild>
              <Link to="/quizzes">
                <Play className="mr-2 h-5 w-5" />
                Começar Desafio
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300" asChild>
              <Link to="/sobre">
                <User className="mr-2 h-5 w-5" />
                Conhecer Nilson
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300" onClick={() => setShowContactModal(true)}>
              <MessageCircle className="mr-2 h-5 w-5" />
              Entrar em Contato
            </Button>
          </div>
        </div>
      </section>

      {/* Layout Principal - Grade Simétrica de 3 Colunas */}
      <section className="max-w-7xl mx-auto px-4 py-16">
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