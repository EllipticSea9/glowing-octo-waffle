export function bye(nombrecampo, campoid) {
    const docRef = doc(db, "datos-bebe", campoid, "vacunas", nombrecampo);
  
    deleteDoc(docRef)
      .then(() => {
        console.log("Documento eliminado correctamente.");
      })
      .catch((error) => {
        console.error("Error eliminando el documento: ", error);
      });
  }
  