const http=require('http')


const todos=[
    {id:1, text:'Todo one'},
    {id:2, text:'Todo two'},
    {id:3, text:'Todo three'},
    {id:4, text:'Todo four'},
    {id:5, text:'Todo five'}
    
]
const server=http.createServer( (req, res)=>{
    // res.statusCode=404
    // res.setHeader('Content-type', 'application/json')
    // res.setHeader('X-Powered-By', 'Node.js')
    // // const {headers, url, }=req
    // // console.log(headers, url, )
    // res.write('hello')
    // res.write('<h1>Hello world</h1>')
    // res.write('<h2>hello world</h2>')


  const {method, url}= req
    let body=[]
    req.on('data', chunk=>{
body.push(chunk)
    }).on('end', ()=>{
        body=Buffer.concat(body).toString()
        let status=404
        const response={
            success:false,
            data:null
        }

        if(method==='GET' && url==='/todos'){
          status=200
          response.success=true
          response.data=todos
        }else if(method==='POST' && url==='/todos'){
           const {id, text}= JSON.parse(body)
           todos.push({id, text})
           status=201
           response.success=true
           response.data=todos
            
        }

        res.writeHead(status, {
            'Content-Type': 'application/json',
            'A-Powered-By': 'Node.js'
        })
        res.end(JSON.stringify(response))
    })
   
})
const PORT=5000
server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})