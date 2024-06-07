import {createServer} from 'http';

const server = createServer((request, response)=>{
  let content = "Hello, world!"
  response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'})
  response.end(content);
});

server.listen(5000, ()=>{
  console.log(`Server is listening at http://localhost:${server.address().port}`)
})