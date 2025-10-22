import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import { Button } from '@components/ui/button'
import { Badge } from '@components/ui/badge'
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
    'Playwright',
    'Cypress',
    'JUnit',
    'Testes Manuais',
    'Casos de Teste',
    'Java',
    'JavaScript',
    'SQL',
    'MySQL',
    'Git/GitHub',
    'BDD e Gherkin',
    'Postman',
    'Jira',
    'Qase',
    'Metodologias Ágeis (Scrum)'
  ]

  const experiences = [
    {
      title: 'Analista de Testes de Software',
      company: 'E2E Coders',
      period: '05/2022 - atual',
      description: 'Planejamento e execução de testes manuais e automatizados, com foco na qualidade e no cumprimento de requisitos técnicos e funcionais. Desenvolvimento de scripts de testes em Step by Step e Gherkin, garantindo a cobertura total dos cenários de teste.',
      achievements: [
        'Estimativa e priorização de casos de teste para otimizar os processos de qualidade',
        'Utilização de técnicas de testes como caixa preta, caixa branca, particionamento de equivalência, análise de valor limite, tabela de decisão e transição de estados',
        'Automação de testes com Java, utilizando frameworks como Selenium, Cucumber e Junit',
        'Organização de pacotes seguindo o padrão Page Objects para melhorar a estrutura e manutenção do código',
        'Realização de testes de API com Postman e abertura, reteste e acompanhamento de bugs na ferramenta JIRA',
        'Gestão de repositórios de testes automatizados no Git e GitHub',
        'Preparação de ambiente de teste em servidor Localhost para garantir o isolamento e controle do ambiente de execução dos testes'
      ]
    }
  ]

  const certifications = [
    {
      title: 'Certificação em Qualidade de Software e Lógica de Programação',
      issuer: 'E2E Treinamentos',
      year: '2024',
      description: 'Certificação especializada em Quality Assurance e desenvolvimento de lógica de programação'
    },
    {
      title: 'Formação Back-end Oracle Next Education',
      issuer: 'Alura',
      year: '2023',
      description: 'Formação completa em desenvolvimento back-end'
    },
    {
      title: 'Formação: Iniciante em Programação',
      issuer: 'Alura',
      year: '2023',
      description: 'Fundamentos de programação e lógica'
    },
    {
      title: 'Lógica de Programação com JavaScript',
      issuer: 'Alura',
      year: '2023',
      description: 'Desenvolvimento de lógica de programação utilizando JavaScript'
    },
    {
      title: 'HTML e CSS',
      issuer: 'Alura',
      year: '2023',
      description: 'Desenvolvimento front-end com HTML e CSS'
    },
    {
      title: 'Git e GitHub: Colaboração em Projetos',
      issuer: 'Alura',
      year: '2023',
      description: 'Controle de versão e colaboração em projetos'
    }
  ]

  const projects = [
    {
      title: 'QAPlay',
      description: 'Criador do QAPlay, um projeto de portfólio que demonstra minhas habilidades em QA através de uma plataforma de desafios para a comunidade. Em desenvolvimento contínuo, com foco em testes de software e automação.',
      technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Vite'],
      highlights: [
        'Plataforma de Desafios',
        'Quizzes Técnicos e Práticos',
        'Foco em Automação de Testes',
        'Desenvolvido com Tecnologias Modernas'
      ],
      link: 'https://qaplay.vercel.app/',
      image: '/images/logo_QAPlay.png'
    },
    {
      title: 'Site Toque Ideal',
      description: 'Desenvolvimento e testes do site www.toqueideal.com - Site institucional da Toque Ideal, empresa especializada em decoração em vidro. Projeto completo incluindo desenvolvimento do CMS via Sanity.',
      technologies: ['React 18', 'Vite', 'Tailwind CSS', 'Sanity CMS', 'Lucide React', 'React Router', 'Context API'],
      highlights: [
        'Site institucional completo',
        'Catálogo com mais de 287 produtos',
        'Sistema de busca e filtros avançados',
        'Orçamento online integrado com WhatsApp',
        'CMS desenvolvido com Sanity',
        'Design responsivo para desktop e mobile',
        'Testes manuais e automatizados implementados'
      ],
      link: 'http://www.toqueideal.com/',
      image: '/images/logo_ToqueIdeal.png'
    }
  ]

  const education = [
    {
      title: 'Ciência da Computação',
      institution: 'Impacta Tecnologia',
      status: 'Ensino Superior Incompleto',
      description: 'Formação em Ciência da Computação com foco em desenvolvimento de software'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header Profissional */}
      <section className="bg-gradient-to-br from-primary/10 via-blue-50/50 to-purple-50/50 dark:from-primary/5 dark:via-blue-500/5 dark:to-purple-500/5 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Foto e Informações Básicas */}
            <div className="text-center lg:text-left space-y-4">
              <div className="mx-auto lg:mx-0 w-28 h-28 rounded-2xl overflow-hidden ring-3 ring-primary/20 shadow-lg">
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
                  <Users className="h-14 w-14 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center justify-center lg:justify-start space-x-1.5 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>São Paulo, SP</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-1.5 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>nilson.brites@gmail.com</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-1.5 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>(11) 94082-5120</span>
                </div>
              </div>
            </div>
            
            {/* Título e Descrição */}
            <div className="lg:col-span-2 space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Nilson da Silva Brites
                </h1>
                <h2 className="text-xl font-semibold text-primary">
                  Analista de Testes QA
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Sou um profissional de Qualidade que entende que o verdadeiro objetivo do QA não é apenas encontrar bugs, mas garantir qualidade em cada etapa do desenvolvimento.
                  Sei que testar tudo é impossível, por isso valorizo um olhar crítico e analítico para identificar riscos, priorizar o que realmente importa e contribuir para entregas mais assertivas.
                  Sou adaptável a ambientes de pressão e mantenho o foco na entrega com qualidade.
                  O QAPlay nasceu como um espaço pessoal para apresentar meu perfil e evoluiu para um projeto interativo, com quizzes voltados a QAs que desejam testar e aprimorar seus conhecimentos sobre Qualidade de Software.
                  Acredito que testar cedo é investir na qualidade: iniciar os testes desde o levantamento de requisitos é o caminho mais eficiente e econômico para construir produtos melhores.
                </p>
              </div>
              
              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="px-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                  <a href="https://drive.google.com/drive/folders/1hsVW1S1_cO3p_RiDZ9WUyc9UGowpTq4U?usp=sharing" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" />
                    Download CV Completo
                  </a>
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="lg" className="hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-500/10" asChild>
                    <a href="https://www.linkedin.com/in/nilsondasilvabrites/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-5 w-5" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="github-button transition-all duration-300 dark:hover:bg-gray-500/10" 
                    asChild
                  >
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

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Resumo Profissional */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Briefcase className="mr-2 h-7 w-7 text-primary" />
            Resumo Profissional
          </h2>
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-500/10 border-blue-200/50 dark:border-blue-500/20">
            <CardContent className="p-6">
              <div className="space-y-3 text-muted-foreground leading-relaxed text-sm">
                <p>
                  Profissional hands-on, autodidata e comprometido com o aprendizado contínuo, sempre buscando 
                  qualidade e superação de desafios, mesmo diante de novas tecnologias. Com perfil analítico e boa 
                  comunicação, atuo como <strong className="text-foreground">Analista de Testes em times ágeis utilizando o framework Scrum</strong>, 
                  participando de todo o ciclo de desenvolvimento (SDLC), desde o refinamento das histórias de usuário até a entrega final.
                </p>
                <p>
                  Nessa etapa inicial, colaboro para garantir que os requisitos estejam claros, completos e livres de ambiguidades, 
                  apoiando o time de desenvolvimento na prevenção de erros por meio do conceito de <strong className="text-foreground">shift left testing</strong>. 
                  Tenho experiência em <strong className="text-foreground">testes manuais e automatizados</strong>, aplicando técnicas de caixa preta 
                  como Particionamento de Equivalência, Análise de Valor Limite, Tabela de Decisão e Transição de Estado.
                </p>
                <p>
                  Elaboro e executo testes funcionais, não funcionais, positivos, negativos e regressivos, além de manter 
                  scripts de automação e executar casos de teste em pipelines. Também sou responsável por reportar bugs 
                  e sugestões de melhoria ao time técnico, contribuindo ativamente para a evolução contínua do produto.
                </p>
                <p>
                  Atualmente, aprofundando conhecimentos em DevOps e IA Generativa, com foco em integrar qualidade, automação e inteligência na entrega de software. Estou sempre em busca de melhorias contínuas e de novas formas de elevar o padrão de qualidade nas entregas.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Experiência Profissional */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Briefcase className="mr-2 h-7 w-7 text-primary" />
            Experiência Profissional
          </h2>
          <div className="space-y-5">
            {experiences.map((exp, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-lg text-foreground">{exp.title}</CardTitle>
                      <CardDescription className="text-base font-medium text-primary">{exp.company}</CardDescription>
                    </div>
                    <Badge variant="outline" className="mt-1.5 md:mt-0 w-fit text-xs">
                      <Calendar className="mr-1 h-3 w-3" />
                      {exp.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground text-sm">{exp.description}</p>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1.5 text-sm">Principais Atividades:</h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-muted-foreground">
                          <CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 flex-shrink-0" />
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
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Code className="mr-2 h-7 w-7 text-primary" />
            Projetos Destacados
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {projects.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    {project.image && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <img src={project.image} alt={`${project.title} logo`} className="h-8 w-8 object-contain" />
                      </a>
                    )}
                    <CardTitle className="text-lg text-foreground">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {project.title}
                      </a>
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1.5 text-sm">Tecnologias:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1.5 text-sm">Destaques:</h4>
                    <ul className="space-y-1">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-xs text-muted-foreground">
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

        {/* Formação Acadêmica */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <GraduationCap className="mr-2 h-7 w-7 text-primary" />
            Formação Acadêmica
          </h2>
          <div className="grid grid-cols-1 gap-5">
            {education.map((edu, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-foreground">{edu.title}</CardTitle>
                      <CardDescription className="font-medium text-primary text-sm">{edu.institution}</CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-1.5 text-xs">
                      {edu.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="text-muted-foreground">{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Certificações e Formação Complementar */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Award className="mr-2 h-7 w-7 text-primary" />
            Certificações e Formação Complementar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {certifications.map((cert, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-foreground">{cert.title}</CardTitle>
                      <CardDescription className="font-medium text-primary text-sm">{cert.issuer}</CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-1.5 text-xs">
                      {cert.year}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="text-muted-foreground">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Habilidades Técnicas */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Target className="mr-2 h-7 w-7 text-primary" />
            Ferramentas e Tecnologias
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3 text-base">Automação de Testes</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {['Selenium', 'Playwright', 'Cypress', 'JUnit'].map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3 text-base">Linguagens & Ferramentas</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {['Java', 'JavaScript', 'MySQL', 'Git', 'Postman'].map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3 text-base">Gestão & Metodologias</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {['Jira', 'Qase', 'Scrum', 'BDD/Gherkin'].map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Seção de Contato */}
        <section className="text-center py-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-500/10 rounded-lg shadow-inner">
          <h2 className="text-2xl font-bold text-foreground mb-4">Vamos Conversar!</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Se você tem um projeto, uma ideia ou apenas quer trocar uma experiência, 
            sinta-se à vontade para entrar em contato. Estou sempre aberto a novas conexões e desafios.
          </p>
          <ContactDialog>
            <Button size="lg" className="px-8 py-3 text-lg hover:shadow-lg transition-all duration-300">Entrar em Contato</Button>
          </ContactDialog>
        </section>
      </div>
    </div>
  );
};

export default About;

