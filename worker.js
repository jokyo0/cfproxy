module.exports=`
import { connect } from 'cloudflare:sockets';
export default{async fetch(request){
  const upgradeHeader=request.headers.get("Upgrade");
  if(upgradeHeader!=="websocket") return new Response(null, {status:400});
  const [client, server]=Object.values(new WebSocketPair());
  server.accept();
  server.addEventListener('message',({data})=>{
    const {hostname,port,psw}=JSON.parse(data);
    try{
      if(passwd!=psw) throw 'Illegal-User';
      const socket=connect({hostname,port});
      new ReadableStream({
        start(controller){
          server.onmessage= ({data})=>controller.enqueue(data);
          server.onerror=e=>controller.error(e);
          server.onclose=e=>controller.close(e);
        },
        cancel(reason){console.log('cancel',reason);}
      }).pipeTo(socket.writable);
      socket.readable.pipeTo(new WritableStream({
        start(controller){server.onerror=e=>controller.error(e);},
        write(chunk){server.send(chunk);},
        abort(reason){console.log('abort',reason);}
      }));
    }catch(error){ return new Response(null, {status:500}); }
  },{once:true});
  return new Response(null, {status:101, webSocket:client});
}}`