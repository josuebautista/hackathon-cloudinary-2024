import type { APIRoute } from "astro";

export const GET: APIRoute = ({ url }): Response => {
  const id: string | null = url.searchParams.get("id");
  if (id === null) return new Response(JSON.stringify({
    error: 'Missing id parameter'
  }), {
    status: 400,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  return new Response(JSON.stringify({
    id
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}