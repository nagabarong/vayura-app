export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions<TBody = unknown> extends RequestInit {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
}

export async function apiFetch<TResponse = unknown, TBody = unknown>(
  input: string,
  options: RequestOptions<TBody> = {}
): Promise<TResponse> {
  const { method = "GET", body, headers, ...rest } = options;

  const response = await fetch(input, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!response.ok) {
    const message = await safeParseError(response);
    throw new Error(message);
  }

  // Handle empty responses
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
}

async function safeParseError(response: Response): Promise<string> {
  try {
    const data = await response.json();
    return data?.message || response.statusText;
  } catch {
    return response.statusText;
  }
}
