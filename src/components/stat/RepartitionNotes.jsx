import React, { useMemo, useState, useEffect } from 'react';
import {
  Paper, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
const RepartitionNotes = () => {
  const [notes, setNotes] = useState([]);
  const user=JSON.parse(localStorage.getItem("user"))
  // 🔄 Charger les notes depuis l’API
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
  }, []);

  const tranches = useMemo(() => {
    const bins = [];

    for (let i = 0; i <= 90; i += 10) {
      bins.push({
        range: `${i}-${i + 9}`,
        min: i,
        max: i + 9,
        count: 0
      });
    }

    bins[bins.length - 1].max = 100;
    bins[bins.length - 1].range = "90-100";

    notes.forEach(note => {
      const n = note.grade;
      const bin = bins.find(b => n >= b.min && n <= b.max);
      if (bin) bin.count += 1;
    });

    return bins;
  }, [notes]);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Répartition des notes par tranches (0 - 100)
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={tranches}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default RepartitionNotes;
