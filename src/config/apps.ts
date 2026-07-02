import {
  Bot,
  Calculator,
  CreditCard,
  Database,
  FileStack,
  Handshake,
  HardHat,
  Headset,
  LandPlot,
  PencilRuler,
  Percent,
  Stamp,
  Truck,
  UsersRound,
  UserSearch,
  type LucideIcon,
} from 'lucide-react'

export type AppStatus = 'ativo' | 'em-breve' | 'legado'

export interface AppCategory {
  id: string
  label: string
  /** Cor de acento do grupo (token do design system). */
  accent: string
}

export interface AppEntry {
  id: string
  name: string
  /** Descrição curta exibida no card. */
  description: string
  /** URL de acesso ao sistema. */
  url: string
  icon: LucideIcon
  category: AppCategory['id']
  status: AppStatus
  /** Tecnologia/hospedagem — informativo. */
  tech?: string
  /**
   * Reservado para filtro por permissão (fase 2).
   * Ex.: ['admin', 'comercial']. Vazio/undefined = visível a todos.
   */
  roles?: string[]
}

/* ------------------------------------------------------------------ */
/*  Categorias                                                         */
/* ------------------------------------------------------------------ */
export const CATEGORIES: AppCategory[] = [
  { id: 'comercial', label: 'Comercial & Vendas', accent: 'var(--color-young-orange)' },
  { id: 'financeiro', label: 'Financeiro & Cobrança', accent: 'var(--color-young-teal)' },
  { id: 'obras', label: 'Obras & Engenharia', accent: 'var(--color-young-blue-bright)' },
  { id: 'pessoas', label: 'Pessoas & Frota', accent: 'var(--color-young-gray-light)' },
  { id: 'automacao', label: 'Automação', accent: 'var(--color-young-orange-dark)' },
]

/* ------------------------------------------------------------------ */
/*  Aplicações                                                         */
/* ------------------------------------------------------------------ */
export const APPS: AppEntry[] = [
  // --- Comercial & Vendas ---
  {
    id: 'perdigueiro',
    name: 'Perdigueiro',
    description: 'Captação de novas áreas e glebas + pesquisa de mercado.',
    url: 'https://perdigueiro.youngempreendimentos.com.br/login',
    icon: LandPlot,
    category: 'comercial',
    status: 'ativo',
    tech: 'Lovable',
  },
  {
    id: 'crm',
    name: 'CRM & Comercial',
    description: 'Funil de vendas, leads, tabela de preços, lotes e contratos.',
    url: 'https://pingolead.youngempreendimentos.com.br/dashboard',
    icon: Handshake,
    category: 'comercial',
    status: 'ativo',
    tech: 'Lovable',
  },
  {
    id: 'comissoes',
    name: 'Comissões',
    description: 'Cálculo e aprovação de comissões de corretores.',
    url: 'https://comissoes.youngempreendimentos.com.br/login',
    icon: Percent,
    category: 'comercial',
    status: 'ativo',
    tech: 'Lovable',
  },

  // --- Financeiro & Cobrança ---
  {
    id: 'adimpla',
    name: 'ADIMPLA',
    description: 'Gestão de cobrança e inadimplência.',
    url: 'https://adimpla.lovable.app',
    icon: CreditCard,
    category: 'financeiro',
    status: 'ativo',
    tech: 'Lovable',
  },
  {
    id: 'posvenda',
    name: 'Pós-venda',
    description: 'Distratos, renegociação, leilão, titularidade e escritura.',
    url: 'https://processosposvenda.youngempreendimentos.com.br/',
    icon: Headset,
    category: 'financeiro',
    status: 'ativo',
    tech: 'Lovable',
  },
  {
    id: 'sienge',
    name: 'Sienge',
    description: 'ERP: contratos, unidades, clientes e parcelas.',
    url: 'https://youngemp.sienge.com.br/sienge/8/index.html',
    icon: Database,
    category: 'financeiro',
    status: 'ativo',
    tech: 'ERP',
  },
  {
    id: 'registros',
    name: 'Registros',
    description: 'Registros de cartório, documentação e comprovantes.',
    url: 'https://sistemaderegistros.youngempreendimentos.com.br/login',
    icon: FileStack,
    category: 'financeiro',
    status: 'ativo',
    tech: 'Lovable',
  },
  {
    id: 'recalcula',
    name: 'Recalcula',
    description: 'Recálculo e aditivos de contratos.',
    url: 'https://recalcula.youngempreendimentos.com.br/',
    icon: Calculator,
    category: 'financeiro',
    status: 'ativo',
    tech: 'Lovable',
  },

  // --- Obras & Engenharia ---
  {
    id: 'paver',
    name: 'Paver',
    description: 'Gestão de obras: EAP, diários, orçamentos e fotos.',
    url: 'https://paver.youngempreendimentos.com.br/',
    icon: HardHat,
    category: 'obras',
    status: 'ativo',
    tech: 'Lovable',
  },
  {
    id: 'esquadro',
    name: 'Esquadro',
    description: 'Demandas de projetos e registro de horas.',
    url: 'https://esquadro.youngempreendimentos.com.br/',
    icon: PencilRuler,
    category: 'obras',
    status: 'ativo',
    tech: 'Lovable',
  },
  {
    id: 'destrava',
    name: 'Destrava',
    description: 'Licenciamento de empreendimentos junto a órgãos externos (Kanban).',
    url: 'https://destrava.youngempreendimentos.com.br/',
    icon: Stamp,
    category: 'obras',
    status: 'ativo',
    tech: 'React · Railway',
  },

  // --- Pessoas & Frota ---
  {
    id: 'rh',
    name: 'RH · Pilares',
    description: 'Funcionários, folha, aditivos, treinamentos e auditorias.',
    url: 'https://pilares.youngempreendimentos.com.br/',
    icon: UsersRound,
    category: 'pessoas',
    status: 'ativo',
    tech: 'Lovable',
  },
  {
    id: 'talents',
    name: 'Talents',
    description: 'Recrutamento e seleção.',
    url: 'https://talents.youngempreendimentos.com.br/',
    icon: UserSearch,
    category: 'pessoas',
    status: 'ativo',
    tech: 'Lovable',
  },
  {
    id: 'frota',
    name: 'Frota',
    description: 'Veículos, manutenções, abastecimentos e sinistros.',
    url: 'https://young-empreendimentos.github.io/Controledefrota/',
    icon: Truck,
    category: 'pessoas',
    status: 'ativo',
    tech: 'GitHub Pages',
  },

  // --- Automação ---
  {
    id: 'bots-n8n',
    name: 'Bots (n8n)',
    description: 'Bots de WhatsApp e automações de fluxo.',
    url: '#',
    icon: Bot,
    category: 'automacao',
    status: 'ativo',
    tech: 'n8n',
  },
]
