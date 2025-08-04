import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Lightbulb, Wrench, CheckCircle, GitBranch, BookOpen, Video, Image as ImageIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Dados simulados para as categorias e conteúdos
const contentCategories = [
  {
    id: 'tipos-de-teste',
    title: 'Tipos de Teste',
    description: 'Explore os diferentes tipos de teste em QA, desde os funcionais até os não funcionais.',
    icon: <Lightbulb className="h-8 w-8 text-blue-600" />,
    color: 'bg-blue-50',
    items: [
      {
        id: 'teste-funcional',
        title: 'Teste Funcional',
        summary: 'Valida se o sistema faz o que deveria fazer com base nos requisitos.',
        markdownContent: `# Teste Funcional\n\nO Teste Funcional é um tipo de teste de software que verifica se cada função do software opera de acordo com as especificações de requisitos. O objetivo principal deste teste é verificar o comportamento do sistema.\n\n## Características:\n- Baseado nas especificações do cliente.\n- Foca no "o quê" o sistema faz.\n- Pode ser realizado manualmente ou de forma automatizada.\n\n## Exemplos:\n- Verificar se o login funciona corretamente com credenciais válidas e inválidas.\n- Testar a funcionalidade de adicionar um item ao carrinho de compras.\n- Validar se um formulário de cadastro salva os dados corretamente.\n\n## Boas Práticas:\n- Crie casos de teste claros e concisos.\n- Cubra todos os requisitos funcionais.\n- Utilize dados de teste variados para diferentes cenários.`,
        videoLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Exemplo de vídeo
        image: '/images/content/functional_test.png' // Exemplo de imagem
      },
      {
        id: 'teste-nao-funcional',
        title: 'Teste Não Funcional',
        summary: 'Avalia atributos como desempenho, usabilidade e segurança.',
        markdownContent: `# Teste Não Funcional\n\nO Teste Não Funcional foca em como o sistema funciona, avaliando aspectos como desempenho, segurança, usabilidade, confiabilidade, escalabilidade, entre outros. Complementa o teste funcional, garantindo a qualidade global do software.\n\n## Tipos Comuns:\n- **Teste de Desempenho:** Avalia a velocidade, capacidade de resposta e estabilidade do sistema sob uma carga de trabalho específica.\n- **Teste de Usabilidade:** Verifica a facilidade com que os usuários podem aprender e usar o sistema.\n- **Teste de Segurança:** Identifica vulnerabilidades e garante a proteção dos dados.\n- **Teste de Compatibilidade:** Verifica se o software funciona bem em diferentes ambientes (navegadores, sistemas operacionais, dispositivos).\n\n## Importância:\nTestes não funcionais são cruciais para a experiência do usuário e a robustez do sistema, garantindo que o software não apenas faça o que deve, mas faça bem.`,
        videoLink: null,
        image: null
      },
      {
        id: 'teste-de-regressao',
        title: 'Teste de Regressão',
        summary: 'Garante que novas funcionalidades ou correções não quebraram funcionalidades existentes.',
        markdownContent: `# Teste de Regressão\n\nO Teste de Regressão é a execução de testes existentes para garantir que as novas alterações no código (sejam elas novas funcionalidades, correções de bugs ou refatorações) não introduziram novos defeitos ou causaram a regressão de funcionalidades que antes funcionavam corretamente.\n\n## Quando Realizar:\n- Após cada nova implementação.\n- Após correções de bugs.\n- Antes de cada release.\n\n## Benefícios:\n- Reduz o risco de introduzir novos bugs.\n- Garante a estabilidade do software.\n- Aumenta a confiança nas novas versões.\n\n## Automação:\nA automação é fundamental para testes de regressão, pois permite a execução rápida e repetitiva de um grande volume de testes, tornando o processo mais eficiente.`,
        videoLink: null,
        image: null
      },
      {
        id: 'teste-de-integracao',
        title: 'Teste de Integração',
        summary: 'Verifica se módulos/sistemas funcionam corretamente em conjunto.',
        markdownContent: `# Teste de Integração\n\nO Teste de Integração é uma fase do teste de software na qual módulos individuais são combinados e testados como um grupo. O objetivo é expor defeitos na interação entre esses módulos.\n\n## Abordagens:\n- **Top-down:** Começa com os módulos de nível superior e integra os de nível inferior.\n- **Bottom-up:** Começa com os módulos de nível inferior e integra-os aos de nível superior.\n- **Sanduíche:** Combina as abordagens top-down e bottom-up.\n\n## Importância:\nÉ crucial para identificar problemas de interface e comunicação entre os componentes do sistema antes que se tornem mais difíceis e caros de corrigir em fases posteriores.`,
        videoLink: null,
        image: null
      },
      {
        id: 'teste-de-unidade',
        title: 'Teste de Unidade',
        summary: 'Foca em testar pequenas partes do código, como funções e métodos.',
        markdownContent: `# Teste de Unidade\n\nO Teste de Unidade é o nível mais baixo de teste, onde componentes individuais (unidades) de um software são testados isoladamente. Uma "unidade" pode ser uma função, um método, uma classe ou um módulo.\n\n## Características:\n- Realizado geralmente pelos desenvolvedores.\n- Foca na lógica interna do código.\n- É o teste mais rápido e barato de executar.\n\n## Benefícios:\n- Ajuda a encontrar bugs precocemente no ciclo de desenvolvimento.\n- Facilita a refatoração do código.\n- Serve como documentação para o código.\n\n## Ferramentas Comuns:\n- JUnit (Java)\n- NUnit (.NET)\n- Jest (JavaScript)\n- Pytest (Python)`,
        videoLink: null,
        image: null
      },
      {
        id: 'teste-de-aceitacao',
        title: 'Teste de Aceitação',
        summary: 'Valida se o sistema atende às expectativas do usuário final.',
        markdownContent: `# Teste de Aceitação\n\nO Teste de Aceitação (UAT - User Acceptance Testing) é a fase final do teste de software, onde o sistema é testado pelos usuários finais ou clientes para verificar se ele atende aos requisitos de negócio e às suas expectativas. O objetivo é determinar se o software está pronto para ser entregue.\n\n## Tipos:\n- **Alfa Teste:** Realizado por testadores internos, mas fora da equipe de desenvolvimento.\n- **Beta Teste:** Realizado por um grupo de usuários reais em um ambiente de produção.\n\n## Importância:\nÉ vital para garantir que o software entregue valor real ao usuário e ao negócio, validando a solução do ponto de vista de quem realmente irá utilizá-la.`,
        videoLink: null,
        image: null
      },
      {
        id: 'teste-de-sistema',
        title: 'Teste de Sistema',
        summary: 'Analisa o sistema como um todo, incluindo interfaces e dados.',
        markdownContent: `# Teste de Sistema\n\nO Teste de Sistema é um nível de teste que verifica o sistema de software completo e integrado para avaliar a conformidade do sistema com os requisitos especificados. Ele testa as interações entre todos os componentes do sistema.\n\n## Abrangência:\n- Testes de funcionalidade de ponta a ponta.\n- Testes de desempenho, segurança, usabilidade.\n- Testes de recuperação e instalação.\n\n## Objetivo:\nAssegurar que o sistema atenda a todos os requisitos funcionais e não funcionais, e que funcione como esperado em um ambiente que simula a produção.`,
        videoLink: null,
        image: null
      },
      {
        id: 'teste-de-performance',
        title: 'Teste de Performance',
        summary: 'Avalia tempo de resposta, escalabilidade e estabilidade.',
        markdownContent: `# Teste de Performance\n\nO Teste de Performance é um tipo de teste não funcional que avalia a velocidade, capacidade de resposta e estabilidade de um sistema sob uma carga de trabalho específica. Ele ajuda a identificar gargalos e garantir que o sistema possa lidar com o volume esperado de usuários e transações.\n\n## Tipos Comuns:\n- **Teste de Carga:** Avalia o comportamento do sistema sob uma carga de trabalho esperada.\n- **Teste de Estresse:** Avalia o comportamento do sistema sob condições extremas, além da carga esperada.\n- **Teste de Pico:** Simula picos de uso para verificar a capacidade do sistema de lidar com aumentos súbitos de carga.\n- **Teste de Escalabilidade:** Avalia a capacidade do sistema de lidar com um aumento no número de usuários ou transações.\n\n## Ferramentas Comuns:\n- JMeter\n- LoadRunner\n- Gatling\n- K6`,
        videoLink: null,
        image: null
      },
    ],
  },
  {
    id: 'ferramentas-de-automacao',
    title: 'Ferramentas de Automação',
    description: 'Conheça as principais ferramentas utilizadas na automação de testes.',
    icon: <Wrench className="h-8 w-8 text-green-600" />,
    color: 'bg-green-50',
    items: [
      {
        id: 'selenium',
        title: 'Selenium',
        summary: 'Framework para automação de testes em navegadores web.',
        markdownContent: `# Selenium\n\nSelenium é um conjunto de ferramentas de código aberto amplamente utilizado para automatizar navegadores web. É uma das ferramentas mais populares para testes de regressão e automação de testes funcionais de aplicações web.\n\n## Componentes:\n- **Selenium WebDriver:** A API principal para interagir com navegadores.\n- **Selenium IDE:** Uma extensão de navegador para gravar e reproduzir interações.\n- **Selenium Grid:** Para executar testes em paralelo em várias máquinas e navegadores.\n\n## Vantagens:\n- Suporta múltiplas linguagens de programação (Java, Python, C#, Ruby, JavaScript).\n- Compatível com a maioria dos navegadores (Chrome, Firefox, Edge, Safari).\n- Comunidade grande e ativa.\n\n## Desvantagens:\n- Não suporta testes de desktop ou mobile nativo (apenas web).\n- Requer conhecimento de programação.\n- Configuração inicial pode ser complexa.`,
        videoLink: null,
        image: null
      },
      {
        id: 'cypress',
        title: 'Cypress',
        summary: 'Ferramenta de teste de front-end para aplicações web modernas.',
        markdownContent: `# Cypress\n\nCypress é uma ferramenta de teste de front-end de próxima geração construída para a web moderna. Ele permite escrever testes de ponta a ponta, integração e unidade. Cypress opera diretamente no navegador, o que o torna rápido e confiável.\n\n## Vantagens:\n- Fácil de configurar e usar.\n- Execução rápida de testes.\n- Debugging em tempo real no navegador.\n- Captura automática de screenshots e vídeos.\n\n## Desvantagens:\n- Suporta apenas JavaScript.\n- Não suporta múltiplos navegadores em paralelo nativamente.\n- Não suporta testes de desktop ou mobile nativo.`,
        videoLink: null,
        image: null
      },
      {
        id: 'postman',
        title: 'Postman',
        summary: 'Plataforma para construção e uso de APIs.',
        markdownContent: `# Postman\n\nPostman é uma plataforma popular para construção e uso de APIs. Embora seja amplamente utilizado para desenvolvimento e depuração de APIs, também é uma ferramenta poderosa para testes de API, permitindo enviar requisições e validar respostas.\n\n## Funcionalidades para Teste:\n- Envio de requisições HTTP (GET, POST, PUT, DELETE, etc.).\n- Criação de coleções de requisições.\n- Escrita de scripts de teste (JavaScript) para validar respostas.\n- Geração de relatórios de teste.\n\n## Vantagens:\n- Interface intuitiva e fácil de usar.\n- Suporte a diversos tipos de autenticação.\n- Permite a automação de testes de API.\n\n## Desvantagens:\n- Não é focado em testes de UI.\n- Pode ser limitado para cenários de teste de performance complexos.`,
        videoLink: null,
        image: null
      },
      {
        id: 'cucumber',
        title: 'Cucumber',
        summary: 'Framework BDD que permite escrever testes em linguagem natural (Gherkin).',
        markdownContent: `# Cucumber\n\nCucumber é um framework que suporta o Desenvolvimento Orientado por Comportamento (BDD - Behavior-Driven Development). Ele permite que equipes colaborem na definição de comportamentos de software em linguagem natural, usando a sintaxe Gherkin.\n\n## Gherkin:\n- **Given:** Define o contexto inicial.\n- **When:** Descreve uma ação ou evento.\n- **Then:** Descreve o resultado esperado.\n\n## Vantagens:\n- Melhora a comunicação entre equipes técnicas e de negócio.\n- Testes são legíveis por não-técnicos.\n- Facilita a compreensão dos requisitos.\n\n## Desvantagens:\n- Requer um bom entendimento de BDD.\n- Pode adicionar uma camada extra de complexidade se não for bem gerenciado.`,
        videoLink: null,
        image: null
      },
    ],
  },
  {
    id: 'boas-praticas',
    title: 'Boas Práticas em QA',
    description: 'Aprenda as melhores práticas para garantir a qualidade do software.',
    icon: <CheckCircle className="h-8 w-8 text-purple-600" />,
    color: 'bg-purple-50',
    items: [
      {
        id: 'shift-left-testing',
        title: 'Shift-Left Testing',
        summary: 'Integrar testes o mais cedo possível no ciclo de desenvolvimento.',
        markdownContent: `# Shift-Left Testing\n\nShift-Left Testing é uma abordagem que enfatiza a realização de testes e atividades de garantia de qualidade o mais cedo possível no ciclo de vida do desenvolvimento de software. O objetivo é encontrar e corrigir defeitos quando eles são mais baratos e fáceis de resolver.\n\n## Benefícios:\n- Redução de custos de correção de bugs.\n- Melhoria da qualidade do software.\n- Detecção precoce de problemas.\n- Maior colaboração entre equipes.\n\n## Como Implementar:\n- Revisões de código.\n- Testes de unidade e integração contínuos.\n- Automação de testes.\n- Envolvimento de QA desde o início do projeto.`,
        videoLink: null,
        image: null
      },
      {
        id: 'piramide-de-testes',
        title: 'Pirâmide de Testes',
        summary: 'Estratégia de testes com diferentes níveis e proporções.',
        markdownContent: `# Pirâmide de Testes\n\nA Pirâmide de Testes é um modelo conceitual que sugere uma estratégia de teste de software, dividindo os testes em diferentes níveis e indicando a proporção ideal de cada um. A ideia é ter muitos testes rápidos e baratos na base e poucos testes lentos e caros no topo.\n\n## Níveis:\n- **Testes de Unidade (Base):** Muitos, rápidos, baratos. Focam em componentes isolados.\n- **Testes de Integração (Meio):** Menos que os de unidade, um pouco mais lentos. Focam na interação entre componentes.\n- **Testes de UI/E2E (Topo):** Poucos, lentos, caros. Focam na experiência do usuário final através da interface.\n\n## Vantagens:\n- Feedback rápido.\n- Redução de custos.\n- Maior cobertura de código com menor esforço.`,
        videoLink: null,
        image: null
      },
    ],
  },
  {
    id: 'qa-no-agil',
    title: 'QA no Ágil',
    description: 'Entenda o papel do QA em metodologias ágeis como Scrum e Kanban.',
    icon: <GitBranch className="h-8 w-8 text-orange-600" />,
    color: 'bg-orange-50',
    items: [
      {
        id: 'bdd-gherkin',
        title: 'BDD e Gherkin',
        summary: 'Desenvolvimento Orientado por Comportamento e sua sintaxe.',
        markdownContent: `# BDD e Gherkin\n\nBDD (Behavior-Driven Development) é uma metodologia de desenvolvimento de software que visa fechar a lacuna de comunicação entre as equipes de negócio e técnicas. Ele descreve o comportamento do sistema em termos de recursos e cenários, usando uma linguagem ubíqua.\n\nGherkin é a linguagem de domínio específico (DSL) que o Cucumber (e outras ferramentas BDD) entende. Ela usa uma sintaxe simples e legível por humanos para descrever os comportamentos.\n\n## Palavras-chave Gherkin:\n- **Feature:** Descreve uma funcionalidade.\n- **Scenario:** Descreve um exemplo concreto de comportamento.\n- **Given:** Pré-condições.\n- **When:** Ação ou evento.\n- **Then:** Resultado esperado.\n- **And/But:** Para adicionar mais condições ou ações.\n\n## Benefícios:\n- Clareza nos requisitos.\n- Colaboração aprimorada.\n- Testes automatizados que servem como documentação viva.`,
        videoLink: null,
        image: null
      },
      {
        id: 'cultura-shift-left',
        title: 'Cultura Shift-Left',
        summary: 'Mover as atividades de qualidade para o início do ciclo de vida.',
        markdownContent: `# Cultura Shift-Left\n\nA Cultura Shift-Left é um conceito que incentiva a detecção e prevenção de defeitos o mais cedo possível no ciclo de desenvolvimento de software. Em vez de esperar até o final para testar, as atividades de qualidade são "deslocadas para a esquerda" (para o início do processo).\n\n## Princípios:\n- Testes contínuos.\n- Automação extensiva.\n- Colaboração entre desenvolvedores e QAs.\n- Feedback rápido.\n\n## Vantagens:\n- Redução de custos.\n- Melhoria da qualidade.\n- Entrega mais rápida de software.`,
        videoLink: null,
        image: null
      },
    ],
  },
];

const Content = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Conteúdos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-4xl font-bold text-center mb-10">Explore Nossos Conteúdos</h1>

      <div className="space-y-12">
        {contentCategories.map(category => (
          <section key={category.id} className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-6 space-x-4">
              <div className={`p-3 rounded-full ${category.color}`}>
                {category.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{category.title}</h2>
                <p className="text-lg text-muted-foreground">{category.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map(item => (
                <Card 
                  key={item.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  onClick={() => openModal(item)}
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">{item.summary}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      {selectedItem && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[900px] md:max-w-[1000px] lg:max-w-[1100px] xl:max-w-[1200px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold mb-2">{selectedItem.title}</DialogTitle>
              <DialogDescription>
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown>{selectedItem.markdownContent}</ReactMarkdown>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 space-y-6">
              {selectedItem.videoLink && (
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center"><Video className="mr-2" /> Vídeo Explicativo:</h3>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={selectedItem.videoLink}
                      title={selectedItem.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-lg shadow-md"
                    ></iframe>
                  </div>
                </div>
              )}
              {selectedItem.image && (
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center"><ImageIcon className="mr-2" /> Imagem Ilustrativa:</h3>
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title} 
                    className="w-full h-full rounded-lg shadow-md object-contain max-h-[400px]"
                  />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Content;


