import { getNotesFireStore, saveNoteFireStore, updateNoteFireStore } from 'https://matcrojas.github.io/Aplicaciones-Web-Progresivas/10b/practica11/js/firestore-functions.js'

//Contiene el maximo de notas en  la base de datos
var maxNotes = 1;
//Contiene el maximo de notas en pantalla
var onPage = 0;
//Contiene el limite de notas que traera cada que hace una consulta
var limit = 8;

//La n representa desde que numero del arreglo comienza a pintar las notas
const getAllNotes = async (n) => {
    const doc = await getNotesFireStore();
    let card = document.getElementById('cards')
    let newCard = document.createElement('div');
    //let actualList = onPage;
    maxNotes = doc.size;
    console.log(doc);
    newCard.innerHTML = '';

    doc.forEach((doc) => {
        if (limit != 0 && onPage != maxNotes && n <= 0) {

            let newCard = document.createElement('div');

            newCard.innerHTML = `
            <div class="card" id="note`+ onPage + `">
            <div class="card-body" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div class="row">
                    <div class="col-2">
                        <!-- La imagen de la nota, si la tiene -->
                        <img src="https://blogs.unsw.edu.au/nowideas/files/2020/03/eventos-corporativos.jpg"
                            class="img-fluid rounded" alt="...">
                    </div>
                    <div class="col text-truncate">` +
                doc.data().text
                + `</div>
                </div>
            </div>
        </div>`
            card.appendChild(newCard);
            document.getElementById("note" + onPage).addEventListener("click", function () {
                $('#exampleModal').modal({ show: true });
                document.getElementById("nota-id").value = doc.id;
                document.getElementById("nota-text").innerHTML = doc.data().text;
            }, false);
            limit--;
            onPage++;
        }

        n--;
    });
    limit = 8;
}

const saveNote = async (note) => {
    const result = await saveNoteFireStore(note);
    if (result === 'ok') {
        alert('Nota Registrada')

    } else {
        alert('Nota No Registrada')
    }
}

const btnSaveNote = document.getElementById('btnSaveNote');
btnSaveNote.addEventListener('click', async () => {
    const textNote = document.getElementById('textNote');
    const note = {
        text: textNote.value
    }

    await saveNote(note)

    textNote.value = '';

    await getAllNotes(maxNotes + 1);

});

const updateNote = async (note) => {
    const result = await updateNoteFireStore(note);
    if (result === 'ok') {
        alert('Nota Actualizada')

    } else {
        alert('Nota No Actualizada')
    }
}

const btnUpdateNote = document.getElementById('btnUpdateNote');
btnUpdateNote.addEventListener('click', async () => {
    const textNote = document.getElementById('nota-text');
    const idNote = document.getElementById('nota-id')
    const note = {
        id: idNote.value,
        text: textNote.value
    }

    await updateNote(note)

    textNote.value = '';

    window.location.reload();

});

//Para funcionar con el scroll
const onScroll = () => {
    const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );


    if (window.pageYOffset + window.innerHeight >= scrollHeight - 1) {
        getAllNotes(8)
    }
}

window.addEventListener('scroll', onScroll)

getAllNotes(0);


const btnCamera = document.getElementById('btnCamera');
const btnTakePhoto = document.getElementById('btnTakePhoto');

const video = document.getElementById('video');
const photo = document.getElementById('photo');

const camera = new Camera(video);

btnCamera.addEventListener('click', ()=>{
    camera.power();
})

btnTakePhoto.addEventListener('click', ()=>{
    let picture = camera.takePhoto();
    camera.off();
    photo.setAttribute('src', picture);
    console.log("Base = " + picture);

})
