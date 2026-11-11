/** OAuth client credentials are supplied by the DSH host, never bundled. */
export function directOAuthClientCredentials(): { clientId: string; clientSecret: string } | undefined {
  const clientId = process.env.AGY_CLIENT_ID?.trim()
  const clientSecret = process.env.AGY_CLIENT_SECRET?.trim()
  return clientId && clientSecret ? { clientId, clientSecret } : undefined
}
