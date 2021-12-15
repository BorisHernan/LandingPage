const url = "http://localhost:3000/api/orden/";
let resultados = '';
const formArticulo = document.querySelector("form");
const nameord = document.getElementById("nameord");
const emaord = document.getElementById("emaord");
const celord = document.getElementById("celord");
const foonamord = document.getElementById("foonamord");
const msgcord = document.getElementById("msgcord");
var opcion = '';

btnCrear.addEventListener('click', () => {
    console.log("Acción de listar activada");
    opcion = 'crear';
});

formArticulo.addEventListener('submit',
    (e) => {
        e.preventDefault();
        if (opcion == 'crear') {
            if (nameord.value == "" || emaord.value == "" || celord.value == "" || foonamord.value == "" || msgcord.value == "") {
                alert("Asegúrese de que todos los campos estén completos");
                return false;
            } else {
                console.log("Todos los campos están completos");
                fetch(
                    url,
                    {
                        method: 'POST',
                        headers: {
                            'content-Type':'application/json'
                        },
                        body: JSON.stringify(
                            {
                                nameord: nameord.value,
                                emaord: emaord.value,
                                celord: celord.value,
                                foonamord: foonamord.value,
                                msgcord: msgcord.value
                            }
                        )
                    }
                )
                .then(
                    response => response.json()
                )
                .then(
                    response => location.reload()
                );
            }
        } else if(opcion == 'editar'){
            console.log("Activado el ");
        }
    }
);
s