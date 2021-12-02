const carrito = document.getElementById('carrito');
const muebles = document.getElementById('lista-mueble');
const listamuebles = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners () {
    muebles.addEventListener('click', comprarMueble);
    carrito.addEventListener('click', eliminarMueble);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', leerLocalStorage)
}

function comprarMueble(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const mueble = e.target.parentElement.parentElement;
        leerDatosMueble(mueble);
    }
}

function leerDatosMueble(mueble) {
    const infoMueble = {
        imagen: mueble.querySelector('img').src,
        titulo: mueble.querySelector('h4').textContent,
        precio: mueble.querySelector('.precio span').textContent,
        id: mueble.querySelector('a').getAttribute('date-id')
    }
    insertarCarrito(infoMueble);
}

function insertarCarrito(mueble) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${mueble.imagen}" width=100>
        </td>
        <td>${mueble.titulo}</td>
        <td>${mueble.precio}</td>
        <td>
            <a href="#" class="borrar-mueble" data-id="${mueble.id}">X</a>
        </td>
    `;
    listamuebles.appendChild(row);
    guardarMuebleLocalStorage(mueble);
}


function eliminarMueble(e) {
    e.preventDefault();

    let mueble,
    muebleId;
    if(e.target.classList.contains('borrar-mueble')){
        e.target.parentElement.parentElement.remove();
        mueble = e.target.parentElement.parentElement;
        muebleId = mueble.querySelector('a').getAttribute('data-id');
    }
    eliminarMuebleLocalStorage(muebleId);
}

function vaciarCarrito() {
    while(listamuebles.firstChild){
        listamuebles.removeChild(listamuebles.firstChild);

    }

    vaciarLocalStorage();
    return false;
}

function guardarMuebleLocalStorage(mueble) {
    let muebles;
    muebles = obtenermueblesLocalStorage();
    muebles.push(mueble);
    localStorage.setItem('muebles', JSON.stringify(muebles))
}

function obtenermueblesLocalStorage() {
    let mueblesLS;

    if(localStorage.getItem('muebles') === null){
        mueblesLS = [];
    } else {
        mueblesLS = JSON.parse(localStorage.getItem('muebles'));
    }
    return mueblesLS;
}

function leerLocalStorage() {
    let mueblesLS;

    mueblesLS = obtenermueblesLocalStorage();

    mueblesLS.forEach(function(mueble){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${mueble.imagen}" width=100> 
            </td>
            <td>${mueble.titulo}</td>
            <td>${mueble.precio}</td>
            <td>
                <a href="#" class="borrar-mueble" data-id="${mueble.id}">X</a>
            </td>
        `;
        listamuebles.appendChild(row);
    });

}

function eliminarMuebleLocalStorage(mueble) {
    let mueblesLS;

    mueblesLS = obtenermueblesLocalStorage();

    mueblesLS.forEach(function(mueblesLS, index){
        if(mueblesLS.id === mueble) {
            mueblesLS.splice(index, 1)
        }
    });

    localStorage.setItem('muebles', JSON.stringify(mueblesLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}