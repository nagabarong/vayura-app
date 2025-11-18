function required(name: string, value: string | undefined, fallback?: string): string {
  if (value && value.length > 0) return value;
  if (fallback) return fallback;
  throw new Error(`Missing environment variable: ${name}`);
}

export const env = {
  SITE_URL: required("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL, "http://localhost:3000"),
};
