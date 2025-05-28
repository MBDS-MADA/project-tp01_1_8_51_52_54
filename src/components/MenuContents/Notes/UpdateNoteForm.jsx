import React, { useEffect, useState } from 'react';
import './CreateNoteForm.css';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function UpdateNoteForm({ noteToEdit, onUpdateSuccess }) {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState('');
  const [grade, setGrade] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const userconnected = JSON.parse(localStorage.getItem("user"));

  async function fetchStudentList() {
    try {
      const response = await fetch(`${BACKEND_URL}/students`, {
        headers: {
          authorization: `Bearer ${userconnected.token}`
        }
      });
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Erreur de communication :', error);
    }
  }

  useEffect(() => {
    fetchStudentList();

    // Si on a une note à éditer, on initialise les états
    if (noteToEdit) {
      setStudent(noteToEdit.student_id);
      setGrade(noteToEdit.grade);

      // Convertir la date
      if (noteToEdit.date) {
        const dateOnly = new Date(noteToEdit.date).toISOString().slice(0, 10);
        setDate(dateOnly);
      }
    }
  }, [noteToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);

    // Validation
    const newErrors = {};
    if (!student) newErrors.student_id = "L'étudiant est requis";
    if (grade === '' || grade === undefined) newErrors.grade = "La note est requise";
    else if (grade < 0 || grade > 100) newErrors.grade = "La note doit être entre 0 et 100";
    if (!date) newErrors.date = "La date est requise";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const body = {
      student,
      course: noteToEdit.course.id,
      grade: parseFloat(grade),
      date,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/grades/${noteToEdit._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userconnected.token}`
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ api: errorData.message || "Erreur lors de la mise à jour" });
        return;
      }

      const result = await response.json();
      setSuccess("Note mise à jour avec succès !");
      setErrors({});
      if (onUpdateSuccess) onUpdateSuccess(result);
    } catch (err) {
      setErrors({ api: err.message || "Erreur lors de la mise à jour" });
    }
  };

  return (
    <div className="noteform-container">
      <form onSubmit={handleSubmit} className="noteform-form">
        <h2 className="noteform-title">Modifier la note</h2>

        {success && <p className="noteform-success">{success}</p>}
        {errors.api && <p className="noteform-error">{errors.api}</p>}

        {/* Étudiant */}
        <div className="noteform-field">
          <label>Étudiant :</label>
          <select
            className="noteform-input"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
          >
            <option value="">-- Choisir --</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.firstName} {s.lastName}
              </option>
            ))}
          </select>
          {errors.student_id && <p className="noteform-error">{errors.student_id}</p>}
        </div>

        {/* Note */}
        <div className="noteform-field">
          <label>Note :</label>
          <input
            type="number"
            className="noteform-input"
            min="0"
            max="100"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
          {errors.grade && <p className="noteform-error">{errors.grade}</p>}
        </div>

        {/* Date */}
        <div className="noteform-field">
          <label>Date :</label>
          <input
            type="date"
            className="noteform-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && <p className="noteform-error">{errors.date}</p>}
        </div>

        <button type="submit" className="noteform-button">Mettre à jour</button>
      </form>
    </div>
  );
}

export default UpdateNoteForm;
