# Young Interno — Portal de Aplicações

Portal interno da **Young Empreendimentos** que centraliza o acesso a todos os
sistemas da empresa, com login único (SSO via Supabase) e a identidade visual
oficial da marca.

> _Valorizando sonhos, construindo o futuro._

## Stack

- **React 18 + TypeScript + Vite**
- **Tailwind CSS v4** (tokens da marca em `src/index.css`)
- **Supabase JS** — autenticação compartilhada (`auth.users` do `young-workspace`)
- **lucide-react** — ícones

## Rodando localmente

```bash
npm install
cp .env.example .env   # e preencha as credenciais do Supabase
npm run dev            # http://localhost:5173
```

### Variáveis de ambiente (`.env`)

| Variável | Descrição |
|---|---|
| `VITE_SUPABASE_URL` | URL do projeto Supabase (`https://vvtympzatclvjaqucebr.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Chave **anon/publishable** (pública). Nunca use a `service_role` no frontend. |

## Personalização

- **Logo oficial:** coloque o arquivo em **`public/logo.svg`** (exporte do Guia de
  Marca). Enquanto não existir, o portal mostra um wordmark textual "young." de
  fallback.
- **Aplicações e URLs:** edite **`src/config/apps.ts`**. Cada app tem `url` (troque
  o `'#'` pelo endereço real), categoria, ícone, status e um campo `roles`
  reservado para o filtro por permissão (fase 2).
- **Cores e fontes:** definidas como tokens em **`src/index.css`** (`@theme`),
  extraídas do Guia de Marca 1.1:
  - Laranja `#FE5009` · Preto `#0D0D0D` · Azul `#061B39`
  - Fontes: **Space Grotesk** (títulos/botões) + **Be Vietnam Pro** (textos)

## Estrutura

```
src/
├── config/apps.ts        # catálogo das aplicações (edite aqui)
├── lib/supabase.ts       # cliente Supabase
├── context/AuthProvider  # sessão / login / logout
├── components/           # Header, AppCard, SearchBar, Logo
├── pages/                # Login, Dashboard
└── index.css             # design system (tokens da marca)
```

## Build e deploy

```bash
npm run build     # gera dist/
npm run preview   # pré-visualiza o build
```

### Deploy no GitHub Pages (gratuito)

Hospedado no Pages a partir da branch **`gh-pages`** (build-from-branch).
Site: `https://young-empreendimentos.github.io/young-interno/`

As credenciais do Supabase vão embutidas no build local (via `.env`), então
gere o `.env` antes de publicar. **Publicar uma nova versão:**

```bash
npm run build
npm run deploy   # envia o conteúdo de dist/ para a branch gh-pages
```

### (Opcional) Ativar deploy automático a cada push

Requer autorizar o escopo `workflow` no seu login do GitHub (abre o navegador
uma vez). O arquivo do workflow está guardado em `.github/deploy.yml.template`:

```bash
gh auth refresh -h github.com -s workflow
mkdir -p .github/workflows
cp .github/deploy.yml.template .github/workflows/deploy.yml
git add .github/workflows/deploy.yml
git commit -m "Ativa deploy automático no Pages"
git push
```

Cadastre também as credenciais como secrets (usadas pelo build automático):

```bash
gh secret set VITE_SUPABASE_URL --repo Young-Empreendimentos/young-interno --body "https://vvtympzatclvjaqucebr.supabase.co"
gh secret set VITE_SUPABASE_ANON_KEY --repo Young-Empreendimentos/young-interno --body "<chave-publicavel>"
```

A partir daí, todo push na `main` republica sozinho (via **Actions**) e a
branch `gh-pages` pode ser removida.

### Domínio próprio (`interno.youngempreendimentos.com.br`)

1. Crie o arquivo `public/CNAME` com uma linha: `interno.youngempreendimentos.com.br`
2. No DNS da Young, adicione um registro **CNAME**:
   `interno` → `young-empreendimentos.github.io`
3. Em **Settings → Pages → Custom domain**, informe o domínio (o HTTPS é
   emitido automaticamente).

## Roadmap

- [ ] Preencher as URLs reais de cada sistema em `src/config/apps.ts`
- [ ] Adicionar a logo oficial em `public/logo.svg`
- [ ] **Fase 2:** filtrar cards por permissão do usuário (campo `roles`)
- [ ] Favoritos / "acessados recentemente"
- [ ] Página de avisos/comunicados internos
