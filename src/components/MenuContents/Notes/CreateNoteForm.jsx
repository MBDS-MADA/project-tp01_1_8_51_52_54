import React, { useRef, useState, useEffect } from 'react';
import './CreateNoteForm.css';

const NoteForm = () => {
  const studentRef = useRef();
  const courseRef = useRef();
  const gradeRef = useRef();
  const dateRef = useRef();

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8010/api/students")
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error("Erreur chargement étudiants :", err));

    fetch("http://localhost:8010/api/courses")
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Erreur chargement cours :", err));
  }, []);

  const validate = (data) => {
    const newErrors = {};
    if (!data.student) newErrors.student = "L'étudiant est requis";
    if (!data.course) newErrors.course = "Le cours est requis";
    if (data.grade === '' || !data.grade ) newErrors.grade = "La note est requise";
    else if (data.grade < 0 || data.grade > 100) newErrors.grade = "La note doit être entre 0 et 100";
    if (!data.date) newErrors.date = "La date est requise";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);

    const data = {
      student: studentRef.current.value,
      course: courseRef.current.value,
      grade: parseFloat(gradeRef.current.value),
      date: dateRef.current.value
    };

    if (!validate(data)) return;

    try {
      const res = await fetch("http://localhost:8010/api/grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi");

      const result = await res.json();
      setSuccess( "Note ajoutée avec succès ");
      setErrors({});

      studentRef.current.value = '';
      courseRef.current.value = '';
      gradeRef.current.value = '';
      dateRef.current.value = '';
    } catch (error) {
      console.error("Erreur:", error);
      setSuccess(null);
    }
  };

  return (
    <div className="noteform-container">
    <form onSubmit={handleSubmit} className="noteform-form">
      <h2 className="noteform-title">Ajouter une note</h2>
      {success && <p className="noteform-success">{success}</p>}
  
      <div className="noteform-field">
        <label>Étudiant :</label>
        <select
          ref={studentRef}
          defaultValue=""
          style={{width: '100%',padding: '10px',border: '1px solid #ccc',borderRadius: '6px',backgroundColor: '#f0f4f8',color: '#000',fontSize: '1rem'}}
        >
          <option value="">-- Choisir --</option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.firstName} {s.lastName}
            </option>
          ))}
        </select>
        {errors.student && <p className="noteform-error">{errors.student}</p>}
      </div>
  
      <div className="noteform-field">
        <label>Cours :</label>
        <select
          ref={courseRef}
          defaultValue=""
          style={{width: '100%',padding: '10px',border: '1px solid #ccc',borderRadius: '6px',backgroundColor: '#f0f4f8',color: '#000',fontSize: '1rem' }}
        >
          <option value="">-- Choisir --</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        {errors.course && <p className="noteform-error">{errors.course}</p>}
      </div>
  
      <div className="noteform-field">
        <label>Note :</label>
        <input type="number" ref={gradeRef} min="0" max="100"
          style={{width: '100%',padding: '10px',border: '1px solid #ccc',borderRadius: '6px',backgroundColor: '#f0f4f8',color: '#000',fontSize: '1rem'}}
        />
        {errors.grade && <p className="noteform-error">{errors.grade}</p>}
      </div>
  
      <div className="noteform-field">
        <label>Date :</label>
        <input
          type="date"
          ref={dateRef}
          style={{width: '100%',padding: '10px',border: '1px solid #ccc',borderRadius: '6px',backgroundColor: '#f0f4f8',color: '#000',fontSize: '1rem'}}
        />
        {errors.date && <p className="noteform-error">{errors.date}</p>}
      </div>
  
      <button
        type="submit"
        className="noteform-button"
        style={{backgroundColor: '#1c4387',color: 'white',padding: '10px 15px',border: 'none',borderRadius: '8px',cursor: 'pointer'}}
      >
        Ajouter
      </button>
    </form>
  </div>
  );
};

export default NoteForm;
