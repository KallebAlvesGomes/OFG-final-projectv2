module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Método não permitido." });
  }

  const search = String(req.query.search || "").trim();
  const apiKey = process.env.RAWG_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "RAWG_API_KEY não está configurada na Vercel."
    });
  }

  if (!search || search.length > 100) {
    return res.status(400).json({
      error: "Informe um nome de jogo válido (até 100 caracteres)."
    });
  }

  try {
    const endpoint = new URL("https://api.rawg.io/api/games");
    endpoint.searchParams.set("key", apiKey);
    endpoint.searchParams.set("search", search);
    endpoint.searchParams.set("page_size", "10");

    const response = await fetch(endpoint);

    if (!response.ok) {
      console.error("RAWG respondeu com status:", response.status);
      return res.status(502).json({
        error: "A RAWG não conseguiu concluir a pesquisa."
      });
    }

    const data = await response.json();
    const results = (data.results || []).map((game) => ({
      id: game.id,
      name: game.name,
      image: game.background_image || null,
      slug: game.slug
    }));

    res.setHeader(
      "Cache-Control",
      "s-maxage=86400, stale-while-revalidate=604800"
    );

    return res.status(200).json({ results });
  } catch (error) {
    console.error("Erro ao consultar a RAWG:", error);
    return res.status(500).json({
      error: "Erro interno ao consultar a RAWG."
    });
  }
};
