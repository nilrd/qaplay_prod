import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Tag, Calendar, Clock, User, Linkedin, MessageCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useSEO } from '@/hooks/useSEO';
import '../styles/blog-typography.css';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);





  // SEO Meta Tags
  useSEO({
    title: post ? `${post.title} | Blog QAPlay` : 'Blog QAPlay',
    description: post ? post.excerpt : 'Blog oficial do QAPlay com artigos sobre Quality Assurance e testes de software.',
    image: post ? post.thumbnail : '/qa-play-logo.png',
    url: post ? `${window.location.origin}/blog/${slug}` : window.location.href,
    type: 'article'
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const allPosts = [
          {
            slug: 'paradoxo-do-pesticida',
            title: 'O Paradoxo do Pesticida: Por Que Seus Testes Deixam de Encontrar Bugs e Como Resolver',
            date: '2025-01-15',
            author: 'Nilson Brites',
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop&crop=center',
            excerpt: 'Descubra como o Paradoxo do Pesticida afeta seus testes e aprenda estratégias para manter sua suíte de testes sempre eficaz na detecção de bugs.',
            category: 'Qualidade de Software',
            readTime: '5 min',
            content: `# O Paradoxo do Pesticida: Por Que Seus Testes Deixam de Encontrar Bugs e Como Resolver

Você já se deparou com uma situação em que sua suíte de testes de regressão, que antes era tão eficaz, começa a passar repetidamente sem encontrar nenhum novo defeito, mesmo sabendo que a aplicação continua evoluindo? Se sim, você pode estar vivenciando um dos princípios mais importantes do teste de software: o **Paradoxo do Pesticida**.

## O Conceito

O conceito, um dos sete princípios fundamentais do ISTQB, é simples, mas profundo: se você aplicar o mesmo conjunto de testes repetidamente, com o tempo, ele deixará de encontrar novos defeitos. Assim como os insetos desenvolvem resistência a um pesticida usado continuamente, seu software se torna "imune" aos seus testes existentes. As falhas que seus testes foram projetados para encontrar já foram corrigidas, e os novos bugs surgirão em áreas que você não está cobrindo.

## Como Evitar que Seus Testes se Tornem Obsoletos?

### 1. Revise e Atualize Constantemente

Seus casos de teste não são documentos estáticos. A cada nova funcionalidade ou alteração, revise e adapte os testes existentes para cobrir os novos cenários e fluxos de usuário.

### 2. Introduza Novos Testes

A chave é a **variedade**. Baseie-se em:
- Dados de produção
- Feedback de usuários  
- Sua própria experiência

Crie novos casos de teste que explorem a aplicação de maneiras diferentes.

### 3. Foco em Dados Variáveis

Em vez de usar sempre os mesmos dados de entrada, implemente **testes orientados a dados (Data-Driven Testing)** para variar as combinações e aumentar a chance de encontrar bugs de borda.

## Lembre-se

O objetivo da regressão não é apenas garantir que o antigo funciona, mas também que o novo não quebrou nada de forma inesperada. Manter seus "pesticidas" atualizados é a única forma de garantir uma colheita de software com qualidade.

---

*Nilson Brites*`
          },
          {
            slug: 'scrum-para-qas',
            title: 'Scrum para QAs: 3 Dicas para se Destacar nas Sprints',
            date: '2025-01-10',
            author: 'Nilson Brites',
            thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop&crop=center',
            excerpt: 'Aprenda como se destacar como QA em times ágeis com práticas que vão além da detecção de bugs e te tornam um parceiro estratégico.',
            category: 'Metodologias Ágeis',
            readTime: '4 min',
            content: `# Scrum para QAs: 3 Dicas para se Destacar nas Sprints

Trabalhar como Analista de QA em um time Scrum vai muito além de "encontrar bugs". É sobre ser um **parceiro estratégico na entrega de valor**. Após participar de inúmeras Sprints, aprendi que algumas práticas podem elevar o papel do QA de um simples "verificador" para um verdadeiro "guardião da qualidade".

## 1. Atue na Prevenção, Não Apenas na Detecção (Shift Left)

O seu trabalho não começa quando o desenvolvedor move o card para "Testing". Ele começa no **refinamento**. 

Participe ativamente das discussões, questione os critérios de aceite, aponte ambiguidades e ajude a definir os requisitos de forma clara. Cada bug que você ajuda a prevenir nesta fase vale dez vezes mais do que um bug encontrado no final do ciclo.

## 2. Entenda o "Definition of Done" (DoD)

O DoD é o **contrato de qualidade da equipe**. Ele define o que significa "pronto". Como QA, você é a pessoa que garante que cada item entregue não apenas "funciona", mas atende a todos os critérios do DoD:

- Testes unitários passaram
- A documentação foi atualizada
- Os testes de regressão foram executados
- Etc.

Conheça o DoD de cor e seja a voz que o defende.

## 3. Comunicação Clara e Construtiva

Ao reportar um bug, o objetivo não é apontar um erro, mas sim fornecer ao desenvolvedor todas as informações necessárias para corrigi-lo rapidamente.

### Um bom reporte de bug inclui:

- **Um título claro e conciso**
- **Passos para reproduzir o erro (Step by Step)**
- **O resultado esperado vs. o resultado observado**
- **Evidências (screenshots, vídeos, logs)**

## Conclusão

Ao adotar essas práticas, você se torna uma peça indispensável no motor do Scrum, garantindo não apenas que o software funcione, mas que ele seja construído com qualidade desde o primeiro dia.

---

*Nilson Brites*`
          },
          {
            slug: 'cursos-gratuitos-ti-2025',
            title: '5 Cursos Gratuitos para Turbinar sua Carreira em TI em 2025',
            date: '2025-01-05',
            author: 'Nilson Brites',
            thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop&crop=center',
            excerpt: 'Descubra 5 plataformas com cursos gratuitos que podem fazer a diferença no seu currículo e acelerar sua carreira em TI.',
            category: 'Dicas de Cursos',
            readTime: '6 min',
            content: `# 5 Cursos Gratuitos para Turbinar sua Carreira em TI em 2025
            
Manter-se atualizado é a chave para o sucesso em qualquer área de TI, e o melhor de tudo é que não é preciso gastar uma fortuna para isso. Existem recursos incríveis e gratuitos disponíveis para quem tem disciplina e vontade de aprender.
            
Seja você um QA, desenvolvedor ou aspirante na área, aqui estão cinco plataformas com cursos gratuitos que podem fazer a diferença no seu currículo:
            
## 1. Alura (Formações Gratuitas)
            
Embora seja uma plataforma paga, a Alura frequentemente libera formações completas de forma gratuita por tempo limitado, especialmente durante seus eventos "Imersão Dev". Fique de olho nessas oportunidades! Eles também possuem uma rica coleção de artigos e vídeos no YouTube.
            
## 2. freeCodeCamp
            
Uma das maiores comunidades de aprendizado do mundo. Oferece milhares de horas de conteúdo interativo e certificações gratuitas em áreas como:
            
- Desenvolvimento Web Responsivo
            - Algoritmos e Estruturas de Dados com JavaScript
            - Qualidade de Software
            
## 3. Coursera (Modo Auditoria)
            
Muitas das melhores universidades do mundo (como Stanford e Michigan) oferecem seus cursos no Coursera. Você pode se inscrever na maioria deles gratuitamente no "Modo Auditoria". Você não receberá o certificado, mas terá acesso a todo o material de vídeo e leitura, o que já é um conhecimento valiosíssimo.
            
## 4. DIO (Digital Innovation One)
            
Uma plataforma brasileira com um foco imenso em "bootcamps" e formações completas em parceria com grandes empresas. Eles oferecem muitos programas gratuitos que não apenas ensinam a tecnologia, mas também te conectam com oportunidades de emprego.
            
## 5. Canais de Qualidade no YouTube
            
Não subestime o poder do YouTube. Canais como:
            
- **Júlio de Lima**
            - **Curso em Vídeo** (para fundamentos)
            - **The Test Lead** (internacional)
            - **Automation Step by Step** (internacional)
            
Oferecem tutoriais práticos e dicas de carreira que valem ouro.
            
## Conclusão
            
O conhecimento está aí, acessível a todos. A única coisa que você precisa investir é o seu tempo.
            
---
            
*Nilson Brites*`
          },
          {
            slug: 'testes-api-ferramentas-essenciais',
            title: 'Testes de API: 3 Ferramentas Essenciais que Todo QA Deve Conhecer',
            date: '2025-01-20',
            author: 'Nilson Brites',
            thumbnail: '/images/testes_api.png',
            excerpt: 'Descubra as 3 ferramentas essenciais para testes de API: Postman, Insomnia e REST-assured. Domine a camada de serviços e aumente seu valor como QA.',
            category: 'Testes de API',
            readTime: '7 min',
            content: `# Testes de API: 3 Ferramentas Essenciais que Todo QA Deve Conhecer
            
Enquanto a interface do usuário (UI) é o que o cliente vê, a API (Application Programming Interface) é o motor que faz tudo funcionar nos bastidores. Testar essa camada é crucial para garantir a estabilidade e a segurança de uma aplicação. Para um QA, dominar as ferramentas de teste de API não é mais um diferencial, é uma necessidade.
            
Se você está começando ou querendo expandir seu arsenal, aqui estão três ferramentas essenciais:
            
## Postman: O "canivete suíço" dos testes de API
            
O Postman é a ferramenta mais popular para testes manuais e exploratórios de APIs. Com uma interface gráfica intuitiva, ele permite que você monte e envie requisições (GET, POST, PUT, DELETE), organize-as em coleções, gerencie ambientes (desenvolvimento, produção) e escreva testes de asserção simples em JavaScript para validar as respostas. É o ponto de partida perfeito para qualquer profissional de QA.
            
## Insomnia: Design limpo e foco em velocidade
            
Um forte concorrente do Postman, o Insomnia se destaca por seu design limpo e foco em velocidade e simplicidade. Muitos desenvolvedores e QAs preferem o Insomnia por sua interface menos poluída e seu excelente suporte para especificações como OpenAPI (Swagger) e GraphQL, facilitando a importação e o teste de APIs já documentadas.
            
## REST-assured: Automação poderosa
            
Quando os testes manuais não são mais suficientes, é hora de automatizar. REST-assured é uma biblioteca Java extremamente poderosa que torna a automação de testes para APIs REST uma tarefa quase trivial. Sua sintaxe fluente, inspirada no BDD, permite escrever testes que são ao mesmo tempo legíveis e robustos. Um exemplo de validação:
            
\`\`\`java
given().
    param("q", "test automation").
when().
    get("/search").
then().
    statusCode(200).
    body("results.size()", greaterThan(0));
\`\`\`

Dominar o REST-assured é um passo fundamental para quem trabalha com automação de testes em ecossistemas Java.
            
## Conclusão
            
Seja qual for a sua escolha, investir tempo em aprender a testar a camada de serviços irá aprofundar seu conhecimento sobre o sistema e aumentar exponencialmente o seu valor como profissional de QA.
            
---
            
*Nilson Brites*`
          },
          {
            slug: 'certificacao-ctfl-guia-definitivo',
            title: 'Certificação CTFL: O Guia Definitivo para Passar na Prova',
            date: '2025-01-18',
            author: 'Nilson Brites',
            thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop&crop=center',
            excerpt: 'Guia completo para passar na certificação CTFL do ISTQB. Aprenda sobre o syllabus, níveis de conhecimento e estratégias de estudo eficazes.',
            category: 'Carreira e Estudos',
            readTime: '8 min',
            content: `# Certificação CTFL: O Guia Definitivo para Passar na Prova
            
A certificação CTFL (Certified Tester Foundation Level) do ISTQB é, sem dúvida, o cartão de visitas mais reconhecido para um profissional de Qualidade de Software. Ela não apenas valida seu conhecimento nos fundamentos teóricos do teste, mas também abre portas no mercado de trabalho. No entanto, passar na prova exige mais do que apenas experiência prática; requer estudo focado.
            
Aqui está um guia passo a passo para sua preparação:
            
## 1. Baixe o Syllabus Oficial (Sua Fonte da Verdade)
            
A prova é 100% baseada no conteúdo do syllabus. Baixe a versão mais recente diretamente do site do ISTQB ou do BSTQB (no Brasil). Este documento é seu guia principal, e cada tópico listado nele é um potencial tema de questão.
            
## 2. Entenda os Níveis de Conhecimento (K-Levels)
            
O syllabus classifica cada tópico em níveis de conhecimento (K1 a K4). Preste atenção nisso!
            
- **K1 (Lembrar)**: Você só precisa memorizar a definição.
- **K2 (Entender)**: Você precisa ser capaz de explicar o conceito com suas próprias palavras.
- **K3 (Aplicar)**: Você precisa ser capaz de aplicar o conhecimento a um cenário prático. A maioria das questões de cálculo (ex: cobertura de decisão) se enquadra aqui.
            
## 3. Use Simulados de Forma Inteligente
            
Fazer simulados é a melhor forma de testar seu conhecimento e gerenciar seu tempo. Plataformas como o QAPlay oferecem quizzes baseados no syllabus que te ajudam a identificar seus pontos fracos. A regra de ouro é: não decore as respostas. Entenda por que cada resposta está certa e, mais importante, por que as outras estão erradas.
            
## 4. Técnicas e Palavras-Chave
            
Foque em entender profundamente as técnicas de teste de caixa preta, como Particionamento de Equivalência, Análise de Valor Limite e Tabela de Decisão, pois elas são frequentemente cobradas em questões práticas. Fique atento também às palavras-chave em cada pergunta, como "principalmente", "qual dos seguintes NÃO é", etc.
            
## Conclusão
            
Com disciplina e um plano de estudos estruturado, a certificação CTFL está totalmente ao seu alcance. Boa sorte!
            
---
            
*Nilson Brites*`
          },
          {
            slug: 'jira-para-qas-mais-que-bugs',
            title: 'Jira para QAs: Mais do que Apenas Reportar Bugs',
            date: '2025-01-16',
            author: 'Nilson Brites',
            thumbnail: 'https://images.unsplash.com/photo-1553484771-cc0d9b8c2b33?w=1200&h=600&fit=crop&crop=center',
            excerpt: 'Aprenda a usar o Jira como uma ferramenta estratégica de qualidade. Crie bug reports perfeitos, monitore métricas e integre com ferramentas de teste.',
            category: 'Dicas de Ferramentas',
            readTime: '6 min',
            content: `# Jira para QAs: Mais do que Apenas Reportar Bugs
            
Para muitos, o Jira é simplesmente a ferramenta onde se "abre, retesta e fecha bugs". No entanto, para um Analista de QA estratégico, o Jira é uma fonte rica de dados e uma ferramenta poderosa para gerenciar e otimizar todo o processo de qualidade dentro de um time ágil.
            
Veja como você pode usar o Jira de forma mais inteligente:
            
## 1. Crie Bug Reports Perfeitos
            
A qualidade do seu bug report impacta diretamente a velocidade da correção. Um card no Jira bem-feito não é negociável. Ele deve conter:
            
- **Título Claro e Objetivo**: Ex: "Erro 500 ao tentar salvar perfil sem preencher o campo 'Sobrenome'".
- **Passos para Reproduzir (Steps)**: Uma lista numerada e inequívoca.
- **Resultado Esperado vs. Atual**: A comparação clara do que deveria acontecer com o que de fato aconteceu.
- **Anexos**: Screenshots, vídeos curtos (essencial!) e logs.
- **Metadados**: Preencha corretamente a versão, ambiente, prioridade e componentes afetados.
            
## 2. Use Dashboards para Visibilidade
            
Não espere a reunião de retrospectiva para levantar pontos de melhoria. Crie um dashboard pessoal no Jira para monitorar métricas de qualidade. Use gadgets para visualizar:
            
- **Bugs Criados vs. Resolvidos**: Ajuda a identificar gargalos no processo.
- **Bugs por Componente**: Mostra quais partes do sistema são mais frágeis.
- **Tempo Médio de Resolução de Bugs**: Uma métrica importante da eficiência do time.
            
## 3. Integre com suas Ferramentas de Teste
            
Explore integrações. Ferramentas de gerenciamento de casos de teste como o Qase (ou Zephyr, Xray) se integram ao Jira, permitindo que você vincule diretamente a execução de um caso de teste a uma história de usuário ou a um bug. Isso cria uma rastreabilidade completa, que é crucial para auditorias e para entender a cobertura de teste de cada funcionalidade.

## Conclusão

Ao tratar o Jira não apenas como um sistema de tickets, mas como uma central de inteligência de qualidade, você eleva sua atuação e fornece insights valiosos que ajudam todo o time a entregar um produto melhor.

---

*Nilson Brites*`
          }
        ];

        const dummyPosts = {
          'paradoxo-do-pesticida': allPosts[0],
          'scrum-para-qas': allPosts[1],
          'cursos-gratuitos-ti-2025': allPosts[2],
          'testes-api-ferramentas-essenciais': allPosts[3],
          'certificacao-ctfl-guia-definitivo': allPosts[4],
          'jira-para-qas-mais-que-bugs': allPosts[5]
        };

        const postData = dummyPosts[slug];
        if (postData) {
          setPost(postData);
          setPosts(allPosts);
        }
      } catch (error) {
        console.error('Erro ao carregar post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando artigo...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artigo não encontrado</h1>
          <p className="text-muted-foreground mb-4">O artigo que você está procurando não existe.</p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header com navegação */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Blog
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal de Conteúdo (~70%) */}
          <div className="lg:col-span-2">
            <article>
              {/* Imagem de Destaque */}
              <div className="relative mb-8 rounded-lg overflow-hidden">
                <img 
                  src={post.thumbnail} 
                  alt={post.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground">
                    {post.category}
                  </Badge>
                </div>
              </div>

              {/* Cabeçalho do Artigo */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex items-center gap-4 text-muted-foreground mb-6">
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Por {post.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>
              </header>

              {/* Conteúdo do Artigo */}
              <div className="prose prose-lg max-w-none mb-12">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>

              {/* Tags do Post */}
              <div className="border-t pt-8 mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Tag className="mr-2 h-5 w-5" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    {post.category}
                  </Badge>
                  <Badge variant="outline">
                    Quality Assurance
                  </Badge>
                  <Badge variant="outline">
                    Testes de Software
                  </Badge>
                </div>
              </div>

              {/* Seção Sobre o Autor */}
              <div className="border-t pt-8 mb-8">
                <h3 className="text-xl font-semibold mb-6">
                  Sobre o Autor
                </h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <img 
                          src="/Nilson Brites1 (3).png" 
                          alt="Nilson Brites"
                          className="w-24 h-24 rounded-full object-cover"
                          style={{ objectPosition: 'center 20%' }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-2">
                          Nilson Brites
                        </h4>
                        <p className="text-sm mb-3 text-muted-foreground">
                          Quality Assurance Engineer
                        </p>
                        <p className="text-sm leading-relaxed mb-4 text-muted-foreground">
                          Analista de QA com experiência em automação de testes e metodologias ágeis, apaixonado por colaborar e evoluir o conhecimento na comunidade de tecnologia.
                        </p>
                        <div className="flex gap-3">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.open('https://www.linkedin.com/in/nilsondasilvabrites/', '_blank')}
                          >
                            <Linkedin className="h-4 w-4 mr-2" />
                            LinkedIn
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.open('https://github.com/nilson-brites', '_blank')}
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            GitHub
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Seção "Leia a Seguir" */}
              <div className="border-t pt-8">
                <h3 className="text-xl font-semibold mb-6">
                  Leia a Seguir
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {posts.filter(p => p.slug !== slug).slice(0, 3).map((relatedPost) => (
                    <Link key={relatedPost.slug} to={`/blog/${relatedPost.slug}`} className="group">
                      <div className="relative h-48 rounded-lg overflow-hidden bg-gray-900">
                        <img 
                          src={relatedPost.thumbnail} 
                          alt={relatedPost.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute inset-0 p-4 flex flex-col justify-end">
                          <Badge className="bg-primary text-primary-foreground text-xs font-medium mb-2 w-fit">
                            {relatedPost.category}
                          </Badge>
                          <h4 className="text-white text-sm font-semibold line-clamp-2 leading-tight">
                            {relatedPost.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar (Coluna Lateral - ~30%) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Módulo 1: Desafio em Destaque */}
              <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3">
                    Pronto para o Desafio?
                  </h3>
                  <p className="text-sm mb-4 opacity-90">
                    Valide seus conhecimentos no Quiz CTFL 4.0
                  </p>
                  <Link to="/quizzes">
                    <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                      Iniciar Desafio
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Módulo 2: Vamos nos Conectar */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">
                    Vamos nos Conectar
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Siga-me nas redes sociais para mais conteúdo sobre QA
                  </p>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.open('https://www.linkedin.com/in/nilsondasilvabrites/', '_blank')}
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.open('https://github.com/nilson-brites', '_blank')}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;