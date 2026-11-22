import type { MediaCollectionRequest } from "../types/types";

interface CreateCollectionResponse {
  data: unknown;
  message?: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export async function createCollection(
  payload: MediaCollectionRequest
): Promise<{ data: unknown }> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "";
  const response = await fetch(`${baseUrl}/api/media-collections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const body = (await response.json().catch(() => null)) as
    | CreateCollectionResponse
    | null;

  if (!response.ok) {
    const error: ApiError = {
      response: {
        data: {
          message: body?.message,
        },
      },
    };
    throw error;
  }

  return { data: body?.data ?? body };
}
