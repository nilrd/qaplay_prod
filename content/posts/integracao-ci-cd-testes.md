# Integração CI/CD com Testes: Automatizando a Qualidade

A integração de testes em pipelines de CI/CD (Continuous Integration/Continuous Deployment) é fundamental para garantir a qualidade do software em cada etapa do desenvolvimento. Este guia aborda como implementar uma estratégia eficaz de testes em pipelines automatizados.

## O que é CI/CD?

**Continuous Integration (CI)**: Prática de integrar código frequentemente, executando testes automatizados a cada commit.

**Continuous Deployment (CD)**: Extensão do CI que automatiza o deploy de código que passou por todos os testes.

## Benefícios da Integração CI/CD com Testes

- ✅ **Feedback Rápido**: Detecção precoce de problemas
- ✅ **Qualidade Consistente**: Testes executados automaticamente
- ✅ **Redução de Riscos**: Menos bugs em produção
- ✅ **Eficiência**: Menos intervenção manual
- ✅ **Confiabilidade**: Deploys mais seguros

## Estratégia de Testes em Pipeline

### Pirâmide de Testes no CI/CD

```
┌─────────────────┐
│   E2E Tests     │ ← Poucos, lentos, ambiente staging
├─────────────────┤
│ Integration     │ ← Médios, APIs e serviços
│    Tests        │
├─────────────────┤
│   Unit Tests    │ ← Muitos, rápidos, a cada commit
└─────────────────┘
```

### Fases do Pipeline

1. **Build**: Compilação e testes unitários
2. **Test**: Testes de integração e API
3. **Deploy Staging**: Deploy em ambiente de teste
4. **E2E Tests**: Testes end-to-end
5. **Deploy Production**: Deploy em produção

## Implementação com GitHub Actions

### Pipeline Básico

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Java
        uses: actions/setup-java@v3
        with:
          java-version: '11'
          distribution: 'temurin'
      
      - name: Cache Maven dependencies
        uses: actions/cache@v3
        with:
          path: ~/.m2
          key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}
      
      - name: Run Unit Tests
        run: mvn clean test
      
      - name: Generate Test Report
        uses: dorny/test-reporter@v1
        if: success() || failure()
        with:
          name: Unit Test Results
          path: target/surefire-reports/*.xml
          reporter: java-junit

  integration-tests:
    needs: unit-tests
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Java
        uses: actions/setup-java@v3
        with:
          java-version: '11'
          distribution: 'temurin'
      
      - name: Run Integration Tests
        run: mvn verify -Pintegration-tests
        env:
          DB_URL: jdbc:postgresql://localhost:5432/testdb
          DB_USER: postgres
          DB_PASSWORD: postgres

  e2e-tests:
    needs: integration-tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Start application
        run: |
          npm start &
          npx wait-on http://localhost:3000
      
      - name: Run E2E Tests
        run: npx cypress run
      
      - name: Upload Screenshots
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: cypress-screenshots
          path: cypress/screenshots

  deploy:
    needs: [unit-tests, integration-tests, e2e-tests]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Production
        run: echo "Deploying to production..."
```

## Implementação com Jenkins

### Jenkinsfile Declarativo

```groovy
pipeline {
    agent any
    
    tools {
        maven 'Maven-3.8.1'
        jdk 'JDK-11'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Unit Tests') {
            steps {
                sh 'mvn clean test'
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml'
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'target/site/jacoco',
                        reportFiles: 'index.html',
                        reportName: 'Code Coverage Report'
                    ])
                }
            }
        }
        
        stage('Integration Tests') {
            steps {
                sh 'mvn verify -Pintegration-tests'
            }
            post {
                always {
                    junit 'target/failsafe-reports/*.xml'
                }
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'mvn sonar:sonar'
                }
            }
        }
        
        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        
        stage('Deploy to Staging') {
            steps {
                sh 'docker build -t myapp:${BUILD_NUMBER} .'
                sh 'docker run -d -p 8080:8080 myapp:${BUILD_NUMBER}'
            }
        }
        
        stage('E2E Tests') {
            steps {
                sh 'mvn test -Pe2e-tests'
            }
            post {
                always {
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'target/cucumber-reports',
                        reportFiles: 'index.html',
                        reportName: 'E2E Test Report'
                    ])
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                input message: 'Deploy to production?', ok: 'Deploy'
                sh 'kubectl apply -f k8s/production/'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        failure {
            emailext (
                subject: "Build Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: "Build failed. Check console output at ${env.BUILD_URL}",
                to: "${env.CHANGE_AUTHOR_EMAIL}"
            )
        }
    }
}
```

## Testes de API no Pipeline

### Exemplo com REST Assured

```java
@Test
public void shouldReturnUserWhenValidIdProvided() {
    given()
        .baseUri(System.getProperty("api.base.url", "http://localhost:8080"))
        .pathParam("id", 1)
    .when()
        .get("/api/users/{id}")
    .then()
        .statusCode(200)
        .body("id", equalTo(1))
        .body("name", notNullValue());
}
```

### Configuração de Ambiente

```yaml
# application-test.yml
spring:
  datasource:
    url: ${DB_URL:jdbc:h2:mem:testdb}
    username: ${DB_USER:sa}
    password: ${DB_PASSWORD:}
  jpa:
    hibernate:
      ddl-auto: create-drop
```

## Testes de Performance no CI/CD

### JMeter no Pipeline

```yaml
- name: Performance Tests
  run: |
    jmeter -n -t performance-tests.jmx -l results.jtl
    jmeter -g results.jtl -o performance-report/
    
- name: Upload Performance Report
  uses: actions/upload-artifact@v3
  with:
    name: performance-report
    path: performance-report/
```

## Estratégias de Paralelização

### Testes Paralelos

```yaml
strategy:
  matrix:
    browser: [chrome, firefox, edge]
    
steps:
  - name: Run E2E Tests
    run: npm run test:e2e -- --browser=${{ matrix.browser }}
```

### Divisão por Módulos

```yaml
jobs:
  test-module-1:
    runs-on: ubuntu-latest
    steps:
      - name: Test User Module
        run: mvn test -Dtest=UserModuleTest
        
  test-module-2:
    runs-on: ubuntu-latest
    steps:
      - name: Test Product Module
        run: mvn test -Dtest=ProductModuleTest
```

## Monitoramento e Alertas

### Métricas Importantes

- **Build Success Rate**: Taxa de sucesso dos builds
- **Test Coverage**: Cobertura de código
- **Test Execution Time**: Tempo de execução dos testes
- **Flaky Test Rate**: Taxa de testes instáveis

### Configuração de Alertas

```yaml
- name: Notify Slack on Failure
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: failure
    channel: '#ci-cd'
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## Boas Práticas

### 1. Fail Fast
- Execute testes mais rápidos primeiro
- Pare o pipeline no primeiro erro crítico

### 2. Ambientes Isolados
- Use containers para isolamento
- Limpe dados entre execuções

### 3. Versionamento de Testes
- Versione testes junto com o código
- Use branches para mudanças experimentais

### 4. Feedback Rápido
- Notifique desenvolvedores imediatamente
- Forneça logs detalhados

## Ferramentas Recomendadas

### CI/CD Platforms
- **GitHub Actions**: Integração nativa com GitHub
- **Jenkins**: Flexível e extensível
- **GitLab CI**: Integrado ao GitLab
- **Azure DevOps**: Ecossistema Microsoft

### Containers e Orquestração
- **Docker**: Containerização
- **Kubernetes**: Orquestração
- **Docker Compose**: Ambientes locais

## Conclusão

A integração eficaz de testes em pipelines CI/CD é essencial para entregar software de qualidade rapidamente. Com as práticas e ferramentas certas, você pode criar um pipeline robusto que garante a qualidade em cada etapa do desenvolvimento.

![CI/CD Pipeline](https://via.placeholder.com/600x300.png?text=CI%2FCD+Pipeline+with+Tests)

*Imagem ilustrativa: Pipeline CI/CD com integração de testes.*

