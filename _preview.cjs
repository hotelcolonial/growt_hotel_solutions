const http=require('http'),fs=require('fs'),p=require('path');
const root=process.cwd();
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.png':'image/png','.ttf':'font/ttf','.css':'text/css','.md':'text/markdown'};
http.createServer((req,res)=>{
  let f=decodeURIComponent(req.url.split('?')[0]); if(f==='/')f='/index.html';
  const fp=p.join(root,f);
  fs.readFile(fp,(e,d)=>{ if(e){res.writeHead(404);res.end('404');return;} res.writeHead(200,{'Content-Type':types[p.extname(fp)]||'application/octet-stream'});res.end(d); });
}).listen(8125,()=>console.log('Preview server running at http://localhost:8125'));
