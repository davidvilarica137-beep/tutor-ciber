import { DiagnosticQuestion } from '../types';

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    area: 'Python & Programação',
    question: 'Qual é a sua experiência prática com a linguagem Python?',
    options: [
      {
        label: 'Nunca escrevi uma linha de código ou estou começando do zero.',
        levelWeight: 'INICIANTE',
      },
      {
        label: 'Conheço variáveis, if/else, loops básicos e comando print.',
        levelWeight: 'BÁSICO',
      },
      {
        label: 'Crio funções, manipulo arquivos, listas, dicionários e trato exceções (try/except).',
        levelWeight: 'INTERMEDIÁRIO',
      },
      {
        label: 'Desenvolvo scripts com sockets, automação de rede, POO e bibliotecas como hashlib e requests.',
        levelWeight: 'AVANÇADO',
      },
    ],
  },
  {
    id: 2,
    area: 'Linux & Sistemas Operacionais',
    question: 'Como você avalia sua familiaridade com o terminal Linux?',
    options: [
      {
        label: 'Uso apenas interfaces gráficas (Windows/Mac) e não conheço comandos de terminal.',
        levelWeight: 'INICIANTE',
      },
      {
        label: 'Sei navegar em pastas (cd, ls, pwd, mkdir) e visualizar arquivos simples (cat).',
        levelWeight: 'BÁSICO',
      },
      {
        label: 'Entendo permissões (chmod, chown), processos (ps, kill), grep, pipes (|) e variáveis de ambiente.',
        levelWeight: 'INTERMEDIÁRIO',
      },
      {
        label: 'Administro serviços com systemd, configuro iptables/UFW, analiso logs e crio shell scripts complexos.',
        levelWeight: 'AVANÇADO',
      },
    ],
  },
  {
    id: 3,
    area: 'Redes & Protocolos',
    question: 'O que você sabe sobre redes de computadores e internet?',
    options: [
      {
        label: 'Sei apenas o básico do que é Wi-Fi e endereço de site.',
        levelWeight: 'INICIANTE',
      },
      {
        label: 'Sei o que é endereço IP, porta de rede (ex: 80, 443) e o que significa DNS.',
        levelWeight: 'BÁSICO',
      },
      {
        label: 'Compreendo a diferença entre TCP e UDP, o Handshake de 3 vias e métodos HTTP (GET, POST, PUT).',
        levelWeight: 'INTERMEDIÁRIO',
      },
      {
        label: 'Analiso tráfego com Wireshark/tcpdump, compreendo cabeçalhos TLS/SSL e roteamento avançado.',
        levelWeight: 'AVANÇADO',
      },
    ],
  },
  {
    id: 4,
    area: 'Cibersegurança & Práticas Defensivas',
    question: 'Qual o seu nível de contato com segurança da informação e AppSec?',
    options: [
      {
        label: 'Quero aprender do zero os conceitos de segurança, senhas e proteção.',
        levelWeight: 'INICIANTE',
      },
      {
        label: 'Já ouvi falar de malwares, phishing e da Tríade CIA (Confidencialidade, Integridade, Disponibilidade).',
        levelWeight: 'BÁSICO',
      },
      {
        label: 'Conheço vulnerabilidades comuns da OWASP (SQL Injection, XSS) e como usar hashes criptográficos (SHA-256).',
        levelWeight: 'INTERMEDIÁRIO',
      },
      {
        label: 'Realizo testes de penetração autorizados, configuro SIEM, aplico hardening e desenvolvo ferramentas defensivas.',
        levelWeight: 'AVANÇADO',
      },
    ],
  },
];
