// Le site est publié sous /portfolio (champ "homepage" du package.json), donc les
// fichiers de public/ ne sont pas servis à la racine. Les chemins relatifs marchent
// par hasard en production et cassent en développement : on préfixe explicitement.
const BASE = (process.env.PUBLIC_URL || '').replace(/\/$/, '');

export default function assetUrl(path) {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path)) return path;
  return `${BASE}/${path.replace(/^\//, '')}`;
}
