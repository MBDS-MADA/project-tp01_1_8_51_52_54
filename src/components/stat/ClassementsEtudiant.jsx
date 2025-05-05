import React, { useMemo, useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TablePagination,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
const ClassementEtudiants = () => {
  const [notes, setNotes] = useState([]);
  const [students, setStudents] = useState([]);
  const [topN, setTopN] = useState(5);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const user=JSON.parse(localStorage.getItem("user"))
  // Charger les données via API
  useEffect(() => {
    fetch(`${BACKEND_URL}/grades`,{
      method:"GET",
      headers:{
        authorization:`Bearer ${user.token}`
      }
    })
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error("Erreur chargement notes:", err));

    fetch(`${BACKEND_URL}/students`,{
      method:"GET",
      headers:{
        authorization:`Bearer ${user.token}`
      }
    })
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error("Erreur chargement étudiants:", err));
  }, []);

  // Calcul des moyennes
  const averageData = useMemo(() => {
    const map = {};

    notes.forEach(note => {
      const sid = note.student._id;
      if (!map[sid]) {
        map[sid] = {
          total: 0,
          count: 0,
          name: `${note.student.firstName} ${note.student.lastName}`
        };
      }
      map[sid].total += note.grade;
      map[sid].count += 1;
    });

    const averages = Object.entries(map).map(([id, stats]) => ({
      id,
      name: stats.name,
      moyenne: Number((stats.total / stats.count).toFixed(2))
    }));

    return averages.sort((a, b) => b.moyenne - a.moyenne);
  }, [notes]);

  const filteredData = averageData.slice(0, topN);
  const paginatedData = filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const handleTopChange = (event) => {
    setTopN(event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <FormControl sx={{ marginBottom: 2, minWidth: 120 }}>
        <InputLabel>Top N</InputLabel>
        <Select value={topN} label="Top N" onChange={handleTopChange}>
          {[3, 5, 10, 20, averageData.length].map(n => (
            <MenuItem key={n} value={n}>
              {n === averageData.length ? 'Tous' : `Top ${n}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
            {paginatedData.map((student, index) => (
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
        count={filteredData.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5]}
      />
    </Paper>
  );
};

export default ClassementEtudiants;
