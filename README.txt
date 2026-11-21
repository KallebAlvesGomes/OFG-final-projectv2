GAMEKINATOR — INTEGRAÇÃO RAWG

O que foi alterado
- Criada a função de backend api/games.js para consultar a RAWG sem expor a chave no navegador.
- O Gamekinator pesquisa a imagem do jogo quando apresenta um palpite.
- Se não houver imagem ou a API estiver indisponível, o cartão provisório original continua aparecendo.
- Adicionado crédito/link da RAWG no rodapé.

ANTES DE PUBLICAR NA VERCEL
1. Na Vercel, abra o projeto correto.
2. Vá em Settings > Environment Variables.
3. Crie a variável:
   RAWG_API_KEY
4. Cole o valor da sua chave RAWG recém-gerada.
5. Salve e faça um novo Deploy.

IMPORTANTE
- Não coloque a chave da RAWG no index.html, no script do navegador ou em arquivos públicos.
- A chave que apareceu em uma captura de tela deve ser regenerada na conta RAWG. Use a chave nova na variável RAWG_API_KEY.
- A integração precisa estar hospedada na Vercel para que /api/games funcione. Um preview local estático sem servidor não executará essa função.
- Depois do deploy, teste:
  https://SEU-DOMINIO.vercel.app/api/games?search=Minecraft

SOBRE AS IMAGENS
A integração usa o campo background_image retornado pela RAWG. Ele costuma ser uma imagem promocional/cena do jogo, não necessariamente a arte oficial vertical da caixa. O layout exibe essa imagem em um quadro vertical com corte. Se for obrigatório usar box art oficial, será necessário um provedor que ofereça explicitamente capas de caixa e cujos termos permitam esse uso.

ATRIBUIÇÃO
O rodapé inclui um link para RAWG. Verifique e cumpra os termos atuais da API e as regras de atribuição aplicáveis ao seu projeto.
