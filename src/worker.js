const enc = new TextEncoder();
const sessions = new Map();
const json = (o, status=200, headers={}) => new Response(JSON.stringify(o),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store',...headers}});
const tokenOf = request => (request.headers.get('authorization')||'').replace(/^Bearer\s+/i,'');
function valid(token){const x=sessions.get(token);if(!x)return false;if(x<Date.now()){sessions.delete(token);return false;}return true;}
export default {async fetch(request,env){const url=new URL(request.url); if(url.pathname.startsWith('/api/')){
 const path=url.pathname;
 if(path==='/api/status')return json({ok:true,mode:'open-test',platform:'CEEB Informática Básica'});
 if(path==='/api/admin/login'&&request.method==='POST'){
  const ip=request.headers.get('CF-Connecting-IP')||'local';
  const {password=''}=await request.json().catch(()=>({}));
  const expected=env.ADMIN_PASSWORD||'Clecio40';
  const a=enc.encode(String(password)),b=enc.encode(String(expected));
  let diff=a.length^b.length;for(let i=0;i<Math.max(a.length,b.length);i++)diff|=(a[i]||0)^(b[i]||0);
  if(diff!==0)return json({error:'Senha incorreta.'},401);
  const token=crypto.randomUUID()+crypto.randomUUID();sessions.set(token,Date.now()+8*60*60*1000);
  return json({token,expiresIn:28800});
 }
 if(path==='/api/admin/check')return json({authenticated:valid(tokenOf(request))});
 if(path==='/api/admin/logout'&&request.method==='POST'){sessions.delete(tokenOf(request));return json({ok:true});}
 if(path.startsWith('/api/media/')&&request.method==='GET'){
  if(!env.COURSE_FILES)return json({error:'R2 não configurado.'},503);
  const key=decodeURIComponent(path.slice('/api/media/'.length));if(!/^course-videos\/[a-zA-Z0-9-]+\.(mp4|webm)$/.test(key))return json({error:'Arquivo inválido.'},400);
  const object=await env.COURSE_FILES.get(key);if(!object)return json({error:'Não encontrado.'},404);
  return new Response(object.body,{headers:{'content-type':object.httpMetadata?.contentType||'video/mp4','cache-control':'public, max-age=3600','accept-ranges':'none','x-content-type-options':'nosniff'}});
 }
 if(path==='/api/admin/upload'&&request.method==='PUT'){
  if(!valid(tokenOf(request)))return json({error:'Não autorizado.'},401);
  if(!env.COURSE_FILES)return json({error:'Configure o binding R2 COURSE_FILES no wrangler.toml.'},503);
  const mime=request.headers.get('content-type')||'';
  if(!['video/mp4','video/webm'].includes(mime))return json({error:'Somente MP4 ou WebM.'},415);
  const len=Number(request.headers.get('content-length')||0);if(len>100*1024*1024)return json({error:'Máximo 100 MB.'},413);
  const key='course-videos/'+crypto.randomUUID()+(mime==='video/webm'?'.webm':'.mp4');
  try{await env.COURSE_FILES.put(key,request.body,{httpMetadata:{contentType:mime}});return json({url:'/api/media/'+key})}catch(e){return json({error:'Falha no armazenamento R2.'},500)}
 }
 if(path==='/api/admin/overrides'){
  if(!valid(tokenOf(request))&&request.method!=='GET')return json({error:'Não autorizado.'},401);
  if(request.method==='GET'){
   if(!env.COURSE_DB)return json({overrides:{},storage:'local-only'});
   try{const row=await env.COURSE_DB.prepare('SELECT data FROM settings WHERE key=?').bind('course_overrides').first();return json({overrides:row?JSON.parse(row.data):{},storage:'d1'});}catch{return json({overrides:{},storage:'not-configured'});}
  }
  if(request.method==='PUT'){
   if(!env.COURSE_DB)return json({error:'Banco D1 não configurado. Use o modo local de teste.'},503);
   const body=await request.json().catch(()=>({}));const value=JSON.stringify(body.overrides||{});
   if(value.length>150000)return json({error:'Dados grandes demais.'},413);
   await env.COURSE_DB.prepare('INSERT INTO settings(key,data) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET data=excluded.data').bind('course_overrides',value).run();return json({ok:true});
  }
 }
 return json({error:'Rota não encontrada.'},404);
 }
 return env.ASSETS.fetch(request);
 }};
