import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Em um ambiente real, você carregaria o arquivo markdown correspondente
        // Por enquanto, vamos simular com dados estáticos
        const dummyPosts = {
          'primeiro-post': {
            title: 'Meu Primeiro Post no Blog',
            date: '2025-07-20',
            author: 'Nilson da Silva Brites',
            thumbnail: '/images/blog/post1.jpg',
            content: `# Bem-vindos ao Blog do QAPlay!

Este é o meu primeiro post no blog do QAPlay. Estou muito animado para compartilhar conhecimentos sobre Quality Assurance, testes de software e muito mais.

## O que você pode esperar

Neste blog, vou abordar:

- **Dicas de QA**: Melhores práticas para testadores
- **Ferramentas**: Reviews e tutoriais de ferramentas de teste
- **Automação**: Guias práticos de automação de testes
- **Carreira**: Conselhos para crescer na área de QA

## Sobre o QAPlay

O QAPlay é uma plataforma educativa focada em Quality Assurance. Nosso objetivo é democratizar o conhecimento em testes de software através de jogos interativos e conteúdo de qualidade.

Fique ligado para mais conteúdos em breve!

---

*Nilson da Silva Brites*  
*Fundador do QAPlay*`
          },
          'dicas-de-qa': {
            title: 'Dicas Essenciais para Testadores de Software',
            date: '2025-07-25',
            author: 'Nilson da Silva Brites',
            thumbnail: '/images/blog/post2.jpg',
            content: `# Dicas Essenciais para Testadores de Software

Como testador de software, você desempenha um papel crucial no desenvolvimento de aplicações de qualidade. Aqui estão algumas dicas essenciais para se destacar na área.

## 1. Entenda o Negócio

Antes de começar a testar, é fundamental entender:
- O objetivo do software
- O público-alvo
- Os processos de negócio envolvidos

## 2. Planeje Seus Testes

- **Análise de Requisitos**: Leia e entenda todos os requisitos
- **Casos de Teste**: Escreva casos de teste claros e objetivos
- **Priorização**: Foque nos cenários mais críticos primeiro

## 3. Automatize Quando Possível

A automação é essencial para:
- Testes de regressão
- Testes repetitivos
- Validação de builds

### Ferramentas Recomendadas

- **Cypress**: Para testes de interface web
- **Selenium**: Para automação cross-browser
- **Postman**: Para testes de API

## 4. Documente Tudo

- Mantenha evidências dos testes
- Documente bugs de forma clara
- Crie relatórios de teste detalhados

## 5. Mantenha-se Atualizado

A área de QA evolui constantemente. Invista em:
- Cursos e certificações
- Participação em comunidades
- Leitura de blogs e artigos técnicos

---

Essas dicas são apenas o começo. Continue praticando e aprendendo!`
          },
          'automacao-com-cypress': {
            title: 'Introdução à Automação de Testes com Cypress',
            date: '2025-07-30',
            author: 'Nilson da Silva Brites',
            thumbnail: '/images/blog/post3.jpg',
            content: `# Introdução à Automação de Testes com Cypress

O Cypress é uma das ferramentas mais populares para automação de testes de interface web. Neste post, vamos explorar seus fundamentos.

## Por que Cypress?

- **Fácil de usar**: Sintaxe simples e intuitiva
- **Debugging**: Excelentes ferramentas de debug
- **Real-time**: Execução em tempo real
- **Screenshots**: Captura automática de evidências

## Instalação

\`\`\`bash
npm install cypress --save-dev
\`\`\`

## Primeiro Teste

\`\`\`javascript
describe('Meu primeiro teste', () => {
  it('Visita a página inicial', () => {
    cy.visit('https://qaplay.com.br')
    cy.contains('QAPlay')
    cy.get('[data-testid="login-button"]').click()
  })
})
\`\`\`

## Comandos Essenciais

### Navegação
- \`cy.visit(url)\`: Navega para uma URL
- \`cy.go('back')\`: Volta uma página

### Seleção de Elementos
- \`cy.get(selector)\`: Seleciona elementos
- \`cy.contains(text)\`: Encontra por texto

### Interações
- \`cy.click()\`: Clica em um elemento
- \`cy.type(text)\`: Digita texto
- \`cy.select(value)\`: Seleciona opção

### Asserções
- \`cy.should('be.visible')\`: Verifica visibilidade
- \`cy.should('contain', text)\`: Verifica conteúdo

## Boas Práticas

1. **Use data-testid**: Para seletores mais estáveis
2. **Page Objects**: Organize seu código
3. **Fixtures**: Use dados de teste externos
4. **Custom Commands**: Crie comandos reutilizáveis

## Exemplo Prático

\`\`\`javascript
describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Deve fazer login com credenciais válidas', () => {
    cy.get('[data-testid="email"]').type('user@example.com')
    cy.get('[data-testid="password"]').type('password123')
    cy.get('[data-testid="login-button"]').click()
    
    cy.url().should('include', '/dashboard')
    cy.get('[data-testid="welcome-message"]')
      .should('contain', 'Bem-vindo')
  })
})
\`\`\`

## Conclusão

O Cypress é uma ferramenta poderosa que pode revolucionar seus testes automatizados. Comece pequeno e vá evoluindo gradualmente.

---

Nos próximos posts, vamos explorar recursos mais avançados do Cypress!`
          }
        };

        const postData = dummyPosts[slug];
        if (postData) {
          setPost(postData);
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
      <div className="container mx-auto py-12 px-4">
        <p className="text-center">Carregando post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card>
          <CardContent className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Post não encontrado</h1>
            <p className="text-muted-foreground mb-4">O post que você está procurando não existe.</p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Blog
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Blog
        </Link>

        <Card>
          {post.thumbnail && (
            <img src={post.thumbnail} alt={post.title} className="w-full h-64 object-cover rounded-t-lg" />
          )}
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
            <p className="text-muted-foreground">Por {post.author} em {post.date}</p>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogPostPage;

