type FetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function api<T = unknown>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { body, headers, ...restOptions } = options;

  const response = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...restOptions,
  });

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.error || "An error occurred with the request");
  }

  return data as T;
}
