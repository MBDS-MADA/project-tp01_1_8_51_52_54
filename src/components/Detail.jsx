function Details({ item }) {
  return (
    <div className="details-container">
    <h2>Détail sur l'item</h2>
    <p className="detail-item">id: <span>{item.unique_id}</span></p>
    <p className="detail-item">Cours: <span>{item.course}</span></p>
    
    <div className="student-info">
      <h3>Informations sur l'étudiant</h3>
      <p>Prénom: <span>{item.student.firstname}</span></p>
      <p>Nom: <span>{item.student.lastname}</span></p>
      <p>Id étudiant: <span>{item.student.id}</span></p>
    </div>
  
    <p className="detail-item">Date: <span>{item.date}</span></p>
    <p className="detail-item">Grade: <span>{item.grade}</span></p>
  </div>
  
  );
}
export default Details;
