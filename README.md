# Loja de iPhones — Etapa 1

Landing page responsiva em HTML, CSS e JavaScript.

## Prévia local
Como o JavaScript utiliza módulos ES, execute com um servidor local (não abra o HTML diretamente pelo `file://`).

Exemplo com Python:
```bash
python -m http.server 8000
```
Depois acesse `http://localhost:8000`.

## Personalização inicial
Edite `js/firebase-config.js`:
- `storeConfig.name`: nome da loja.
- `storeConfig.whatsapp`: número com código do país e DDD, somente números.

Substitua `assets/logo/logo.svg` pelo logotipo fornecido pelo proprietário, mantendo o nome do arquivo ou atualizando o caminho no HTML.

## Importante
- Os três produtos em `js/app.js` são apenas demonstrativos; não representam estoque real.
- A integração com Firebase ainda não foi ativada. Ela será feita na Etapa 2.
- Não publique a loja com preços ou produtos demonstrativos.
- Não coloque senhas, service account ou credenciais privadas no JavaScript.
