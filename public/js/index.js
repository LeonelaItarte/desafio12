//coneccion del lado del cliente 

const socket= io.connect();


function render(data){

  const html= data.map(item=>{
    return(`<div class=producto-pincipal><div class='producto'>${item.nombre}</div><div class='producto'>${item.precio}</div><div class='producto-img'><img src='${item.foto}'></div></div>`)
  }).join(' ')

  document.getElementById('producto').innerHTML=html
}

// esta funcion se ejecuta cuando doy clic al btn de enviar
function addProducto (){
    const nombreProducto= document.getElementById('nombre').value;

    const precioProducto=document.getElementById('precio').value;

    const fotoProducto= document.getElementById('foto').value;

    const productos ={
        nombre: nombreProducto,
        precio:precioProducto,
        foto:fotoProducto
    }

    //enviamos la data al server
    socket.emit('new-producto', productos)

    return false
}


//recibimos info de parte del server
socket.on('producto', data=>{
    render(data)
})

//------------- CHAT-----------//

function renderMensajes(data){
  
  const html= data.map(item=>{
    return(`<div class='mensaje2'><div class='chat'>${item.author}[${item.fechaHoy}]:</div><div class='chat'>${item.text}</div></div>`)
  }).join(' ')

  document.getElementById('mensaje').innerHTML=html;
}


function addMensaje (){
  const authorName= document.getElementById('author').value;

  const textMsn=document.getElementById('text').value;

  const mensajes ={
      author:authorName,
      text:textMsn
      
      
  }

  //enviamos la data al server
  socket.emit('new-mensaje', mensajes )

  return false
}


socket.on('mensaje', data=>{
  renderMensajes(data)
})
