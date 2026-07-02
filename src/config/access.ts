// ============================================================
//  Controle de acesso do portal — SEM tabela, direto no código.
//  Regra: quem tiver e-mail de um destes domínios entra.
//  Cada sistema (CRM, ADIMPLA, etc.) ainda pede o próprio login depois.
// ============================================================

/** Domínios de e-mail autorizados a acessar o portal. */
export const ALLOWED_EMAIL_DOMAINS = ['youngempreendimentos.com.br']

/** true se o e-mail pertence a um domínio autorizado. */
export function isAllowedEmail(email: string | null | undefined): boolean {
  if (!email) return false
  const domain = email.trim().toLowerCase().split('@')[1] ?? ''
  return ALLOWED_EMAIL_DOMAINS.includes(domain)
}
