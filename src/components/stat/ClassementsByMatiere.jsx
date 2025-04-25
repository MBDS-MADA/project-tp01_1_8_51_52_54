import React, { useMemo, useState, useEffect } from 'react';
import {
  Paper, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, FormControl, InputLabel, Select, MenuItem, TablePagination
} from '@mui/material';

const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
const ClassementsByMatiere = () => {
  const [notes, setNotes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  // Charger les données depuis l'API
  useEffect(() => {
    fetch(`${BACKEND_URL}/grades`)
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error("Erreur chargement notes:", err));

    fetch(`${BACKEND_URL}/courses`)
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Erreur chargement cours:", err));
  }, []);

  const classement = useMemo(() => {
    if (!selectedCourse) return [];

    const notesForCourse = notes.filter(note => note.course._id === selectedCourse);

    const map = {};
    notesForCourse.forEach(note => {
      const sid = note.student._id;
      if (!map[sid]) map[sid] = {
        total: 0,
        count: 0,
        name: `${note.student.firstName} ${note.student.lastName}`
      };
      map[sid].total += note.grade;
      map[sid].count += 1;
    });

    return Object.entries(map).map(([id, stats]) => ({
      id,
      name: stats.name,
      moyenne: Number((stats.total / stats.count).toFixed(2))
    })).sort((a, b) => b.moyenne - a.moyenne);
  }, [notes, selectedCourse]);

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    setPage(0);
  };

  const paginatedClassement = classement.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>Classement par matière</Typography>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Choisir une matière</InputLabel>
        <Select value={selectedCourse} label="Choisir une matière" onChange={handleCourseChange}>
          {courses.map(c => (
            <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedCourse && classement.length > 0 ? (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Classement</TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell>Moyenne</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedClassement.map((student, index) => (
                  <TableRow key={student.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.moyenne}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={classement.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5]}
          />
        </>
      ) : selectedCourse ? (
        <Typography>Aucune note enregistrée pour cette matière.</Typography>
      ) : (
        <Typography>Veuillez sélectionner une matière pour voir le classement.</Typography>
      )}
    </Paper>
  );
};

export default ClassementsByMatiere;
