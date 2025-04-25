import React, { useMemo, useState, useEffect } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
const MoyenneByEtudiantChart = () => {
  const [notes, setNotes] = useState([]);
  const [students, setStudents] = useState([]);

  // Charger depuis l’API
  useEffect(() => {
    fetch(`${BACKEND_URL}/grades`)
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error("Erreur chargement notes :", err));

    fetch(`${BACKEND_URL}/students`)
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error("Erreur chargement étudiants :", err));
  }, []);

  const data = useMemo(() => {
    const map = {};

    notes.forEach(note => {
      const studentId = note.student._id;
      if (!map[studentId]) {
        map[studentId] = {
          total: 0,
          count: 0,
          name: `${note.student.firstName} ${note.student.lastName}`
        };
      }
      map[studentId].total += note.grade;
      map[studentId].count += 1;
    });

    return Object.entries(map).map(([id, stats]) => ({
      id,
      name: stats.name,
      moyenne: Number((stats.total / stats.count).toFixed(2))
    }));
  }, [notes]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis dataKey="id" name="ID étudiant" />
        <YAxis dataKey="moyenne" domain={[0, 20]} name="Moyenne" />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          formatter={(value, name) =>
            name === "moyenne" ? [`${value}/20`, "Moyenne"] : [value, "ID"]
          }
          labelFormatter={(label) => {
            const student = data.find(d => d.id === label);
            return student?.name || `ID ${label}`;
          }}
        />
        <Scatter name="Étudiants" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default MoyenneByEtudiantChart;
