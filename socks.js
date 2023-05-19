//socks5->ws
const net=require('net');
const {WebSocket,createWebSocketStream }=require('ws');
const logcb= (...args)=>console.log.bind(this,...args);
const errcb= (...args)=>console.error.bind(this,...args);
const socks= ({host,psw,sport})=>{
  const url='wss://'+host;
  net.createServer(socks=>socks.once('data', data=>{
    const [VERSION]=data;//VERSION NMETHODS METHODS
    if (VERSION!=0x05) socks.end();
    else if(data.slice(2).some(method=>method==0x00)){//0x00,0x02
      socks.write(Buffer.from([0x05, 0x00]));//select
      socks.once('data', head=>{
        const [VERSION,CMD,RSV,ATYP]=head;
        if(VERSION!=0x05 || CMD!=0x01) return;//connect
        const hostname= ATYP==0x01? head.slice(4,-2).map(b=>parseInt(b,10)).join('.')://IPV4
          (ATYP==0x04? head.slice(4,-2).reduce((s,b,i,a)=>(i%2?s.concat(a.slice(i-1,i+1)):s), []).map(b=>b.readUInt16BE(0).toString(16)).join(':')://IPV6
          (ATYP==0x03? head.slice(5,-2).toString('utf8'):''));//DOMAIN
        const port= head.slice(-2).readUInt16BE(0);
        const ws=new WebSocket(url);
        ws.on('open',e=>{
          ws.send(JSON.stringify({hostname,port,psw}));
          logcb('conn: ')(hostname,port);
          socks.write((head[1]=0x00,head));
          const duplex=createWebSocketStream(ws);
          socks.on('error',errcb('E1:')).pipe(duplex).pipe(socks).on('error',errcb('E2:'));
        }).on('error',e=>{
          errcb('conn-err:')(e);
          socks.end((head[1]=0x03,head));
        });
      });
    } else socks.write(Buffer.from([0x05, 0xff]));//reject
    }).on('error', errcb('socks-err:'))
  ).listen(sport,logcb('Socks5 listen on port:',sport)).on('error',errcb('Socks5 Err'));
}
module.exports = socks;