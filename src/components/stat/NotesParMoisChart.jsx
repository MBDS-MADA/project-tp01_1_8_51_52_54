import React, { useMemo, useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';
import {
  Paper, Typography, FormControl, InputLabel, Select, MenuItem, Grid
} from '@mui/material';

const getMonth = (dateStr) => dateStr.slice(0, 7);
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
const NotesParMoisChart = () => {
  const user=JSON.parse(localStorage.getItem("user"))
  const [notes, setNotes] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("Tous");
  const [selectedCourse, setSelectedCourse] = useState("Tous");

  // 📡 Charger les données depuis les APIs
  useEffect(() => {
    fetch(`${BACKEND_URL}/grades`)
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error("Erreur chargement notes:", err));

    fetch(`${BACKEND_URL}/students`)
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error("Erreur chargement étudiants:", err));

    fetch(`${BACKEND_URL}/courses`)
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Erreur chargement cours:", err));
  }, []);

  const filteredData = useMemo(() => {
    return notes
      .filter(note =>
        (selectedStudent === "Tous" || note.student._id === selectedStudent) &&
        (selectedCourse === "Tous" || note.course._id === selectedCourse)
      )
      .map(note => ({
        ...note,
        month: getMonth(note.date)
      }));
  }, [notes, selectedStudent, selectedCourse]);

  const dataParMois = useMemo(() => {
    const map = {};

    filteredData.forEach(note => {
      if (!map[note.month]) map[note.month] = { total: 0, count: 0 };
      map[note.month].total += note.grade;
      map[note.month].count += 1;
    });

    return Object.entries(map).map(([month, stats]) => ({
      month,
      moyenne: (stats.total / stats.count).toFixed(2)
    })).sort((a, b) => a.month.localeCompare(b.month));
  }, [filteredData]);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>Moyenne par mois</Typography>

      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Cours</InputLabel>
            <Select
              value={selectedCourse}
              label="Cours"
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <MenuItem value="Tous">Tous</MenuItem>
              {courses.map(c => (
                <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {user.role !=="STUDENT" &&
        (

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Étudiant</InputLabel>
            <Select
              value={selectedStudent}
              label="Étudiant"
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <MenuItem value="Tous">Tous</MenuItem>
              {students.map(s => (
                <MenuItem key={s._id} value={s._id}>
                  {s.firstName} {s.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        )}
      </Grid>

      {dataParMois.length === 0 ? (
        <Typography>Aucune note trouvée pour cette sélection.</Typography>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dataParMois}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 20]} />
            <Tooltip />
            <Line type="monotone" dataKey="moyenne" stroke="#1976d2" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default NotesParMoisChart;
