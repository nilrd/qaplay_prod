import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, CheckCircle, XCircle, RotateCcw, Brain, Lightbulb } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const LogicProgrammingGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutos por desafio
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [testResult, setTestResult] = useState(null); // null, 'pass', 'fail'
  const [showExplanation, setShowExplanation] = useState(false);
  const timerRef = useRef(null);

  const challenges = [
    {
      id: 1,
      title: 'Função para Somar Números Pares',
      description: 'Escreva uma função JavaScript que receba um array de números e retorne a soma de todos os números pares.',
      language: 'JavaScript',
      expectedCode: `function sumEvenNumbers(arr) {\n  let sum = 0;\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] % 2 === 0) {\n      sum += arr[i];\n    }\n  }\n  return sum;\n}`,
      testCases: [
        { input: [1, 2, 3, 4, 5], expectedOutput: 6 },
        { input: [10, 20, 30], expectedOutput: 60 },
        { input: [1, 3, 5], expectedOutput: 0 }
      ],
      explanation: 'A função deve iterar sobre o array, verificar se cada número é par usando o operador de módulo (%), e somar os números pares.',
      type: 'Lógica de Programação'
    },
    {
      id: 2,
      title: 'Função para Encontrar o Maior Número',
      description: 'Escreva uma função JavaScript que receba um array de números e retorne o maior número.',
      language: 'JavaScript',
      expectedCode: `function findMax(arr) {\n  let max = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) {\n      max = arr[i];\n    }\n  }\n  return max;\n}`,
      testCases: [
        { input: [1, 5, 3, 9, 2], expectedOutput: 9 },
        { input: [-1, -5, -3], expectedOutput: -1 },
        { input: [42], expectedOutput: 42 }
      ],
      explanation: 'A função deve comparar cada elemento do array com o valor máximo atual e atualizar quando encontrar um valor maior.',
      type: 'Lógica de Programação'
    },
    {
      id: 3,
      title: 'Função para Contar Vogais',
      description: 'Escreva uma função JavaScript que receba uma string e retorne o número de vogais (a, e, i, o, u).',
      language: 'JavaScript',
      expectedCode: `function countVowels(str) {\n  const vowels = 'aeiouAEIOU';\n  let count = 0;\n  for (let i = 0; i < str.length; i++) {\n    if (vowels.includes(str[i])) {\n      count++;\n    }\n  }\n  return count;\n}`,
      testCases: [
        { input: 'hello', expectedOutput: 2 },
        { input: 'PROGRAMMING', expectedOutput: 3 },
        { input: 'xyz', expectedOutput: 0 }
      ],
      explanation: 'A função deve verificar cada caractere da string e contar quantos são vogais, considerando maiúsculas e minúsculas.',
      type: 'Lógica de Programação'
    },
    {
      id: 4,
      title: 'Função para Inverter String',
      description: 'Escreva uma função JavaScript que receba uma string e retorne ela invertida.',
      language: 'JavaScript',
      expectedCode: `function reverseString(str) {\n  let reversed = '';\n  for (let i = str.length - 1; i >= 0; i--) {\n    reversed += str[i];\n  }\n  return reversed;\n}`,
      testCases: [
        { input: 'hello', expectedOutput: 'olleh' },
        { input: 'JavaScript', expectedOutput: 'tpircSavaJ' },
        { input: 'a', expectedOutput: 'a' }
      ],
      explanation: 'A função deve percorrer a string de trás para frente e construir uma nova string com os caracteres na ordem inversa.',
      type: 'Lógica de Programação'
    },
    {
      id: 5,
      title: 'Função para Verificar Palíndromo',
      description: 'Escreva uma função JavaScript que verifique se uma string é um palíndromo (lê igual de frente para trás).',
      language: 'JavaScript',
      expectedCode: `function isPalindrome(str) {\n  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  const reversed = cleaned.split('').reverse().join('');\n  return cleaned === reversed;\n}`,
      testCases: [
        { input: 'racecar', expectedOutput: true },
        { input: 'hello', expectedOutput: false },
        { input: 'A man a plan a canal Panama', expectedOutput: true }
      ],
      explanation: 'A função deve limpar a string (remover espaços e caracteres especiais), converter para minúsculas e comparar com sua versão invertida.',
      type: 'Lógica de Programação'
    },
    {
      id: 6,
      title: 'Função para Calcular Fatorial',
      description: 'Escreva uma função JavaScript que calcule o fatorial de um número.',
      language: 'JavaScript',
      expectedCode: `function factorial(n) {\n  if (n === 0 || n === 1) {\n    return 1;\n  }\n  let result = 1;\n  for (let i = 2; i <= n; i++) {\n    result *= i;\n  }\n  return result;\n}`,
      testCases: [
        { input: 5, expectedOutput: 120 },
        { input: 0, expectedOutput: 1 },
        { input: 3, expectedOutput: 6 }
      ],
      explanation: 'O fatorial de n é o produto de todos os números inteiros positivos menores ou iguais a n. Por definição, 0! = 1.',
      type: 'Lógica de Programação'
    },
    {
      id: 7,
      title: 'Função para Verificar Número Primo',
      description: 'Escreva uma função JavaScript que verifique se um número é primo.',
      language: 'JavaScript',
      expectedCode: `function isPrime(n) {\n  if (n <= 1) return false;\n  if (n <= 3) return true;\n  if (n % 2 === 0 || n % 3 === 0) return false;\n  for (let i = 5; i * i <= n; i += 6) {\n    if (n % i === 0 || n % (i + 2) === 0) return false;\n  }\n  return true;\n}`,
      testCases: [
        { input: 7, expectedOutput: true },
        { input: 4, expectedOutput: false },
        { input: 17, expectedOutput: true }
      ],
      explanation: 'Um número primo é divisível apenas por 1 e por ele mesmo. A função otimiza verificando divisibilidade por 2, 3 e números da forma 6k±1.',
      type: 'Lógica de Programação'
    },
    {
      id: 8,
      title: 'Função para Remover Duplicatas',
      description: 'Escreva uma função JavaScript que remova elementos duplicados de um array.',
      language: 'JavaScript',
      expectedCode: `function removeDuplicates(arr) {\n  const unique = [];\n  for (let i = 0; i < arr.length; i++) {\n    if (!unique.includes(arr[i])) {\n      unique.push(arr[i]);\n    }\n  }\n  return unique;\n}`,
      testCases: [
        { input: [1, 2, 2, 3, 4, 4, 5], expectedOutput: [1, 2, 3, 4, 5] },
        { input: ['a', 'b', 'a', 'c'], expectedOutput: ['a', 'b', 'c'] },
        { input: [1, 1, 1], expectedOutput: [1] }
      ],
      explanation: 'A função deve criar um novo array contendo apenas os elementos únicos do array original, mantendo a ordem da primeira ocorrência.',
      type: 'Lógica de Programação'
    },
    {
      id: 9,
      title: 'Função para Ordenar Array',
      description: 'Escreva uma função JavaScript que ordene um array de números em ordem crescente usando bubble sort.',
      language: 'JavaScript',
      expectedCode: `function bubbleSort(arr) {\n  const sorted = [...arr];\n  for (let i = 0; i < sorted.length - 1; i++) {\n    for (let j = 0; j < sorted.length - i - 1; j++) {\n      if (sorted[j] > sorted[j + 1]) {\n        [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];\n      }\n    }\n  }\n  return sorted;\n}`,
      testCases: [
        { input: [64, 34, 25, 12, 22, 11, 90], expectedOutput: [11, 12, 22, 25, 34, 64, 90] },
        { input: [5, 2, 8, 1, 9], expectedOutput: [1, 2, 5, 8, 9] },
        { input: [1], expectedOutput: [1] }
      ],
      explanation: 'Bubble sort compara elementos adjacentes e os troca se estiverem na ordem errada, repetindo até que o array esteja ordenado.',
      type: 'Lógica de Programação'
    },
    {
      id: 10,
      title: 'Função para Calcular Fibonacci',
      description: 'Escreva uma função JavaScript que retorne o n-ésimo número da sequência de Fibonacci.',
      language: 'JavaScript',
      expectedCode: `function fibonacci(n) {\n  if (n <= 1) return n;\n  let a = 0, b = 1;\n  for (let i = 2; i <= n; i++) {\n    [a, b] = [b, a + b];\n  }\n  return b;\n}`,
      testCases: [
        { input: 0, expectedOutput: 0 },
        { input: 1, expectedOutput: 1 },
        { input: 6, expectedOutput: 8 }
      ],
      explanation: 'A sequência de Fibonacci começa com 0 e 1, e cada número subsequente é a soma dos dois anteriores.',
      type: 'Lógica de Programação'
    },
    {
      id: 11,
      title: 'Função para Validar CPF',
      description: 'Escreva uma função JavaScript que valide se um CPF está no formato correto (XXX.XXX.XXX-XX).',
      language: 'JavaScript',
      expectedCode: `function validateCPF(cpf) {\n  const regex = /^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$/;\n  return regex.test(cpf);\n}`,
      testCases: [
        { input: '123.456.789-10', expectedOutput: true },
        { input: '12345678910', expectedOutput: false },
        { input: '123.456.789-1', expectedOutput: false }
      ],
      explanation: 'A função usa uma expressão regular para verificar se o CPF está no formato XXX.XXX.XXX-XX com dígitos nas posições corretas.',
      type: 'Lógica de Programação'
    },
    {
      id: 12,
      title: 'Função para Contar Palavras',
      description: 'Escreva uma função JavaScript que conte o número de palavras em uma string.',
      language: 'JavaScript',
      expectedCode: `function countWords(str) {\n  if (!str.trim()) return 0;\n  return str.trim().split(/\\s+/).length;\n}`,
      testCases: [
        { input: 'Hello world', expectedOutput: 2 },
        { input: '  JavaScript   is   awesome  ', expectedOutput: 3 },
        { input: '', expectedOutput: 0 }
      ],
      explanation: 'A função remove espaços extras, divide a string por espaços em branco e conta os elementos resultantes.',
      type: 'Lógica de Programação'
    },
    {
      id: 13,
      title: 'Função para Converter Temperatura',
      description: 'Escreva uma função JavaScript que converta temperatura de Celsius para Fahrenheit.',
      language: 'JavaScript',
      expectedCode: `function celsiusToFahrenheit(celsius) {\n  return (celsius * 9/5) + 32;\n}`,
      testCases: [
        { input: 0, expectedOutput: 32 },
        { input: 100, expectedOutput: 212 },
        { input: -40, expectedOutput: -40 }
      ],
      explanation: 'A fórmula para converter Celsius para Fahrenheit é: F = (C × 9/5) + 32.',
      type: 'Lógica de Programação'
    },
    {
      id: 14,
      title: 'Função para Calcular Média',
      description: 'Escreva uma função JavaScript que calcule a média aritmética de um array de números.',
      language: 'JavaScript',
      expectedCode: `function calculateAverage(arr) {\n  if (arr.length === 0) return 0;\n  let sum = 0;\n  for (let i = 0; i < arr.length; i++) {\n    sum += arr[i];\n  }\n  return sum / arr.length;\n}`,
      testCases: [
        { input: [1, 2, 3, 4, 5], expectedOutput: 3 },
        { input: [10, 20, 30], expectedOutput: 20 },
        { input: [], expectedOutput: 0 }
      ],
      explanation: 'A média aritmética é a soma de todos os valores dividida pela quantidade de valores.',
      type: 'Lógica de Programação'
    },
    {
      id: 15,
      title: 'Função para Verificar Anagrama',
      description: 'Escreva uma função JavaScript que verifique se duas strings são anagramas.',
      language: 'JavaScript',
      expectedCode: `function areAnagrams(str1, str2) {\n  const normalize = str => str.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');\n  return normalize(str1) === normalize(str2);\n}`,
      testCases: [
        { input: ['listen', 'silent'], expectedOutput: true },
        { input: ['hello', 'world'], expectedOutput: false },
        { input: ['A gentleman', 'Elegant man'], expectedOutput: true }
      ],
      explanation: 'Anagramas são palavras formadas pelas mesmas letras em ordem diferente. A função normaliza e ordena as letras para comparação.',
      type: 'Lógica de Programação'
    },
    {
      id: 16,
      title: 'Função para Gerar Números Aleatórios',
      description: 'Escreva uma função JavaScript que gere um número aleatório entre dois valores (inclusive).',
      language: 'JavaScript',
      expectedCode: `function randomBetween(min, max) {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}`,
      testCases: [
        { input: [1, 10], expectedOutput: 'between 1 and 10' },
        { input: [5, 5], expectedOutput: 5 },
        { input: [-5, 5], expectedOutput: 'between -5 and 5' }
      ],
      explanation: 'A função usa Math.random() para gerar um número entre 0 e 1, depois escala para o intervalo desejado.',
      type: 'Lógica de Programação'
    },
    {
      id: 17,
      title: 'Função para Capitalizar Palavras',
      description: 'Escreva uma função JavaScript que capitalize a primeira letra de cada palavra em uma string.',
      language: 'JavaScript',
      expectedCode: `function capitalizeWords(str) {\n  return str.split(' ').map(word => \n    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()\n  ).join(' ');\n}`,
      testCases: [
        { input: 'hello world', expectedOutput: 'Hello World' },
        { input: 'javaScript programming', expectedOutput: 'Javascript Programming' },
        { input: 'a', expectedOutput: 'A' }
      ],
      explanation: 'A função divide a string em palavras, capitaliza a primeira letra de cada uma e junta novamente.',
      type: 'Lógica de Programação'
    },
    {
      id: 18,
      title: 'Função para Encontrar Segundo Maior',
      description: 'Escreva uma função JavaScript que encontre o segundo maior número em um array.',
      language: 'JavaScript',
      expectedCode: `function findSecondLargest(arr) {\n  const unique = [...new Set(arr)].sort((a, b) => b - a);\n  return unique.length >= 2 ? unique[1] : null;\n}`,
      testCases: [
        { input: [1, 3, 4, 5, 2], expectedOutput: 4 },
        { input: [10, 10, 10], expectedOutput: null },
        { input: [1, 2], expectedOutput: 1 }
      ],
      explanation: 'A função remove duplicatas, ordena em ordem decrescente e retorna o segundo elemento, ou null se não existir.',
      type: 'Lógica de Programação'
    },
    {
      id: 19,
      title: 'Função para Validar Email',
      description: 'Escreva uma função JavaScript que valide se um email tem formato básico válido.',
      language: 'JavaScript',
      expectedCode: `function validateEmail(email) {\n  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n  return regex.test(email);\n}`,
      testCases: [
        { input: 'test@example.com', expectedOutput: true },
        { input: 'invalid.email', expectedOutput: false },
        { input: 'user@domain.co.uk', expectedOutput: true }
      ],
      explanation: 'A função usa uma expressão regular para verificar o formato básico de email: texto@dominio.extensao.',
      type: 'Lógica de Programação'
    },
    {
      id: 20,
      title: 'Função para Calcular Potência',
      description: 'Escreva uma função JavaScript que calcule a potência de um número (base^expoente) sem usar Math.pow.',
      language: 'JavaScript',
      expectedCode: `function power(base, exponent) {\n  if (exponent === 0) return 1;\n  let result = 1;\n  for (let i = 0; i < Math.abs(exponent); i++) {\n    result *= base;\n  }\n  return exponent < 0 ? 1 / result : result;\n}`,
      testCases: [
        { input: [2, 3], expectedOutput: 8 },
        { input: [5, 0], expectedOutput: 1 },
        { input: [2, -2], expectedOutput: 0.25 }
      ],
      explanation: 'A função multiplica a base por ela mesma o número de vezes indicado pelo expoente, tratando casos especiais como expoente 0 e negativo.',
      type: 'Lógica de Programação'
    }
  ];

  const currentChallenge = challenges[currentChallengeIndex];

  const startGame = () => {
    setGameStarted(true);
    setCurrentChallengeIndex(0);
    setUserCode('');
    setTestResult(null);
    setShowExplanation(false);
    setTimeLeft(120);
    startTimer();
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          handleTestCode(); // Testar automaticamente quando o tempo acabar
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (gameStarted) {
      startTimer();
    }
    return () => clearInterval(timerRef.current);
  }, [gameStarted, currentChallengeIndex]);

  const handleTestCode = () => {
    clearInterval(timerRef.current);
    // Simulação de execução de código e teste
    const normalizedUserCode = userCode.replace(/\s/g, '').toLowerCase();
    const normalizedExpectedCode = currentChallenge.expectedCode.replace(/\s/g, '').toLowerCase();

    if (currentChallenge.testCases) {
      // Lógica para testar funções com casos de teste
      let allTestsPass = true;
      try {
        // eslint-disable-next-line no-eval
        const userFunction = eval(`(${userCode})`);
        for (const testCase of currentChallenge.testCases) {
          const result = Array.isArray(testCase.input) ? userFunction(...testCase.input) : userFunction(testCase.input);
          if (typeof testCase.expectedOutput === 'string' && testCase.expectedOutput.includes('between')) {
            // Para casos de números aleatórios, apenas verifica se é um número
            if (typeof result !== 'number') {
              allTestsPass = false;
              break;
            }
          } else if (result !== testCase.expectedOutput) {
            allTestsPass = false;
            break;
          }
        }
      } catch (e) {
        allTestsPass = false; // Erro de sintaxe ou execução
      }
      setTestResult(allTestsPass ? 'pass' : 'fail');
    } else {
      // Comparação simples de string para outros tipos de código
      setTestResult(normalizedUserCode.includes(normalizedExpectedCode) ? 'pass' : 'fail');
    }
    setShowExplanation(true);
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(prevIndex => prevIndex + 1);
      setUserCode('');
      setTestResult(null);
      setShowExplanation(false);
      setTimeLeft(120);
    } else {
      // Fim do jogo
      setGameStarted(false);
      alert('Parabéns! Você completou todos os desafios de lógica de programação!');
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentChallengeIndex(0);
    setUserCode('');
    setTestResult(null);
    setShowExplanation(false);
    setTimeLeft(120);
  };

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Lógica de Programação</CardTitle>
            <CardDescription className="text-lg">
              Fortaleça sua base com 20 exercícios de lógica de programação em JavaScript.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-xl">Sobre o Jogo:</h3>
              <p className="text-sm text-muted-foreground text-left">
                Desenvolva suas habilidades de lógica de programação com 20 desafios práticos em JavaScript. Cada exercício foi cuidadosamente selecionado para fortalecer conceitos fundamentais de programação.
              </p>
              <h3 className="font-semibold text-xl">Como Jogar:</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Você receberá um problema de lógica de programação.</li>
                <li>• Escreva sua função JavaScript na área de texto fornecida.</li>
                <li>• Clique em "Testar Código" para verificar sua solução.</li>
                <li>• Você terá 2 minutos para cada desafio.</li>
                <li>• Sua solução será testada com casos de teste automáticos.</li>
              </ul>
              <h3 className="font-semibold text-xl">O que você vai aprender:</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>• Manipulação de arrays e strings</li>
                <li>• Estruturas de repetição e condicionais</li>
                <li>• Algoritmos de ordenação e busca</li>
                <li>• Validação de dados e expressões regulares</li>
                <li>• Conceitos matemáticos aplicados à programação</li>
              </ul>
            </div>
            <Button onClick={startGame} size="lg" className="w-full">
              <Brain className="mr-2 h-5 w-5" />
              Começar Desafio ({challenges.length} questões)
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Desafio {currentChallengeIndex + 1} de {challenges.length}: {currentChallenge.title}</h2>
        <div className="flex items-center space-x-2">
          <Timer className="h-5 w-5" />
          <span className={`font-mono text-lg ${timeLeft <= 30 ? 'text-red-500' : ''}`}>
            {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{ (timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{currentChallenge.description}</CardTitle>
          <CardDescription>
            Linguagem: <Badge variant="secondary">{currentChallenge.language}</Badge>
            <Badge variant="outline" className="ml-2">{currentChallenge.type}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label htmlFor="user-code">Seu Código:</Label>
          <Textarea
            id="user-code"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            placeholder="Escreva sua função aqui..."
            rows={10}
            className="font-mono"
          />
          <Button onClick={handleTestCode} className="w-full" size="lg" disabled={showExplanation}>
            Testar Código
          </Button>

          {showExplanation && (
            <div className={`mt-6 p-4 rounded-lg border ${testResult === 'pass' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
              <h4 className="font-semibold mb-2">
                {testResult === 'pass' ? (<CheckCircle className="inline-block mr-2 h-5 w-5" />) : (<XCircle className="inline-block mr-2 h-5 w-5" />)}
                {testResult === 'pass' ? 'Parabéns! Seu código passou nos testes!' : 'Seu código falhou nos testes.'}
              </h4>
              <p className="text-sm">{currentChallenge.explanation}</p>
              {testResult === 'fail' && (
                <div className="mt-2">
                  <h5 className="font-semibold">Solução Esperada:</h5>
                  <pre className="bg-gray-100 p-2 rounded-md text-xs overflow-auto"><code>{currentChallenge.expectedCode}</code></pre>
                </div>
              )}
            </div>
          )}

          {showExplanation && (
            <Button onClick={handleNextChallenge} className="w-full" size="lg">
              {currentChallengeIndex < challenges.length - 1 ? 'Próximo Desafio' : 'Finalizar Jogo'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LogicProgrammingGame;

