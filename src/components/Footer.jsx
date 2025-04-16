function Footer() {
  const etudiants = [
    { id: 1, nom: "ANDRIAMAMONJY Fitia Arivony" },
    { id: 8, nom: "ANDRIANTAHIANA Vatosoa Finaritra" },
    { id: 51, nom: "RAVELOMANANTSOA Iaina Erico" },
    { id: 52, nom: "RAVOAHANGILALAO Kaloina Mélodie" },
    { id: 54, nom: "RAZAFIMAHATRATRA Steeve Peraly" },
  ];

  return (
    <footer style={{ 
      padding: '20px', 
      textAlign: 'center', 
      backgroundColor: '#f2f2f2', 
      marginTop: '40px',
      fontSize: '14px',
      color: '#333'
    }}>
      <p>© {new Date().getFullYear()} - Tous droits réservés</p>
      <p>
        {etudiants.map((etudiant, index) => (
          <span key={etudiant.id}>
            <strong>{etudiant.id}</strong> {etudiant.nom}
            {index < etudiants.length - 1 ? ', ' : ''}
          </span>
        ))}
      </p>
    </footer>
  );
}

export default Footer