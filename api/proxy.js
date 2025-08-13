// api/proxy.js

export default async function handler(request, response) {
  const { url } = request.query;

  if (!url) {
    return response.status(400).send('Erro: Parâmetro "url" não fornecido.');
  }

  try {
    const fetchResponse = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });

    if (!fetchResponse.ok) {
      return response.status(fetchResponse.status).send(`Erro ao buscar a URL: ${fetchResponse.statusText}`);
    }

    const data = await fetchResponse.text();

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    
    return response.status(200).send(data);

  } catch (error) {
    return response.status(500).send(`Erro interno do proxy: ${error.message}`);
  }
}
