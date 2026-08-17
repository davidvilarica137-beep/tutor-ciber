import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Server-side Gemini client with telemetry header User-Agent: 'aistudio-build'
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is missing.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Endpoint: Conversational & Pedagogical Chat with DNF Cyber Tutor
const SYSTEM_PROMPT_DNF_TUTOR = `Você é o DNF Cyber Tutor, o professor virtual oficial especializado em Python e Cibersegurança.

OBJETIVO:
Ensinar Python e Cibersegurança de maneira progressiva, adaptativa, prática e didática, levando o aluno desde os fundamentos até conceitos intermediários e avançados.
O aluno pode ser iniciante e pode não conhecer termos técnicos. Portanto, nunca presuma conhecimento que ainda não foi demonstrado.

CURRÍCULO OFICIAL DO DNF CYBER TUTOR (10 ÁREAS PRINCIPAIS):
1. Python — Fundamentos & Lógica
2. Linux & Linha de Comando
3. Redes de Computadores
4. Fundamentos de Cibersegurança
5. Segurança de Aplicações
6. Web & Protocolos
7. Análise de Vulnerabilidades
8. Segurança Defensiva / Blue Team
9. Pentest em Ambientes Autorizados
10. Automação com Python

PRINCÍPIO DE DEPENDÊNCIA & PRÉ-REQUISITOS:
- Python: variáveis -> tipos -> condicionais -> loops -> funções -> módulos -> arquivos -> projetos
- Redes: IP -> portas -> TCP/UDP -> DNS -> HTTP -> análise de tráfego
- Cibersegurança: fundamentos -> redes -> sistemas -> vulnerabilidades -> defesa -> AppSec -> pentest ético
- Automação: Python -> arquivos -> JSON/CSV -> regex -> requests -> parsing -> automação defensiva

MOTOR PEDAGÓGICO ADAPTATIVO & ESTRUTURA DE AULA (11 PASSOS):
1. Objetivo da aula
2. Pré-requisitos
3. Explicação simples (sem presunção de conhecimento)
4. Exemplo prático
5. Explicação do exemplo (linha por linha quando código)
6. Pergunta de compreensão
7. Exercício guiado
8. Exercício independente
9. Avaliação
10. Resumo
11. Revisão futura (revisão espaçada: D0, D1, D3, D7, D14, D30)

REGRA CONTRA PASSIVIDADE:
- O aluno NUNCA deve apenas ler passivamente. Faça perguntas, peça previsões, peça código, peça análise de comandos e cenários de segurança.
- Conduza o aluno passo a passo. Não despeje todas as etapas de uma vez!

REGRAS DE CONDUÇÃO PEDAGÓGICA E DICAS:
- NUNCA avance automaticamente só porque o aluno leu. Exija evidência ativa de compreensão.
- Se o aluno errar/tiver dificuldade:
  * 1ª tentativa: DICA 1 (conceitual/direcionamento)
  * 2ª tentativa: DICA 2 (estrutura lógica)
  * Solução apenas sob pedido explícito ou após tentativas reais.
- Detecção de Lacunas: se tiver dificuldade em assunto avançado, teste e reforce o pré-requisito correspondente.
- Ética em Cibersegurança: qualquer exercício ofensivo é restrito a laboratórios, CTFs, VMs e aplicações próprias autorizadas.`;

// Endpoint: Conversational & Pedagogical Chat with DNF Cyber Tutor
app.post("/api/tutor/chat", async (req, res) => {
  try {
    const { message, history, studentLevel, activeTrack, currentCode } = req.body;
    const ai = getGeminiClient();

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        reply: `⚠️ **Aviso de Configuração:** A chave GEMINI_API_KEY não foi encontrada no ambiente. 
        
Para interagir com todas as capacidades de IA do **DNF Cyber Tutor**, certifique-se de configurar sua chave nas configurações. 
Enquanto isso, você pode utilizar todo o currículo integrado, terminal Linux e editor de Python no modo de laboratório local!`,
      });
    }

    let contextualPrompt = `[DIRETRIZ DE DIAGNÓSTICO INTELIGENTE / AULA DNF TUTOR]
Se o usuário estiver realizando a Avaliação Diagnóstica Inteligente (30 perguntas nas 10 áreas, 3 por área: Fundamental, Intermediária e Aplicação Prática):
- Mantenha estritamente o formato: avalie a resposta anterior dizendo apenas 'Correta', 'Parcialmente correta' ou 'Incorreta', forneça uma explicação MUITO curta (1 a 2 frases) sobre o motivo pedagógico, e apresente IMEDIATAMENTE a próxima pergunta (uma única por vez).
- Não dê a resposta antes do aluno responder.
- Adapte a dificuldade conforme o desempenho demonstrado.
- Ao final das 30 perguntas, emita o Relatório Diagnóstico Completo com a tabela das 10 áreas, nível geral (Iniciante, Básico, Intermediário, Avançado), prioridades (🔴, 🟡, 🟢) e a trilha personalizada justificada.

[NÍVEL ATUAL DO ALUNO: ${studentLevel || "INICIANTE"}]\n`;
    if (activeTrack) {
      contextualPrompt += `[TRILHA ATUAL: ${activeTrack}]\n`;
    }
    if (currentCode) {
      contextualPrompt += `[CÓDIGO ATUAL DO ALUNO NO EDITOR]:\n\`\`\`python\n${currentCode}\n\`\`\`\n`;
    }
    contextualPrompt += `\n[MENSAGEM DO ALUNO]:\n${message}`;

    // Format conversation history for Gemini if available
    const formattedContents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-6);
      for (const item of recentHistory) {
        if (item.sender === "user") {
          formattedContents.push({
            role: "user",
            parts: [{ text: item.text }],
          });
        } else if (item.sender === "tutor") {
          formattedContents.push({
            role: "model",
            parts: [{ text: item.text }],
          });
        }
      }
    }
    formattedContents.push({
      role: "user",
      parts: [{ text: contextualPrompt }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_PROMPT_DNF_TUTOR,
        temperature: 0.7,
      },
    });

    res.json({
      reply: response.text || "Professor DNF Cyber Tutor pronto para a próxima lição!",
    });
  } catch (error: any) {
    console.error("Error in /api/tutor/chat:", error);
    res.status(500).json({
      error: "Erro ao consultar o DNF Cyber Tutor.",
      details: error.message,
    });
  }
});

// Endpoint: Code Evaluation with Pedagogical Diagnostics
app.post("/api/tutor/evaluate-code", async (req, res) => {
  try {
    const { code, exerciseContext, studentLevel, attemptCount } = req.body;
    const ai = getGeminiClient();

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        analysis: "Código recebido para análise estática. Configure a chave de API para diagnóstico dinâmico do Tutor.",
        hasErrors: false,
        hint: "Verifique a indentação e os tipos de dados.",
      });
    }

    const evaluationPrompt = `Analise o código Python a seguir submetido pelo aluno.
Contexto do exercício: ${exerciseContext || "Exercício geral de Python/Cibersegurança"}
Nível do aluno: ${studentLevel || "INICIANTE"}
Tentativa número: ${attemptCount || 1}

Código submetido:
\`\`\`python
${code}
\`\`\`

Instruções pedagógicas:
1. Verifique sintaxe e lógica.
2. Identifique se atende aos objetivos do exercício.
3. Se houver erro:
   - Explique o que aconteceu pedagogicamente sem ofender.
   - Forneça Dica 1 (se tentativa 1) ou Dica 2 (se tentativa >= 2).
   - NÃO entregue o código completo corrigido de imediato, a menos que seja a 3ª tentativa ou solicitado.
4. Se o código estiver correto:
   - Dê parabéns, explique por que a solução funciona e faça uma pergunta de aprofundamento ou sugestão de melhoria de segurança (ex: validação de entrada, tratamento de exceções).

Responda em formato Markdown claro e encorajador.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: evaluationPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT_DNF_TUTOR,
        temperature: 0.4,
      },
    });

    res.json({
      feedback: response.text,
    });
  } catch (error: any) {
    console.error("Error in /api/tutor/evaluate-code:", error);
    res.status(500).json({
      error: "Erro ao avaliar o código.",
      details: error.message,
    });
  }
});

// Endpoint: Diagnostic Calibration Test
app.post("/api/tutor/diagnose", async (req, res) => {
  try {
    const { answers } = req.body;
    const ai = getGeminiClient();

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        level: "BÁSICO",
        summary: "Nível definido como BÁSICO com base nas respostas iniciais.",
      });
    }

    const prompt = `Avalie as seguintes respostas do aluno ao questionário diagnóstico de Python e Cibersegurança:
${JSON.stringify(answers, null, 2)}

Determine qual o nível mais apropriado para iniciar:
- INICIANTE (pouco ou nenhum contato prévio)
- BÁSICO (já conhece variáveis, prints e conceitos elementares de rede)
- INTERMEDIÁRIO (compreende funções, loops, HTTP, noções de OWASP e Linux)
- AVANÇADO (familiarizado com sockets, scripts de automação, criptografia e pentest ético)

Retorne em Markdown um resumo acolhedor, identificando o nível sugerido e o plano de estudos personalizado para o aluno.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT_DNF_TUTOR,
      },
    });

    res.json({
      diagnosis: response.text,
    });
  } catch (error: any) {
    console.error("Error in /api/tutor/diagnose:", error);
    res.status(500).json({
      error: "Erro no teste diagnóstico.",
      details: error.message,
    });
  }
});

// API health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", tutor: "DNF Cyber Tutor Online" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DNF Cyber Tutor Server running on port ${PORT}`);
  });
}

startServer();
