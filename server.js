/**
 * @file server.js
 * Entry file para execução em produção na Hostinger (Node.js 22)
 *
 * Responsabilidades:
 * - Configurar Express com porta dinâmica (process.env.PORT || 3000)
 * - Prover rotas de API REST (/api/health, /api/agendamento)
 * - Servir os arquivos estáticos do frontend gerados pelo Vite (dist/)
 * - Roteamento SPA fallback para requisições frontend
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente se o arquivo .env existir
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Configuração de middlewares para parsing de corpo de requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Headers de segurança básicos para produção
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});

// ============================================================================
// ROTAS DA API REST (/api/*)
// ============================================================================

/**
 * Healthcheck da API (Monitoramento e uptime)
 */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Sorria+ Odontologia API',
    runtime: `Node.js ${process.version}`,
    environment: process.env.NODE_ENV || 'production',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

/**
 * Endpoint para recebimento e validação de pré-agendamentos da landing page
 */
app.post('/api/agendamento', (req, res) => {
  try {
    const { name, phone, treatment, period, notes } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        error: 'Nome completo obrigatório (mínimo 3 caracteres).'
      });
    }

    const cleanPhone = (phone || '').toString().replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Telefone ou WhatsApp válido com DDD é obrigatório.'
      });
    }

    const bookingEntry = {
      id: `AG-${Date.now()}`,
      name: name.trim(),
      phone: cleanPhone,
      treatment: treatment || 'Avaliação Geral 3D',
      period: period || 'Manhã',
      notes: (notes || '').toString().trim(),
      receivedAt: new Date().toISOString()
    };

    console.log('[Sorria+ API] Novo agendamento registrado:', bookingEntry);

    return res.status(201).json({
      success: true,
      message: 'Solicitação de agendamento recebida com sucesso.',
      data: bookingEntry
    });
  } catch (err) {
    console.error('[Sorria+ API] Erro ao processar agendamento:', err);
    return res.status(500).json({
      success: false,
      error: 'Erro interno ao registrar solicitação de agendamento.'
    });
  }
});

// ============================================================================
// SERVIÇO DO FRONTEND ESTÁTICO (dist/) & SPA FALLBACK
// ============================================================================

const distPath = path.resolve(__dirname, 'dist');

// Servir arquivos estáticos da pasta dist gerada pelo build do Vite
app.use(express.static(distPath, {
  maxAge: '1d',
  index: 'index.html'
}));

// Fallback SPA para todas as outras rotas (não-API)
app.get('*', (req, res) => {
  // Não intercepta rotas /api inexistentes com HTML
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Rota de API não encontrada' });
  }

  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }

  return res.status(404).send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8" />
        <title>Sorria+ | Build Pendente</title>
        <style>
          body { font-family: sans-serif; padding: 40px; text-align: center; background: #F3F3F3; color: #0D0D0D; }
          .card { max-width: 500px; margin: 40px auto; background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
          code { background: #E5E5E5; padding: 4px 8px; border-radius: 6px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>Frontend ainda não compilado</h2>
          <p>O servidor Node.js Express está ativo, mas o build do frontend não foi encontrado na pasta <code>dist/</code>.</p>
          <p>Execute no terminal da Hostinger: <code>npm run build</code> e reinicie o aplicativo.</p>
        </div>
      </body>
    </html>
  `);
});

// Inicialização do servidor
app.listen(PORT, HOST, () => {
  console.log(`[Sorria+] Servidor Node.js 22 ativo em http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
  console.log(`[Sorria+] Diretório de distribuição estática: ${distPath}`);
});
