import { collection, orderBy , addDoc, getDocs, doc, updateDoc , query, getFirestore } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"; 


import { app } from "./firestore.js";

const db = getFirestore(app);

const getNotesFireStore = async () => {
    const q = query(collection(db, 'notes'),  orderBy("create_at", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot
    
    /*
    querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
    });
    */
};

const saveNoteFireStore = async (note) => {
    const docRef = await addDoc(collection(db, 'notes'), {
    text: note.text,
    create_at: new Date()
  });

  if(docRef.id){
    return 'ok'
  }
  return 'failed' 
}

//No tengo idea
const updateNoteFireStore = async (note) => {
  const docRef = await setDoc(collection(db, 'notes').doc('test').set({
  text: note.text,
  create_at: new Date()
}));

if(docRef.id){
  return 'ok'
}
return 'failed' 
}

export{
    getNotesFireStore,
    saveNoteFireStore,
    updateNoteFireStore
}
