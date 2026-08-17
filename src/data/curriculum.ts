import { TrackInfo, LessonModule } from '../types';

export const TRACKS: TrackInfo[] = [
  {
    id: 'python',
    number: 1,
    title: 'Python: Fundamentos & Lógica',
    shortDescription:
      'Variáveis, tipos, operadores, I/O, condicionais, loops, listas, tuplas, dicionários, sets, funções, escopo, módulos, exceções, arquivos, JSON, POO e lógica.',
    officialTopics: [
      'variáveis',
      'tipos de dados',
      'operadores',
      'entrada e saída',
      'condicionais',
      'loops',
      'listas',
      'tuplas',
      'dicionários',
      'conjuntos (sets)',
      'funções',
      'escopo',
      'módulos',
      'tratamento de exceções',
      'arquivos',
      'JSON',
      'programação orientada a objetos',
      'fundamentos de APIs',
      'exercícios de lógica',
    ],
    icon: 'Code2',
    color: 'emerald',
    badge: 'Base de Programação',
    modulesCount: 8,
  },
  {
    id: 'linux',
    number: 2,
    title: 'Linux & Linha de Comando',
    shortDescription:
      'Terminal, navegação (pwd, ls, cd), manipulação (mkdir, touch, cp, mv, rm, cat, less), filtros (grep, find, head, tail, sort, uniq, pipes), permissões (chmod, chown), processos (ps, top, kill, systemctl), usuários e scripts Bash.',
    officialTopics: [
      'terminal',
      'pwd, ls, cd',
      'mkdir, touch, cp, mv, rm',
      'cat, less',
      'grep, find',
      'head, tail, sort, uniq',
      'pipes (|) e redirecionamento (>, >>)',
      'permissões e octais',
      'chmod e chown',
      'processos (ps, top, kill)',
      'systemctl e serviços',
      'usuários e grupos (/etc/passwd, /etc/shadow)',
      'Bash e variáveis de ambiente',
      'scripts Bash defensivos',
    ],
    icon: 'Terminal',
    color: 'cyan',
    badge: 'Sistema Operacional',
    modulesCount: 8,
  },
  {
    id: 'networks',
    number: 3,
    title: 'Redes de Computadores',
    shortDescription:
      'Modelo TCP/IP, IPv4, máscara, gateway, DNS, DHCP, ARP, TCP vs UDP, portas, sockets, Handshake SYN/SYN-ACK/ACK, HTTP/HTTPS, roteamento e diagnóstico de rede.',
    officialTopics: [
      'modelo TCP/IP',
      'endereçamento IPv4 e classes',
      'máscara de sub-rede e CIDR',
      'gateway padrão',
      'DNS e resolução de nomes',
      'DHCP e atribuição dinâmica',
      'ARP e tabela de vizinhos',
      'TCP vs UDP',
      'portas e serviços IANA',
      'sockets de rede',
      'TCP 3-Way Handshake (SYN, SYN-ACK, ACK)',
      'HTTP vs HTTPS',
      'roteamento e saltos',
      'ferramentas de diagnóstico (ping, traceroute, netstat, nmap)',
    ],
    icon: 'Network',
    color: 'blue',
    badge: 'Comunicação e Protocolos',
    modulesCount: 8,
  },
  {
    id: 'cyber_fundamentals',
    number: 4,
    title: 'Fundamentos de Cibersegurança',
    shortDescription:
      'Tríade CIA (Confidencialidade, Integridade, Disponibilidade), autenticação, autorização, controle de acesso, ameaças, riscos, vulnerabilidades, hashes, salt, criptografia simétrica/assimétrica, certificados e assinatura digital.',
    officialTopics: [
      'Tríade CIA (Confidencialidade, Integridade, Disponibilidade)',
      'autenticação vs autorização',
      'controle de acesso (RBAC, DAC, MAC)',
      'ameaças, riscos e vulnerabilidades',
      'funções hash criptográficas (SHA-256, MD5)',
      'salt criptográfico e entropia',
      'criptografia simétrica (AES)',
      'criptografia assimétrica (RSA, ECC)',
      'chaves públicas e privadas',
      'certificados digitais X.509 e PKI',
      'assinatura digital e não-repúdio',
      'princípios do menor privilégio e defesa em profundidade',
    ],
    icon: 'Shield',
    color: 'indigo',
    badge: 'Pilar de Segurança',
    modulesCount: 8,
  },
  {
    id: 'app_sec',
    number: 5,
    title: 'Segurança de Aplicações',
    shortDescription:
      'OWASP Top 10, SQL Injection, XSS, Broken Access Control, autenticação insegura, falhas de configuração, exposição de dados, SSRF, validação de entrada, consultas parametrizadas e desenvolvimento seguro.',
    officialTopics: [
      'OWASP e OWASP Top 10',
      'SQL Injection (SQLi)',
      'Cross-Site Scripting (XSS)',
      'Broken Access Control',
      'autenticação insegura e quebra de sessão',
      'falhas de configuração (Security Misconfiguration)',
      'exposição de dados sensíveis',
      'Server-Side Request Forgery (SSRF)',
      'validação e sanitização de entrada',
      'parametrização de consultas (Prepared Statements)',
      'prevenção e modelagem de ameaças',
      'práticas de desenvolvimento seguro (DevSecOps)',
    ],
    icon: 'Lock',
    color: 'rose',
    badge: 'AppSec & OWASP',
    modulesCount: 8,
  },
  {
    id: 'web_protocols',
    number: 6,
    title: 'Web & Protocolos',
    shortDescription:
      'Funcionamento da Web, HTTP request/response, métodos (GET, POST, PUT, PATCH, DELETE), status codes, headers de segurança, cookies (HttpOnly, Secure, SameSite), sessões, HTTPS, TLS, CORS e segurança do navegador.',
    officialTopics: [
      'funcionamento da Web cliente-servidor',
      'estrutura do HTTP Request e HTTP Response',
      'métodos HTTP (GET, POST, PUT, PATCH, DELETE)',
      'códigos de status HTTP (1xx, 2xx, 3xx, 4xx, 5xx)',
      'headers de segurança (HSTS, CSP, X-Frame-Options)',
      'cookies de sessão e autenticação',
      'flags de cookies: HttpOnly, Secure, SameSite',
      'gerenciamento seguro de sessões e JWT',
      'HTTPS e handshake TLS/SSL',
      'CORS (Cross-Origin Resource Sharing)',
      'conceitos de segurança de navegador e SOP',
    ],
    icon: 'Globe',
    color: 'violet',
    badge: 'Arquitetura Web',
    modulesCount: 8,
  },
  {
    id: 'vuln_analysis',
    number: 7,
    title: 'Análise de Vulnerabilidades',
    shortDescription:
      'Diferença entre vulnerabilidade, ameaça e risco; catálogo CVE, pontuação CVSS, superfície de ataque, identificação de ativos, enumeração, análise de versões, priorização de riscos e relatórios de correção.',
    officialTopics: [
      'diferença: vulnerabilidade vs ameaça vs risco',
      'catálogo CVE (Common Vulnerabilities and Exposures)',
      'métrica CVSS (v3/v4) e pontuação de severidade',
      'mapeamento de superfície de ataque',
      'identificação e inventário de ativos',
      'enumeração e varredura de versões',
      'análise e interpretação de vulnerabilidades',
      'matriz de probabilidade e impacto (priorização)',
      'elaboração de relatórios técnicos e executivos',
      'recomendações e planos de correção/mitigação',
    ],
    icon: 'Search',
    color: 'amber',
    badge: 'Auditoria de Riscos',
    modulesCount: 8,
  },
  {
    id: 'defensive_sec',
    number: 8,
    title: 'Segurança Defensiva / Blue Team',
    shortDescription:
      'Princípios de defesa, hardening de sistemas, firewalls e tabelas iptables, logs de eventos, análise forense básica, Indicadores de Comprometimento (IoCs), monitoramento, resposta a incidentes, SIEM e medidas de contenção.',
    officialTopics: [
      'princípios de defesa e blindagem (Hardening)',
      'firewall e elaboração de regras (iptables / UFW)',
      'gerenciamento e retenção de logs (/var/log)',
      'análise defensiva de logs de autenticação e acesso',
      'Indicadores de Comprometimento (IoCs)',
      'monitoramento contínuo e detecção de anomalias',
      'ciclo de resposta a incidentes (NIST / SANS)',
      'princípios de SIEM (Security Information and Event Management)',
      'eventos de auditoria e correlação de alertas',
      'análise básica de tráfego de rede (PCAP)',
      'medidas de contenção e isolamento de hosts',
    ],
    icon: 'ShieldAlert',
    color: 'sky',
    badge: 'Blue Team & Resposta',
    modulesCount: 8,
  },
  {
    id: 'pentest_ethics',
    number: 9,
    title: 'Pentest em Ambientes Autorizados',
    shortDescription:
      'Ética profissional e legalidade, escopo, regras de engajamento, metodologia de teste de intrusão, reconhecimento, enumeração, validação controlada, documentação de evidências, relatórios e reteste em labs/CTFs.',
    officialTopics: [
      'ética profissional e limites legais (Art. 154-A / LGPD)',
      'autorização formal (Termo de Consentimento)',
      'definição de escopo e ativos permitidos',
      'regras de engajamento (RoE)',
      'metodologias de pentest (PTES, OSSTMM, OWASP)',
      'reconhecimento passivo e ativo',
      'enumeração de serviços em laboratórios autorizados',
      'validação controlada de vulnerabilidades (PoC)',
      'coleta ética e preservação de evidências',
      'elaboração de relatório técnico e executivo',
      'plano de remediação e processo de reteste',
    ],
    icon: 'Crosshair',
    color: 'orange',
    badge: 'Ética & Metodologia',
    modulesCount: 8,
  },
  {
    id: 'sec_automation',
    number: 10,
    title: 'Automação com Python',
    shortDescription:
      'Automação de tarefas de segurança, manipulação de arquivos, JSON, CSV, expressões regulares (regex), biblioteca requests, parsing de logs, automação defensiva, parsers de segurança, scanners autorizados e relatórios.',
    officialTopics: [
      'automação de tarefas repetitivas com Python',
      'manipulação avançada de arquivos (open, with)',
      'leitura e gravação de arquivos JSON e CSV',
      'expressões regulares (módulo re) para IOCs e IPs',
      'requisições HTTP automatizadas com requests',
      'parsing e extração estruturada de dados',
      'processamento em lote de logs de segurança',
      'análise estatística básica de alertas de segurança',
      'automação de rotinas defensivas de checagem',
      'parsers de auditoria e verificação de configurações',
      'scanners de integridade para ambientes autorizados',
      'geração automatizada de relatórios em texto e Markdown',
    ],
    icon: 'Zap',
    color: 'yellow',
    badge: 'Scripts & Automação',
    modulesCount: 8,
  },
];

export const CURRICULUM_MODULES: LessonModule[] = [
  // ==========================================
  // ÁREA 1: PYTHON FUNDAMENTOS & LÓGICA
  // ==========================================
  {
    id: 'py-01-fundamentos',
    trackId: 'python',
    stage: 'fundamentos',
    title: 'Variáveis, Tipos de Dados e Operadores',
    level: 'INICIANTE',
    topicsCovered: ['variáveis', 'tipos de dados', 'operadores', 'entrada e saída'],
    conceptSummary:
      'Uma variável é como uma caixa etiquetada na memória do computador onde guardamos uma informação. Em Python, não precisamos declarar o tipo da caixa: se colocamos texto ("admin"), ela vira string (`str`); se colocamos um número inteiro (443), vira `int`; se colocamos verdadeiro/falso (True/False), vira `bool`.',
    detailedExplanation:
      'Na segurança da informação, utilizamos variáveis o tempo todo para representar estados de conexão, contadores de tentativas de login, flags de privilégio de usuário e endereços IP.\n\n- `str`: Textos e credenciais (`username = "analista_dnf"`)\n- `int`: Portas e contagens (`porta = 8080`)\n- `bool`: Status de segurança (`conexao_segura = True`)\n- `float`: Métricas de risco ou tempo (`tempo_resposta = 0.042`)',
    codeExample: `# Definição de variáveis de auditoria
usuario = "aluno_dnf"
tentativas_falhas = 3
limite_maximo = 5
bloqueado = tentativas_falhas >= limite_maximo

print(f"Usuário: {usuario}")
print(f"Tentativas: {tentativas_falhas}/{limite_maximo}")
print(f"Conta Bloqueada? {bloqueado}")`,
    lineByLineExplanation: [
      { line: 2, code: 'usuario = "aluno_dnf"', explanation: 'Cria uma variável string chamada "usuario" com o nome do operador.' },
      { line: 3, code: 'tentativas_falhas = 3', explanation: 'Atribui um número inteiro representando logins incorretos.' },
      { line: 4, code: 'limite_maximo = 5', explanation: 'Define o limite máximo permitido pela política de senhas.' },
      { line: 5, code: 'bloqueado = tentativas_falhas >= limite_maximo', explanation: 'Aplica operador de comparação (>=). Retorna False pois 3 não é maior ou igual a 5.' },
      { line: 7, code: 'print(...)', explanation: 'Exibe os dados formatados no console usando f-strings.' },
    ],
    comprehensionQuestion: {
      id: 'cq-py-01',
      question: 'Se a variável `porta` receber o valor "8080" (entre aspas), qual será seu tipo de dado no Python?',
      options: [
        'int (número inteiro)',
        'str (texto / string)',
        'bool (booleano)',
        'float (ponto flutuante)',
      ],
      correctIndex: 1,
      explanation: 'Qualquer valor delimitado por aspas duplas ou simples é interpretado pelo Python como uma string (`str`), mesmo que contenha apenas dígitos numéricos.',
    },
    exercise: {
      id: 'ex-py-01',
      title: 'Auditor de Porta e Protocolo Seguro',
      stage: 'fundamentos',
      objective: 'Crie uma variável `porta_alvo` com a porta 443 e uma booleana `usa_ssl = True`. Verifique se a porta é segura.',
      instructions: [
        '1. Declare a variável `porta_alvo = 443` como número inteiro.',
        '2. Declare a variável `usa_ssl = True` como booleano.',
        '3. Use um `if` para imprimir "[+] Conexão Segura" se a porta for 443 e `usa_ssl` for True.',
      ],
      starterCode: `# Complete o código do auditor
porta_alvo = 443
usa_ssl = True

# Escreva sua condicional aqui:
if porta_alvo == 443 and usa_ssl:
    print("[+] Conexão Segura")
else:
    print("[-] Conexão Insegura")`,
      hint1: 'Lembre-se de que no Python usamos `and` para verificar se duas condições são verdadeiras simultaneamente.',
      hint2: 'A sintaxe é: `if porta_alvo == 443 and usa_ssl:` seguido de bloco indentado.',
      solutionCode: `porta_alvo = 443
usa_ssl = True

if porta_alvo == 443 and usa_ssl:
    print("[+] Conexão Segura")
else:
    print("[-] Conexão Insegura")`,
      solutionExplanation: 'Utilizamos o operador lógico `and` para assegurar que ambas as premissas de segurança estejam satisfeitas.',
    },
  },

  // ==========================================
  // ÁREA 2: LINUX & LINHA DE COMANDO
  // ==========================================
  {
    id: 'linux-01-fundamentos',
    trackId: 'linux',
    stage: 'fundamentos',
    title: 'Navegação e Permissões Seguras (chmod/grep)',
    level: 'INICIANTE',
    topicsCovered: ['terminal', 'pwd, ls, cd', 'permissões e octais', 'chmod e chown', 'grep, find'],
    conceptSummary:
      'No Linux, tudo é tratado como arquivo ou fluxo de dados. A segurança do sistema repousa em três conjuntos de permissões fundamentais: Leitura (r = 4), Escrita (w = 2) e Execução (x = 1), distribuídos entre Usuário Dono (Owner), Grupo (Group) e Outros (Others).',
    detailedExplanation:
      'Uma das maiores causas de incidentes em servidores Linux é o uso inadequado de permissões relaxadas como `chmod 777` em arquivos confidenciais. Arquivos com chaves privadas (.pem) e senhas (.env) devem receber `chmod 600` (leitura e escrita apenas pelo dono).\n\nAlém disso, comandos de filtro como `grep` e `pipes (|)` permitem que analistas de segurança processem gigabytes de logs em segundos.',
    codeExample: `# Comandos essenciais de auditoria Linux
# 1. Listar permissões detalhadas
ls -la /etc/shadow

# 2. Restringir chave privada para somente leitura/escrita do dono
chmod 600 chave_privada.key

# 3. Filtrar tentativas de login falhas
grep "Failed password" /var/log/auth.log`,
    lineByLineExplanation: [
      { line: 2, code: 'ls -la /etc/shadow', explanation: 'Lista em formato longo (-l) e incluindo ocultos (-a) o arquivo com hashes de senhas dos usuários.' },
      { line: 5, code: 'chmod 600 chave_privada.key', explanation: 'Atribui permissão rw------- (4+2=6 para o dono, 0 para grupo, 0 para outros).' },
      { line: 8, code: 'grep "Failed password" /var/log/auth.log', explanation: 'Busca a string exata de falha no log de autenticação do Linux.' },
    ],
    comprehensionQuestion: {
      id: 'cq-linux-01',
      question: 'Qual valor numérico octal representa a permissão onde o dono pode ler e escrever (rw-), e ninguém mais tem acesso (---)?',
      options: ['chmod 777', 'chmod 644', 'chmod 600', 'chmod 700'],
      correctIndex: 2,
      explanation: 'Leitura (4) + Escrita (2) = 6 para o Dono. Grupo = 0 e Outros = 0. Logo, octal 600 (rw-------).',
    },
    exercise: {
      id: 'ex-linux-01',
      title: 'Auditoria de Permissão de Arquivo Sensível',
      stage: 'fundamentos',
      objective: 'Escreva um comando para proteger o arquivo `config_secreta.env` para que apenas o dono tenha permissão de leitura e escrita.',
      instructions: [
        '1. Use o utilitário `chmod`.',
        '2. Forneça o valor octal 600.',
        '3. Especifique o alvo `config_secreta.env`.',
      ],
      starterCode: `# Digite o comando no terminal do lab:
chmod 600 config_secreta.env`,
      hint1: 'O comando para modificar permissões no Linux chama-se `chmod`.',
      hint2: 'A soma de leitura (4) + escrita (2) é 6. O formato é `chmod 600 nome_do_arquivo`.',
      solutionCode: 'chmod 600 config_secreta.env',
      solutionExplanation: 'O octal 600 impede que outros usuários locais ou processos não privilegiados leiam segredos de configuração.',
    },
  },

  // ==========================================
  // ÁREA 3: REDES DE COMPUTADORES
  // ==========================================
  {
    id: 'net-01-fundamentos',
    trackId: 'networks',
    stage: 'fundamentos',
    title: 'Modelo TCP/IP, Portas e o 3-Way Handshake',
    level: 'INICIANTE',
    topicsCovered: ['modelo TCP/IP', 'TCP vs UDP', 'portas e serviços', 'TCP 3-Way Handshake (SYN, SYN-ACK, ACK)'],
    conceptSummary:
      'O TCP (Transmission Control Protocol) é um protocolo orientado a conexão e confiável. Antes de qualquer dado ser transmitido, o cliente e o servidor realizam uma troca de três pacotes chamada de "Aperto de Mão de Três Vias" (3-Way Handshake): 1. SYN &rarr; 2. SYN-ACK &rarr; 3. ACK.',
    detailedExplanation:
      'Compreender o Handshake é a base para o trabalho defensivo (detecção de ataques de SYN Flood) e para a auditoria de serviços (scanners de portas como o Nmap usando SYN Scan / Half-Open Scan).\n\n- Porta 80: HTTP (Texto Claro - Inseguro)\n- Porta 443: HTTPS (Criptografado com TLS)\n- Porta 22: SSH (Administração Remota Criptografada)\n- Porta 53: DNS (Resolução de Nomes)',
    codeExample: `# Simulação conceitual do TCP Handshake
# 1. Cliente envia pacote SYN solicitando conexão
cliente_seq = 1000  # SYN

# 2. Servidor responde SYN-ACK autorizando e confirmando
servidor_seq = 5000
servidor_ack = cliente_seq + 1  # 1001

# 3. Cliente envia ACK final
cliente_ack = servidor_seq + 1  # 5001
estado_conexao = "ESTABLISHED"

print(f"[TCP] Conexão estabelecida com estado: {estado_conexao}")`,
    lineByLineExplanation: [
      { line: 3, code: 'cliente_seq = 1000', explanation: 'O cliente gera um número de sequência inicial (ISN) aleatório no pacote SYN.' },
      { line: 6, code: 'servidor_ack = cliente_seq + 1', explanation: 'O servidor incrementa o número do cliente no campo ACK para confirmar o recebimento.' },
      { line: 10, code: 'estado_conexao = "ESTABLISHED"', explanation: 'Após o ACK do cliente, o canal TCP é considerado aberto para transporte de dados.' },
    ],
    comprehensionQuestion: {
      id: 'cq-net-01',
      question: 'Qual é a sequência exata de flags trocadas no estabelecimento de uma conexão TCP?',
      options: [
        'ACK &rarr; SYN &rarr; FIN',
        'SYN &rarr; SYN-ACK &rarr; ACK',
        'SYN &rarr; PUSH &rarr; ACK',
        'RST &rarr; SYN &rarr; ACK',
      ],
      correctIndex: 1,
      explanation: 'O aperto de mão de 3 vias consiste estritamente em: 1) SYN do cliente, 2) SYN-ACK do servidor, 3) ACK do cliente.',
    },
    exercise: {
      id: 'ex-net-01',
      title: 'Validador de Handshake TCP',
      stage: 'fundamentos',
      objective: 'Complete a função que calcula o ACK esperado pelo cliente a partir do número de sequência do servidor.',
      instructions: [
        '1. Crie uma função `calcular_ack(seq_recebido)`.',
        '2. O ACK esperado é sempre `seq_recebido + 1`.',
        '3. Retorne o valor calculado.',
      ],
      starterCode: `def calcular_ack(seq_recebido):
    # Retorne o número de ACK esperado
    return seq_recebido + 1

seq_servidor = 5000
ack_cliente = calcular_ack(seq_servidor)
print(f"ACK enviado pelo cliente: {ack_cliente}")`,
      hint1: 'No protocolo TCP, o número de confirmação (ACK) é o próximo byte esperado, ou seja, seq + 1.',
      hint2: 'A instrução dentro da função deve ser simplesmente `return seq_recebido + 1`.',
      solutionCode: `def calcular_ack(seq_recebido):
    return seq_recebido + 1

seq_servidor = 5000
ack_cliente = calcular_ack(seq_servidor)
print(f"ACK enviado pelo cliente: {ack_cliente}")`,
      solutionExplanation: 'O cliente confirma a recepção do SYN do servidor somando 1 ao Sequence Number recebido.',
    },
  },

  // ==========================================
  // ÁREA 4: FUNDAMENTOS DE CIBERSEGURANÇA
  // ==========================================
  {
    id: 'fund-01-fundamentos',
    trackId: 'cyber_fundamentals',
    stage: 'fundamentos',
    title: 'Tríade CIA e Hashes Criptográficos com Salt',
    level: 'INICIANTE',
    topicsCovered: ['Tríade CIA', 'hashes criptográficos', 'salt criptográfico', 'criptografia simétrica vs assimétrica'],
    conceptSummary:
      'A Tríade CIA é o pilar central da segurança: Confidencialidade (apenas quem tem permissão pode ler), Integridade (os dados não foram alterados ou corrompidos) e Disponibilidade (os sistemas estão acessíveis quando necessários). Para garantir a integridade, usamos funções Hash (como SHA-256), que geram uma impressão digital única e unidirecional do dado.',
    detailedExplanation:
      'Hashes não são criptografia de dois sentidos (não existe "descriptografar" um SHA-256 legítimo). No entanto, se um atacante usar tabelas pré-computadas (Rainbow Tables), ele pode encontrar senhas fracas. A defesa obrigatória é o uso de **Salt Criptográfico** — uma cadeia de bytes aleatória anexada à senha antes do cálculo do hash.',
    codeExample: `import hashlib

def hash_com_salt(senha, salt="s3gr3d0_dnf_2026"):
    dado_combinado = f"{salt}{senha}".encode("utf-8")
    return hashlib.sha256(dado_combinado).hexdigest()

senha_teste = "minha_senha_forte"
hash_gerado = hash_com_salt(senha_teste)
print(f"Senha: {senha_teste}")
print(f"SHA-256 com Salt: {hash_gerado}")`,
    lineByLineExplanation: [
      { line: 1, code: 'import hashlib', explanation: 'Importa o módulo nativo do Python com algoritmos de hash seguros (SHA-256, SHA-512).' },
      { line: 3, code: 'def hash_com_salt(...)', explanation: 'Define a função de hashing seguro aceitando a senha e um salt aleatório/configurado.' },
      { line: 4, code: 'dado_combinado = ...', explanation: 'Concatena o salt à senha e converte para bytes usando UTF-8.' },
      { line: 5, code: 'return hashlib.sha256(...).hexdigest()', explanation: 'Calcula o digest de 256 bits e retorna sua representação em string hexadecimal de 64 caracteres.' },
    ],
    comprehensionQuestion: {
      id: 'cq-fund-01',
      question: 'Qual é o objetivo primordial da adição do Salt criptográfico antes de gerar o hash de uma senha?',
      options: [
        'Acelerar a velocidade de cálculo do processador.',
        'Impedir o uso de Rainbow Tables e tornar hashes de senhas iguais totalmente diferentes no banco.',
        'Permitir que o administrador recupere a senha original em texto claro.',
        'Comprimir o tamanho final do arquivo de banco de dados.',
      ],
      correctIndex: 1,
      explanation: 'O salt garante que duas senhas idênticas resultem em hashes completamente distintos, neutralizando ataques com tabelas pré-computadas (Rainbow Tables).',
    },
    exercise: {
      id: 'ex-fund-01',
      title: 'Verificador de Integridade de Arquivo com SHA-256',
      stage: 'fundamentos',
      objective: 'Escreva um script Python que calcula o hash SHA-256 de uma string de log para verificar se ela foi adulterada.',
      instructions: [
        '1. Importe o módulo `hashlib`.',
        '2. Crie uma função `verificar_integridade(conteudo)`.',
        '3. Retorne `hashlib.sha256(conteudo.encode()).hexdigest()`.',
      ],
      starterCode: `import hashlib

def verificar_integridade(conteudo):
    # Complete com o cálculo do hash SHA-256
    return hashlib.sha256(conteudo.encode()).hexdigest()

log = "2026-08-16 12:00:00 - Admin efetuou login autorizado"
print("[+] Hash de Integridade:", verificar_integridade(log))`,
      hint1: 'Lembre-se de converter a string para bytes com `.encode()` antes de passar para `hashlib.sha256()`.',
      hint2: 'Chame `.hexdigest()` no objeto retornado para obter o texto hexadecimal.',
      solutionCode: `import hashlib

def verificar_integridade(conteudo):
    return hashlib.sha256(conteudo.encode()).hexdigest()

log = "2026-08-16 12:00:00 - Admin efetuou login autorizado"
print("[+] Hash de Integridade:", verificar_integridade(log))`,
      solutionExplanation: 'O SHA-256 produz uma assinatura fixa de 64 caracteres hexadecimais. Qualquer modificação de 1 único bit no log altera completamente o hash resultante (efeito avalanche).',
    },
  },

  // ==========================================
  // ÁREA 5: SEGURANÇA DE APLICAÇÕES (APPSEC)
  // ==========================================
  {
    id: 'appsec-01-fundamentos',
    trackId: 'app_sec',
    stage: 'fundamentos',
    title: 'OWASP Top 10 e Prevenção a SQL Injection',
    level: 'BÁSICO',
    topicsCovered: ['OWASP e OWASP Top 10', 'SQL Injection (SQLi)', 'validação e sanitização', 'parametrização de consultas'],
    conceptSummary:
      'SQL Injection (SQLi) ocorre quando dados não confiáveis inseridos pelo usuário são diretamente concatenados em uma instrução SQL. O banco de dados não consegue distinguir onde termina a instrução do desenvolvedor e onde começam os dados do usuário. A defesa definitiva é o uso obrigatório de **Consultas Parametrizadas (Prepared Statements)**.',
    detailedExplanation:
      'Em uma consulta parametrizada, o mecanismo do banco pré-compila a estrutura SQL e trata as variáveis estritamente como literais de dados. Mesmo que o usuário digite `admin\' OR \'1\'=\'1`, o banco buscará literalmente por um usuário com esse nome exato, sem alterar a lógica booleana da consulta.\n\nTodo exercício ofensivo neste curso é realizado exclusivamente em ambientes de laboratório locais autorizados.',
    codeExample: `# EXEMPLO INSEGURO (Concatenação direta - VULNERÁVEL):
# query_insegura = f"SELECT * FROM users WHERE user = '{usuario}'"

# EXEMPLO DEFENSIVO SEGURO (Prepared Statements):
import sqlite3

def login_seguro(conexao, usuario, senha):
    cursor = conexao.cursor()
    # Os pontos de interrogação (?) são marcadores de posição parametrizados
    query_segura = "SELECT id, email FROM users WHERE username = ? AND password = ?"
    cursor.execute(query_segura, (usuario, senha))
    return cursor.fetchone()`,
    lineByLineExplanation: [
      { line: 8, code: 'def login_seguro(...)', explanation: 'Define a função defensiva que recebe a conexão segura do banco.' },
      { line: 11, code: 'query_segura = "... WHERE username = ? AND password = ?"', explanation: 'Usa placeholders (?) em vez de format strings ou concatenações com +.' },
      { line: 12, code: 'cursor.execute(query_segura, (usuario, senha))', explanation: 'Passa os dados como tupla separada. O driver do banco neutraliza qualquer tentativa de escape de sintaxe.' },
    ],
    comprehensionQuestion: {
      id: 'cq-appsec-01',
      question: 'Por que o uso de Prepared Statements (Consultas Parametrizadas) é imune ao SQL Injection clássico?',
      options: [
        'Porque ele remove todas as aspas do texto do usuário.',
        'Porque a query é pré-compilada no banco e os parâmetros são tratados estritamente como dados, nunca como código executável.',
        'Porque ele criptografa todo o banco de dados com AES-256.',
        'Porque ele bloqueia endereços IP que enviam caracteres especiais.',
      ],
      correctIndex: 1,
      explanation: 'No Prepared Statement, a gramática da instrução SQL já foi compilada antes de receber os parâmetros. Os inputs do usuário jamais podem alterar a árvore sintática da consulta.',
    },
    exercise: {
      id: 'ex-appsec-01',
      title: 'Sanitizador e Validador de Identificadores',
      stage: 'fundamentos',
      objective: 'Crie uma função defensiva que valida se um nome de usuário contém apenas caracteres alfanuméricos e sublinhado (regras de segurança de entrada).',
      instructions: [
        '1. Importe o módulo `re`.',
        '2. Use a expressão regular `^[a-zA-Z0-9_]{3,20}$`.',
        '3. Retorne True se válido e False caso contenha caracteres de injeção como aspas ou ponto-e-vírgula.',
      ],
      starterCode: `import re

def validar_usuario_seguro(usuario):
    padrao = r"^[a-zA-Z0-9_]{3,20}$"
    if re.match(padrao, usuario):
        return True
    return False

# Teste com usuário legítimo e com tentativa de injeção:
print("Usuário válido:", validar_usuario_seguro("admin_seguro"))
print("Tentativa de injeção:", validar_usuario_seguro("admin' OR '1'='1"))`,
      hint1: 'A função `re.match(padrao, texto)` retorna um objeto de match se a string casar com o padrão desde o início.',
      hint2: 'Se `re.match` retornar None, significa que a string contém caracteres ilegais fora da whitelist definida.',
      solutionCode: `import re

def validar_usuario_seguro(usuario):
    padrao = r"^[a-zA-Z0-9_]{3,20}$"
    return bool(re.match(padrao, usuario))

print("Usuário válido:", validar_usuario_seguro("admin_seguro"))
print("Tentativa de injeção:", validar_usuario_seguro("admin' OR '1'='1"))`,
      solutionExplanation: 'A abordagem de validação por Whitelist (lista permitida) é a mais recomendada pelo OWASP, rejeitando qualquer caractere não explicitamente autorizado.',
    },
  },

  // ==========================================
  // ÁREA 6: WEB & PROTOCOLOS
  // ==========================================
  {
    id: 'web-01-fundamentos',
    trackId: 'web_protocols',
    stage: 'fundamentos',
    title: 'Cabeçalhos HTTP e Flags de Proteção de Cookies',
    level: 'BÁSICO',
    topicsCovered: ['HTTP request/response', 'códigos de status', 'headers de segurança', 'cookies (HttpOnly, Secure, SameSite)'],
    conceptSummary:
      'Na Web, os cookies transportam identificadores de sessão. Para evitar que scripts maliciosos injetados (XSS) roubem os cookies de sessão ou que ataques CSRF ocorram, os servidores devem emitir os cookies com flags de segurança mandatórias: `HttpOnly`, `Secure` e `SameSite=Strict`.',
    detailedExplanation:
      '- `HttpOnly`: Impede que o cookie seja lido via JavaScript no navegador (`document.cookie`), mitigando roubo de sessão em caso de XSS.\n- `Secure`: Garante que o cookie trafegue exclusivamente por canais criptografados via HTTPS.\n- `SameSite=Strict` ou `Lax`: Impede o envio do cookie em requisições de origem cruzada, protegendo contra CSRF.',
    codeExample: `# Configuração segura de cabeçalho Set-Cookie
headers_resposta = {
    "Set-Cookie": "session_id=d9f2a8c01b4e; Path=/; Secure; HttpOnly; SameSite=Strict",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY"
}

for header, valor in headers_resposta.items():
    print(f"{header}: {valor}")`,
    lineByLineExplanation: [
      { line: 3, code: '"Set-Cookie": "session_id=...; Secure; HttpOnly; SameSite=Strict"', explanation: 'Instrui o navegador a blindar o cookie com todas as 3 flags essenciais de segurança.' },
      { line: 4, code: '"Strict-Transport-Security": ...', explanation: 'Força o navegador a utilizar estritamente HTTPS por 1 ano.' },
      { line: 6, code: '"X-Frame-Options": "DENY"', explanation: 'Impede que o site seja renderizado dentro de iframes (proteção contra Clickjacking).' },
    ],
    comprehensionQuestion: {
      id: 'cq-web-01',
      question: 'O que acontece quando a flag `HttpOnly` está ativada em um cookie de sessão?',
      options: [
        'O cookie é criptografado com senha.',
        'O código JavaScript em execução na página é proibido de ler o cookie via `document.cookie`.',
        'O cookie só funciona em redes locais.',
        'O usuário precisa digitar a senha a cada 5 minutos.',
      ],
      correctIndex: 1,
      explanation: 'A diretiva `HttpOnly` oculta o cookie do DOM do navegador, de modo que mesmo se houver uma falha de XSS, o atacante não consegue extrair a sessão via `document.cookie`.',
    },
    exercise: {
      id: 'ex-web-01',
      title: 'Auditor de Flags de Cookies Seguros',
      stage: 'fundamentos',
      objective: 'Crie uma função Python que analisa uma string de cabeçalho `Set-Cookie` e verifica se todas as três flags de segurança obrigatórias estão presentes.',
      instructions: [
        '1. Crie a função `auditar_cookie(cookie_str)`.',
        '2. Verifique se contém "HttpOnly", "Secure" e "SameSite".',
        '3. Retorne True se todas estiverem presentes, ou False caso falte alguma.',
      ],
      starterCode: `def auditar_cookie(cookie_str):
    tem_httponly = "httponly" in cookie_str.lower()
    tem_secure = "secure" in cookie_str.lower()
    tem_samesite = "samesite" in cookie_str.lower()
    return tem_httponly and tem_secure and tem_samesite

cookie_teste = "session_id=abc1234; Path=/; Secure; HttpOnly; SameSite=Strict"
print("Cookie aprovado na auditoria?", auditar_cookie(cookie_teste))`,
      hint1: 'Converta a string para minúsculas com `.lower()` para evitar problemas com maiúsculas/minúsculas.',
      hint2: 'Use `and` para combinar os 3 booleanos de verificação.',
      solutionCode: `def auditar_cookie(cookie_str):
    c = cookie_str.lower()
    return "httponly" in c and "secure" in c and "samesite" in c

cookie_teste = "session_id=abc1234; Path=/; Secure; HttpOnly; SameSite=Strict"
print("Cookie aprovado na auditoria?", auditar_cookie(cookie_teste))`,
      solutionExplanation: 'A verificação assegura conformidade com os padrões de segurança defensiva Web estabelecidos pelo OWASP.',
    },
  },

  // ==========================================
  // ÁREA 7: ANÁLISE DE VULNERABILIDADES
  // ==========================================
  {
    id: 'vuln-01-fundamentos',
    trackId: 'vuln_analysis',
    stage: 'fundamentos',
    title: 'Conceitos de CVE, CVSS e Superfície de Ataque',
    level: 'INTERMEDIÁRIO',
    topicsCovered: ['vulnerabilidade vs ameaça vs risco', 'catálogo CVE', 'métrica CVSS', 'priorização de riscos'],
    conceptSummary:
      'Uma **Vulnerabilidade** é uma fraqueza em um software ou configuração. Uma **Ameaça** é o agente ou evento capaz de explorar essa fraqueza. O **Risco** é o resultado do impacto e da probabilidade dessa exploração ocorrer. As vulnerabilidades globais são catalogadas com identificadores únicos (CVE - Common Vulnerabilities and Exposures) e pontuadas pelo sistema CVSS (0.0 a 10.0).',
    detailedExplanation:
      'Faixas de Severidade do CVSS v3.1:\n- 0.1 a 3.9: Baixa (Low)\n- 4.0 a 6.9: Média (Medium)\n- 7.0 a 8.9: Alta (High)\n- 9.0 a 10.0: Crítica (Critical)\n\nA priorização de correção nunca deve se basear apenas na nota bruta, mas também no contexto do negócio (se o ativo é exposto à Internet ou interno).',
    codeExample: `# Classificador de Risco CVSS
def classificar_severidade(score):
    if score >= 9.0:
        return "CRÍTICA (Ação Imediata)"
    elif score >= 7.0:
        return "ALTA (Corrigir em até 48h)"
    elif score >= 4.0:
        return "MÉDIA (Planejar no sprint)"
    else:
        return "BAIXA (Monitorar)"

cve_exemplo = "CVE-2024-3094"
score_exemplo = 10.0
print(f"{cve_exemplo} [CVSS {score_exemplo}]: {classificar_severidade(score_exemplo)}")`,
    lineByLineExplanation: [
      { line: 2, code: 'def classificar_severidade(score):', explanation: 'Recebe a nota numérica do CVSS calculada.' },
      { line: 3, code: 'if score >= 9.0:', explanation: 'Avalia a faixa de severidade máxima que exige acionamento de plano de emergência.' },
      { line: 10, code: 'cve_exemplo = "CVE-2024-3094"', explanation: 'Identificador padronizado no formato CVE-ANO-NUMERO.' },
    ],
    comprehensionQuestion: {
      id: 'cq-vuln-01',
      question: 'Qual das alternativas define corretamente a relação entre Vulnerabilidade, Ameaça e Risco?',
      options: [
        'Vulnerabilidade é a ação do atacante; Risco é o patch de correção.',
        'Vulnerabilidade é a falha no sistema; Ameaça é o potencial explorador; Risco é o impacto potencial multiplicado pela probabilidade de ocorrência.',
        'Ameaça é a nota no CVSS; Vulnerabilidade é o antivírus.',
        'Todos os três termos significam exatamente a mesma coisa em cibersegurança.',
      ],
      correctIndex: 1,
      explanation: 'A vulnerabilidade é o defeito inerente, a ameaça é o agente externo que pode explorá-la, e o risco mede a severidade da consequência para o negócio.',
    },
    exercise: {
      id: 'ex-vuln-01',
      title: 'Priorizador de Correção de Vulnerabilidades',
      stage: 'fundamentos',
      objective: 'Escreva um algoritmo que filtra uma lista de vulnerabilidades e retorna apenas aquelas com score CVSS >= 7.0 que estão em ativos expostos à Internet.',
      instructions: [
        '1. Itere sobre a lista de dicionários de vulnerabilidades.',
        '2. Verifique se `item["cvss"] >= 7.0` e `item["exposto_internet"] == True`.',
        '3. Adicione à lista de prioridade máxima.',
      ],
      starterCode: `vulns = [
    {"cve": "CVE-2026-1001", "cvss": 9.8, "exposto_internet": True},
    {"cve": "CVE-2026-1002", "cvss": 7.5, "exposto_internet": False},
    {"cve": "CVE-2026-1003", "cvss": 4.3, "exposto_internet": True},
    {"cve": "CVE-2026-1004", "cvss": 8.2, "exposto_internet": True},
]

prioridades = [v["cve"] for v in vulns if v["cvss"] >= 7.0 and v["exposto_internet"]]
print("[!] CVEs com prioridade imediata de correção:", prioridades)`,
      hint1: 'Você pode usar list comprehension ou um loop for com `if` para filtrar a lista.',
      hint2: 'A condição é: `v["cvss"] >= 7.0 and v["exposto_internet"]`.',
      solutionCode: `vulns = [
    {"cve": "CVE-2026-1001", "cvss": 9.8, "exposto_internet": True},
    {"cve": "CVE-2026-1002", "cvss": 7.5, "exposto_internet": False},
    {"cve": "CVE-2026-1003", "cvss": 4.3, "exposto_internet": True},
    {"cve": "CVE-2026-1004", "cvss": 8.2, "exposto_internet": True},
]

prioridades = [v["cve"] for v in vulns if v["cvss"] >= 7.0 and v["exposto_internet"]]
print("[!] CVEs com prioridade imediata de correção:", prioridades)`,
      solutionExplanation: 'A combinação de alta pontuação CVSS com exposição pública direta qualifica os ativos para remediação prioritária imediata.',
    },
  },

  // ==========================================
  // ÁREA 8: SEGURANÇA DEFENSIVA / BLUE TEAM
  // ==========================================
  {
    id: 'def-01-fundamentos',
    trackId: 'defensive_sec',
    stage: 'fundamentos',
    title: 'Análise de Logs, IoCs e Regras de Firewall',
    level: 'INTERMEDIÁRIO',
    topicsCovered: ['princípios de defesa e blindagem', 'firewall e regras (iptables)', 'análise defensiva de logs', 'Indicadores de Comprometimento (IoCs)'],
    conceptSummary:
      'A equipe defensiva (Blue Team) monitora eventos para detectar e conter incidentes antes que ocorram danos. Logs de autenticação (`/var/log/auth.log` ou `secure`) registram cada tentativa de acesso. Analisando a taxa de repetição de erros (ex: código 401 ou "Failed password"), identificamos ataques de força bruta e podemos gerar regras automáticas de firewall para bloqueio.',
    detailedExplanation:
      'Indicadores de Comprometimento (IoCs) incluem endereços IP maliciosos, hashes de arquivos alterados e padrões suspeitos de comandos. O objetivo do Blue Team é minimizar o Mean Time to Detect (MTTD) e o Mean Time to Respond (MTTR).',
    codeExample: `# Detector de Ataque de Força Bruta por IP
logs_auth = [
    {"ip": "192.168.1.50", "status": "FAIL"},
    {"ip": "192.168.1.50", "status": "FAIL"},
    {"ip": "192.168.1.50", "status": "FAIL"},
    {"ip": "192.168.1.50", "status": "FAIL"},
    {"ip": "10.0.0.5", "status": "SUCCESS"},
]

from collections import Counter
falhas_por_ip = Counter(l["ip"] for l in logs_auth if l["status"] == "FAIL")

for ip, count in falhas_por_ip.items():
    if count >= 3:
        print(f"⚠️ [ALERTA DE SEGURANÇA] IP {ip} ultrapassou o limite ({count} falhas).")
        print(f"🛡️ [AÇÃO DEFENSIVA] Regra sugerida: iptables -A INPUT -s {ip} -j DROP")`,
    lineByLineExplanation: [
      { line: 11, code: 'falhas_por_ip = Counter(...)', explanation: 'Agrupa e conta as ocorrências de falhas por endereço IP de origem.' },
      { line: 14, code: 'if count >= 3:', explanation: 'Aplica a regra de correlação: se houver 3 ou mais falhas seguidas, aciona o alerta.' },
      { line: 16, code: 'print(f"🛡️ Regra: iptables -A INPUT -s {ip} -j DROP")', explanation: 'Gera a regra de bloqueio no firewall de borda para conter o atacante.' },
    ],
    comprehensionQuestion: {
      id: 'cq-def-01',
      question: 'Qual é o papel de um IoC (Indicador de Comprometimento) nas operações de Blue Team?',
      options: [
        'É uma evidência forense (como IP, hash de arquivo ou URL) que indica que um sistema foi alvo ou comprometido.',
        'É um tipo de cabo de rede blindado contra ruído.',
        'É a licença de software utilizada pelo sistema operacional.',
        'É uma linguagem de programação defensiva proprietária.',
      ],
      correctIndex: 0,
      explanation: 'IoCs são pistas digitais e artefatos técnicos deixados por adversários que servem para identificar ataques em andamento ou pós-incidente.',
    },
    exercise: {
      id: 'ex-def-01',
      title: 'Parser de Log e Bloqueio de IP',
      stage: 'fundamentos',
      objective: 'Crie uma função defensiva que recebe uma lista de IPs que falharam na autenticação e retorna a lista de IPs únicos com mais de 2 tentativas para bloqueio.',
      instructions: [
        '1. Conte a frequência de cada IP.',
        '2. Filtre os IPs com frequência > 2.',
        '3. Retorne a lista de IPs bloqueados.',
      ],
      starterCode: `def identificar_ips_bloquear(lista_ips):
    contagem = {}
    for ip in lista_ips:
        contagem[ip] = contagem.get(ip, 0) + 1
    return [ip for ip, total in contagem.items() if total > 2]

ips_suspeitos = ["192.168.1.100", "10.0.0.1", "192.168.1.100", "192.168.1.100", "10.0.0.1"]
print("[🛡️] IPs para bloquear:", identificar_ips_bloquear(ips_suspeitos))`,
      hint1: 'Utilize o método `contagem.get(ip, 0) + 1` para acumular a frequência de cada IP em um dicionário.',
      hint2: 'A lista final contém apenas as chaves onde `total > 2`.',
      solutionCode: `def identificar_ips_bloquear(lista_ips):
    contagem = {}
    for ip in lista_ips:
        contagem[ip] = contagem.get(ip, 0) + 1
    return [ip for ip, total in contagem.items() if total > 2]

ips_suspeitos = ["192.168.1.100", "10.0.0.1", "192.168.1.100", "192.168.1.100", "10.0.0.1"]
print("[🛡️] IPs para bloquear:", identificar_ips_bloquear(ips_suspeitos))`,
      solutionExplanation: 'O algoritmo identifica padrões de força bruta agregando logs de autenticação para automação defensiva.',
    },
  },

  // ==========================================
  // ÁREA 9: PENTEST EM AMBIENTES AUTORIZADOS
  // ==========================================
  {
    id: 'pen-01-fundamentos',
    trackId: 'pentest_ethics',
    stage: 'fundamentos',
    title: 'Ética Profissional, Autorização e Metodologia',
    level: 'AVANÇADO',
    topicsCovered: ['ética profissional e limites legais', 'autorização formal', 'definição de escopo e RoE', 'metodologias de pentest'],
    conceptSummary:
      'A diferença fundamental entre um profissional de cibersegurança ético e um cibercriminoso é a **Autorização Prévia, Explícita e por Escrito** com regras de engajamento (RoE) e escopo claramente delimitados. Realizar qualquer teste sem autorização formal constitui crime (Artigo 154-A do Código Penal Brasileiro e leis internacionais correspondentes).',
    detailedExplanation:
      'Fases de uma Avaliação de Segurança Autorizada:\n1. Planejamento & Definição de Escopo (Contrato e Termo de Consentimento)\n2. Reconhecimento & Enumeração (Identificação de serviços no alvo autorizado)\n3. Análise de Vulnerabilidades (Mapeamento de fragilidades)\n4. Exploração Controlada (Validação de PoC sem causar negação de serviço)\n5. Documentação, Relatório & Reteste (Apresentação técnica e executiva para correção).\n\nTodos os nossos laboratórios ocorrem exclusivamente em ambientes próprios, VMs ou CTFs dedicados.',
    codeExample: `# Checklist Ético de Pré-Engajamento
termo_autorizacao_assinado = True
ip_alvo_em_escopo = True
janela_horario_permitida = True

def autorizacao_valida():
    return termo_autorizacao_assinado and ip_alvo_em_escopo and janela_horario_permitida

if autorizacao_valida():
    print("[+] Teste autorizado em ambiente de laboratório. Proceder com enumeração.")
else:
    print("[-] ABORTAR IMEDIATAMENTE: Falta de autorização formal ou fora do escopo legal!")`,
    lineByLineExplanation: [
      { line: 2, code: 'termo_autorizacao_assinado = True', explanation: 'Verifica a existência do documento legal assinado pelas partes autorizadas.' },
      { line: 3, code: 'ip_alvo_em_escopo = True', explanation: 'Confirma se o IP de teste está expressamente listado no anexo de escopo contratual.' },
      { line: 8, code: 'if autorizacao_valida():', explanation: 'Impede o início de qualquer atividade técnica se os requisitos éticos e legais não forem satisfeitos.' },
    ],
    comprehensionQuestion: {
      id: 'cq-pen-01',
      question: 'O que diferencia a atuação de um Pentester Profissional de um ataque não autorizado?',
      options: [
        'O tipo de sistema operacional que utilizam.',
        'A autorização formal prévia por escrito, o escopo estrito, as regras de engajamento e o objetivo de proteção/correção.',
        'A velocidade da conexão de internet.',
        'O uso de ferramentas pagas versus gratuitas.',
      ],
      correctIndex: 1,
      explanation: 'A legalidade, o consentimento explícito, o escopo delimitado e o objetivo de fortalecer as defesas do cliente são a base irrenunciável do trabalho ético.',
    },
    exercise: {
      id: 'ex-pen-01',
      title: 'Validador de Escopo de IP Autorizado',
      stage: 'fundamentos',
      objective: 'Crie uma função que recebe um IP de teste e valida se ele pertence exclusivamente à rede de laboratório autorizada (10.10.10.0/24).',
      instructions: [
        '1. Crie `validar_escopo(ip)`.',
        '2. Verifique se o IP começa com "10.10.10." e não é o IP de broadcast.',
        '3. Retorne True apenas se estiver estritamente dentro da rede autorizada.',
      ],
      starterCode: `def validar_escopo(ip):
    # Verifica se o IP pertence à sub-rede do laboratório 10.10.10.x
    if ip.startswith("10.10.10.") and ip != "10.10.10.255":
        return True
    return False

print("IP Lab 10.10.10.15 em escopo?", validar_escopo("10.10.10.15"))
print("IP Externo 203.0.113.5 em escopo?", validar_escopo("203.0.113.5"))`,
      hint1: 'Use `ip.startswith("10.10.10.")` para checar o prefixo de rede.',
      hint2: 'Garanta que IPs externos retornem rigorosamente False.',
      solutionCode: `def validar_escopo(ip):
    return ip.startswith("10.10.10.") and ip != "10.10.10.255"

print("IP Lab 10.10.10.15 em escopo?", validar_escopo("10.10.10.15"))
print("IP Externo 203.0.113.5 em escopo?", validar_escopo("203.0.113.5"))`,
      solutionExplanation: 'A verificação de escopo em código impede execuções acidentais contra alvos não contratados.',
    },
  },

  // ==========================================
  // ÁREA 10: AUTOMAÇÃO COM PYTHON
  // ==========================================
  {
    id: 'auto-01-fundamentos',
    trackId: 'sec_automation',
    stage: 'fundamentos',
    title: 'Automação Defensiva, Regex e Parsing de Logs',
    level: 'AVANÇADO',
    topicsCovered: ['automação de tarefas', 'JSON e CSV', 'expressões regulares (re)', 'parsing e processamento de logs'],
    conceptSummary:
      'Python é a linguagem padrão da indústria para automação em cibersegurança. Com ela, analistas automatizam a extração de endereços IPv4 maliciosos de logs brutos usando expressões regulares (`re`), leem arquivos JSON e CSV de feeds de inteligência de ameaças (Threat Intel) e geram relatórios consolidados em segundos.',
    detailedExplanation:
      'Expressão Regular para capturar IPv4 em logs:\n`r"\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b"`\n\nEssa regex localiza qualquer sequência de quatro octetos separados por pontos dentro de blocos de texto não estruturados.',
    codeExample: `import re
import json

raw_log = """
2026-08-16 10:15:22 SRC=192.168.1.105 DST=10.0.0.1 SPT=54231 DPT=22 PROTO=TCP
2026-08-16 10:15:23 SRC=198.51.100.44 DST=10.0.0.1 SPT=61245 DPT=443 PROTO=TCP
"""

# Extração de todos os IPs de origem (SRC)
ips_origem = re.findall(r"SRC=([0-9.]+)", raw_log)
print("IPs de origem extraídos pelo parser:", ips_origem)

relatorio = {"total_conexoes": len(ips_origem), "ips_rastreados": ips_origem}
print("JSON de Relatório:", json.dumps(relatorio, indent=2))`,
    lineByLineExplanation: [
      { line: 9, code: 'ips_origem = re.findall(r"SRC=([0-9.]+)", raw_log)', explanation: 'Localiza todas as ocorrências de SRC= seguido de dígitos e pontos.' },
      { line: 12, code: 'relatorio = {"total_conexoes": ...}', explanation: 'Estrutura os dados extraídos em formato de dicionário para exportação.' },
      { line: 13, code: 'json.dumps(relatorio, indent=2)', explanation: 'Serializa os dados estruturados para o padrão JSON formatado.' },
    ],
    comprehensionQuestion: {
      id: 'cq-auto-01',
      question: 'Qual módulo nativo do Python é utilizado para processar padrões de texto com Expressões Regulares em logs de segurança?',
      options: ['math', 're', 'os', 'sys'],
      correctIndex: 1,
      explanation: 'O módulo `re` (Regular Expressions) fornece suporte nativo para busca, casamento de padrões e extração de strings no Python.',
    },
    exercise: {
      id: 'ex-auto-01',
      title: 'Parser Automático de Portas Suspeitas em Log',
      stage: 'fundamentos',
      objective: 'Escreva um script que extrai todas as portas de destino (`DPT=\\d+`) de uma string de log e retorna as portas únicas encontradas.',
      instructions: [
        '1. Importe o módulo `re`.',
        '2. Use `re.findall(r"DPT=(\\d+)", log_texto)`.',
        '3. Converta os números para inteiros e elimine duplicatas com `set()`.',
      ],
      starterCode: `import re

def extrair_portas_alvo(log_texto):
    portas_encontradas = re.findall(r"DPT=(\\d+)", log_texto)
    return sorted(list(set(int(p) for p in portas_encontradas)))

log_amostra = "SRC=1.1.1.1 DPT=22 ... SRC=2.2.2.2 DPT=80 ... SRC=3.3.3.3 DPT=22 ... DPT=443"
print("[+] Portas únicas auditadas:", extrair_portas_alvo(log_amostra))`,
      hint1: 'A expressão `r"DPT=(\\d+)"` captura apenas os dígitos do grupo dentro dos parênteses.',
      hint2: 'Use `set(...)` para remover portas duplicadas da lista.',
      solutionCode: `import re

def extrair_portas_alvo(log_texto):
    portas = re.findall(r"DPT=(\\d+)", log_texto)
    return sorted(list(set(int(p) for p in portas)))

log_amostra = "SRC=1.1.1.1 DPT=22 ... SRC=2.2.2.2 DPT=80 ... SRC=3.3.3.3 DPT=22 ... DPT=443"
print("[+] Portas únicas auditadas:", extrair_portas_alvo(log_amostra))`,
      solutionExplanation: 'A automação com regex transforma logs de tráfego desestruturados em dados limpos para tomada de decisão em tempo real.',
    },
  },
];
