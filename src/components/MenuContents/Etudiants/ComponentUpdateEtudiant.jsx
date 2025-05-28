import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function useFetchEtudiant(id) {
  const [form, setForm] = useState({ firstName: '', lastName: '' });
  const userconnected = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function fetchEtudiant() {
      try {
        const res = await fetch(`${BACKEND_URL}/students/${id}`, {
          headers: {
            authorization: `Bearer ${userconnected.token}`
          }
        });
        if (!res.ok) throw new Error("Erreur lors du chargement de l'étudiant");
        const data = await res.json();
        setForm({
          firstName: data.firstName || '',
          lastName: data.lastName || ''
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchEtudiant();
  }, [id]);

  return [form, setForm];
}


function EtudiantForm({ form, handleChange, handleSubmit }) {
  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#f4f6f8',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', color: '#000205' }}>Modifier un Étudiant</h2>

        {["firstName", "lastName"].map((field) => (
          <div key={field} style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
              {field}
            </label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                backgroundColor: '#e7effc',
                color: '#000'
              }}
            />
          </div>
        ))}

        <button
          type="submit"
          style={{
            backgroundColor: '#1c4387',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'block',
            width: '100%',
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '20px'
          }}
        >
          Mettre à jour l'étudiant
        </button>
      </form>
    </div>
  );
}


function ComponentUpdateEtudiant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useFetchEtudiant(id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await fetch(`${BACKEND_URL}/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour");

      alert("Étudiant mis à jour !");
      navigate("/app/etudiants");
    } catch (error) {
      console.error(error);
      alert("Échec de la mise à jour");
    }
  };

  return (
    <div className="text-center mt-10">
      <h2>Modifier l'étudiant : {form.firstName} {form.lastName}</h2>
      <EtudiantForm form={form} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
}

export default ComponentUpdateEtudiant;
