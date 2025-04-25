import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
const MoyenneByCourseChart = () => {
  const [notes, setNotes] = useState([]);
  const [courses, setCourses] = useState([]);

  // Charger les données depuis les APIs
  useEffect(() => {
    fetch(`${BACKEND_URL}/grades`)
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error("Erreur chargement notes :", err));

    fetch(`${BACKEND_URL}/courses`)
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Erreur chargement cours :", err));
  }, []);

  const data = useMemo(() => {
    const courseMap = {};

    notes.forEach(note => {
      const courseId = note.course._id;
      if (!courseMap[courseId]) {
        courseMap[courseId] = { total: 0, count: 0, name: note.course.name };
      }
      courseMap[courseId].total += note.grade;
      courseMap[courseId].count += 1;
    });

    return Object.values(courseMap).map(course => ({
      name: course.name,
      moyenne: Number((course.total / course.count).toFixed(2))
    }));
  }, [notes]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 20]} />
        <Tooltip />
        <Bar dataKey="moyenne" fill="#1976d2" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MoyenneByCourseChart;
