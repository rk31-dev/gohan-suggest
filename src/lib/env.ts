const requiredEnvVars = ['NOTION_API_KEY', 'NOTION_DATABASE_ID'] as const;

type EnvVar = (typeof requiredEnvVars)[number];

function validateEnv(): Record<EnvVar, string> {
  const env: Record<EnvVar, string> = {} as Record<EnvVar, string>;
  const missing: string[] = [];

  for (const key of requiredEnvVars) {
    const value = process.env[key];
    if (!value) {
      missing.push(key);
    } else {
      env[key] = value;
    }
  }

  if (missing.length > 0) {
    console.error(`[ENV ERROR] Missing environment variables: ${missing.join(', ')}`);
    console.error('[ENV ERROR] Please set these variables in Vercel Dashboard > Settings > Environment Variables');
  }

  return env;
}

export const env = validateEnv();
export const NOTION_API_KEY = env.NOTION_API_KEY;
export const NOTION_DATABASE_ID = env.NOTION_DATABASE_ID;
