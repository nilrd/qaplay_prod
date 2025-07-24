import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Github, Linkedin, Mail, Download, Award, Code, Users, Target, Phone, MapPin, Calendar, Briefcase, GraduationCap, Star, CheckCircle } from 'lucide-react'
import ContactDialog from "../components/ContactDialog";

const About = () => {
  const skills = [
    'Quality Assurance',
    'Analista de Testes/QA',
    'Automação de Testes',
    'Testes Funcionais',
    'Testes Unitários',
    'Testes de Integração',
    'Selenium WebDriver',
    'Cypress.io',
    'JUnit',
    'Testes Manuais',
    'Casos de Teste',
    'Java',
    'JavaScript',
    'SQL',
    'Git/GitHub',
    'BDD e Gherkin',
    'Postman',
    'Metodologias Ágeis (Scrum)'
  ]

  const experiences = [
    {
      title: 'Quality Assurance Engineer',
      company: 'Freelancer',
      period: '2023 - Presente',
      description: 'Desenvolvimento de estratégias de teste, automação com Selenium WebDriver e Cypress, implementação de testes de API e colaboração em metodologias ágeis.',
      achievements: [
        'Criação do QAPlay - plataforma gamificada de ensino de QA',
        'Implementação de frameworks de automação de testes',
        'Mentoria e treinamento de novos profissionais de QA'
      ]
    },
    {
      title: 'Analista de Testes',
      company: 'Projetos Diversos',
      period: '2022 - 2023',
      description: 'Execução de testes manuais e automatizados, validação de APIs REST/SOAP, criação de casos de teste e documentação técnica.',
      achievements: [
        'Redução de 40% no tempo de execução de testes',
        'Implementação de testes automatizados com Selenium',
        'Integração de testes com pipelines CI/CD'
      ]
    }
  ]

  const certifications = [
    {
      title: 'Certificação E2E Treinamentos',
      issuer: 'E2E Treinamentos',
      year: '2024',
      description: 'Aprimoramento contínuo em QA e Qualidade de Software'
    },
    {
      title: 'CTFL Foundation Level',
      issuer: 'ISTQB',
      year: '2023',
      description: 'Certificação internacional em fundamentos de teste de software'
    }
  ]

  const projects = [
    {
      title: 'QAPlay',
      description: 'Plataforma gamificada para ensino de Quality Assurance',
      technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js'],
      highlights: [
        '3.2k+ usuários ativos',
        '15k+ partidas jogadas',
        '100+ perguntas de QA',
        'Sistema de certificação'
      ]
    },
    {
      title: 'Framework de Automação',
      description: 'Framework personalizado para automação de testes web',
      technologies: ['Selenium', 'Java', 'TestNG', 'Maven'],
      highlights: [
        'Redução de 60% no tempo de execução',
        'Relatórios automatizados',
        'Integração com CI/CD',
        'Suporte multi-browser'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header Profissional */}
      <section className="bg-gradient-to-br from-primary/10 via-blue-50/50 to-purple-50/50 dark:from-primary/5 dark:via-blue-500/5 dark:to-purple-500/5 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Foto e Informações Básicas */}
            <div className="text-center lg:text-left space-y-6">
              <div className="mx-auto lg:mx-0 w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-primary/20 shadow-xl">
                <img 
                  src="/nilson-photo.png" 
                  alt="Nilson Brites" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-muted rounded-2xl flex items-center justify-center" style={{display: 'none'}}>
                  <Users className="h-16 w-16 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>São Paulo, Brasil</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>nilson.brites@gmail.com</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+55 (11) 94082-5120</span>
                </div>
              </div>
            </div>
            
            {/* Título e Descrição */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Nilson da Silva Brites
                </h1>
                <h2 className="text-2xl font-semibold text-primary">
                  Quality Assurance Engineer
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Profissional especializado em Quality Assurance com ampla experiência em automação de testes, 
                  metodologias ágeis e garantia de qualidade de software. Criador do QAPlay e apaixonado por 
                  compartilhar conhecimento na comunidade de QA.
                </p>
              </div>
              
              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="px-8 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                  <a href="https://drive.google.com/drive/folders/1hsVW1S1_cO3p_RiDZ9WUyc9UGowpTq4U?usp=sharing" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" />
                    Download CV Completo
                  </a>
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline" size="lg" className="hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-500/10" asChild>
                    <a href="https://www.linkedin.com/in/nilsondasilvabrites/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-5 w-5" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="hover:bg-gray-50 hover:border-gray-400 dark:hover:bg-gray-500/10" asChild>
                    <a href="https://github.com/nilrd" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-5 w-5" />
                      GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {/* Resumo Profissional */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <Briefcase className="mr-3 h-8 w-8 text-primary" />
            Resumo Profissional
          </h2>
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-500/10 border-blue-200/50 dark:border-blue-500/20">
            <CardContent className="p-8">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Quality Assurance Engineer</strong> com sólida experiência em garantir a excelência de software 
                  em todas as etapas do ciclo de desenvolvimento. Especialista em automação de testes utilizando 
                  <strong className="text-foreground"> Selenium WebDriver, Cypress, JUnit</strong> e integração com <strong className="text-foreground">Cucumber para BDD</strong>.
                </p>
                <p>
                  Experiência comprovada em <strong className="text-foreground">testes de APIs REST e SOAP</strong>, utilizando ferramentas como 
                  <strong className="text-foreground"> Postman e Swagger</strong>. Proativo na adoção de <strong className="text-foreground">metodologias ágeis (Scrum)</strong> 
                  e na promoção da cultura de <strong className="text-foreground">"shift-left testing"</strong>.
                </p>
                <p>
                  Criador do <strong className="text-foreground">QAPlay</strong>, plataforma gamificada que democratiza o ensino de Quality Assurance, 
                  demonstrando paixão por educação e compartilhamento de conhecimento na comunidade de QA.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Experiência Profissional */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <Briefcase className="mr-3 h-8 w-8 text-primary" />
            Experiência Profissional
          </h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-xl text-foreground">{exp.title}</CardTitle>
                      <CardDescription className="text-lg font-medium text-primary">{exp.company}</CardDescription>
                    </div>
                    <Badge variant="outline" className="mt-2 md:mt-0 w-fit">
                      <Calendar className="mr-1 h-3 w-3" />
                      {exp.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{exp.description}</p>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Principais Conquistas:</h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Projetos Destacados */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <Code className="mr-3 h-8 w-8 text-primary" />
            Projetos Destacados
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Tecnologias:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Destaques:</h4>
                    <ul className="space-y-1">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Star className="h-3 w-3 text-yellow-500 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Certificações */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <GraduationCap className="mr-3 h-8 w-8 text-primary" />
            Certificações e Formação
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-foreground">{cert.title}</CardTitle>
                      <CardDescription className="font-medium text-primary">{cert.issuer}</CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {cert.year}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Habilidades Técnicas */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <Target className="mr-3 h-8 w-8 text-primary" />
            Habilidades Técnicas
          </h2>
          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Automação de Testes</h3>
                  <div className="space-y-2">
                    {['Selenium WebDriver', 'Cypress.io', 'JUnit', 'TestNG'].map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="mr-2 mb-2">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Linguagens & Ferramentas</h3>
                  <div className="space-y-2">
                    {['Java', 'JavaScript', 'SQL', 'Git/GitHub', 'Postman'].map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="mr-2 mb-2">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Metodologias</h3>
                  <div className="space-y-2">
                    {['Scrum', 'BDD/Gherkin', 'Shift-Left Testing', 'CI/CD'].map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="mr-2 mb-2">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* QAPlay - Projeto Pessoal */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <Award className="mr-3 h-8 w-8 text-primary" />
            QAPlay - Meu Projeto de Impacto
          </h2>
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-500/10 dark:to-blue-500/10 border-green-200/50 dark:border-green-500/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">Democratizando o Ensino de QA</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    O QAPlay nasceu da minha paixão por educação e da necessidade de tornar o aprendizado 
                    de Quality Assurance mais acessível. É uma plataforma 100% gratuita que utiliza 
                    gamificação para ensinar conceitos fundamentais de testes de software.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">3.2k+</div>
                      <div className="text-sm text-muted-foreground">Usuários Ativos</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">15k+</div>
                      <div className="text-sm text-muted-foreground">Partidas Jogadas</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Recursos da Plataforma:</h4>
                  <ul className="space-y-2">
                    {[
                      'Quiz interativo com 100+ perguntas',
                      'Sistema de treinamento baseado no CTFL 4.0',
                      'Certificados personalizados',
                      'Desafios de programação e automação',
                      'Interface responsiva e acessível'
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-muted/30 rounded-2xl p-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Vamos Trabalhar Juntos?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estou sempre aberto a novas oportunidades, colaborações e conversas sobre Quality Assurance. 
              Entre em contato para discutirmos como posso contribuir com seu projeto ou equipe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ContactDialog />
              <Button variant="outline" size="lg" className="px-8" asChild>
                <a href="https://drive.google.com/drive/folders/1hsVW1S1_cO3p_RiDZ9WUyc9UGowpTq4U?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About


