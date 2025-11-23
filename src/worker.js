import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

export default {
  async fetch(request, env, ctx) {
    try {
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: JSON.parse(env.__STATIC_CONTENT_MANIFEST),
        }
      );
    } catch (err) {
      console.error("Asset fetch error:", err);

      return new Response(
        JSON.stringify({
          error: true,
          message: "Worker backend active, asset not found.",
          reason: err.message,
          keyExists: !!env.VITE_GEMINI_API_KEY,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },
};
          
