let socket = io.connect('http://localhost:8080/', { forceNew : true});

let formularioChat = document.getElementById("formChat");

socket.on('listProducts', (data) => {
    renderProducts(data);
})

socket.on('messages', (chats) => {
    renderChats(chats);
})

function renderProducts(data){
    let html = data.map( elem =>{
       return ( `<tr>
                    <td>${elem.title}</td>
                    <td>${elem.price}</td>
                    <td>${elem.stock}</td>
                    <td><img width="50px" height="50px" src="${elem.thumbnail}"></td>
                </tr>`);
    }).join(" ");

    document.getElementById('bodyTable').innerHTML = html;
}

function renderChats(chats){
    let html = chats.map(elem => {
        return (`<p>
                    <span class=email>${elem.email} </span>
                    <span class=text>${elem.text} </span>
                    <span class=date>${elem.date} </span>
                </p>`);
    }).join(" ");

    document.getElementById('listaMensajes').innerHTML = html;
}

function addProduct(){
    let product = {
        title : document.getElementById('title').value,
        price: document.getElementById('price').value,
        stock:  document.getElementById('stock').value,
        thumbnail: document.getElementById('thumbnail').value   
    }
    socket.emit('new-product', product);
    return false;
};

formularioChat.addEventListener('submit', ()=>{
    event.preventDefault();
    let now = moment().format('DD MMMM YYYY, h:mm:ss a');
    console.log(now);

    let chat = {
        email : document.getElementById('email').value,
        text: document.getElementById('message').value,
        date: now
    }

    socket.emit('new-message', chat);
    return false;
})