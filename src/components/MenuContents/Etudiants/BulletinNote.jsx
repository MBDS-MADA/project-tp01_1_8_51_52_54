import { Margin, usePDF } from "react-to-pdf";
import notes from "../../../data/notes.json";
import courses from "../../../data/courses.json";
import etudiants from "../../../data/students.json";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
function BulletinNote({ etudiant }) {
  const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
 const [notes,setNotes]=useState([])
 const [selectedYear,setSelectedYear]=useState((new Date()).getFullYear())
  const sumGrades = notes.reduce((acc, current) => acc + current.grade, 0);
  const currentYear = new Date().getFullYear();
  // Calculate the average by dividing the sum by the number of grades
  const avgGrade = sumGrades / notes.length;

  // console.log(avgGrade); // Output: 81.5
  // console.log(sumGrades,notes.length);

  const { toPDF, targetRef } = usePDF({
    filename: `bulletin-${etudiant.firstName} ${etudiant.lastName}.pdf`,
    page: { margin: Margin.MEDIUM, orientation: "landscape" },
  });
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };  
  const [open, setOpen] = useState(false);
  const getNotes=(year)=>{
    fetch(`${BACKEND_URL}/grades/bulletin/${etudiant._id}?year=${year||selectedYear}`,{
      method:"GET"})
    .then(res=>res.json()).then(data=> { 
        setNotes(data)
    })
    .catch(error => console.error(error))
  }
  const handleOpen = () => {
    getNotes()
    setOpen(true)
  };
 
  const handleClose = () => setOpen(false);
  const handleChange=(event)=>{
    setSelectedYear(event.target.value)
    getNotes(event.target.value)
  }
  return (
    <>
      <Button variant="contained"  onClick={handleOpen}>Bulletin de Note</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <FormControl style={{marginBottom:10}}>
        <InputLabel id="demo-simple-select-label">Cours</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedYear}
          label="Année"
          defaultValue={selectedYear}
          onChange={handleChange}
        >
             <MenuItem value={0} defaultChecked>Selectionnez un cours</MenuItem>

            {[currentYear, currentYear - 1, currentYear - 2,currentYear-3,currentYear-4,currentYear-5].map(year=>
             <MenuItem value={year}>{year}</MenuItem>
            )}
          
        </Select>
      </FormControl>
          <div>
            {notes.length >0 && 
            <button onClick={toPDF}>Télécharger</button>
            } 
            <div
              ref={targetRef}
              
            >
              <div style={{margin:"0 auto"}}>
                <h1>Bulletin de note</h1>
                <h2>
                  {etudiant.firstName} {etudiant.lastName}
                </h2>
                {notes.length >0
                ?
              
                <table
                  className="bulletin-note"
                  style={{ borderCollapse:"collapse",border:"solid black 1px"}}
                >
                  <thead>
                    <tr>
                      <th>Cours</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notes.map((note) => (
                      <tr>
                        <td>
                          {
                           note.course.name
                          }
                        </td>
                        <td>{note.grade}</td>
                      </tr>
                    ))}
                    <tr>
                      <td>Moyenne</td>
                      <td>{avgGrade}</td>
                    </tr>
                  </tbody>
                </table>
            :(
              <div>Cet étudiant n'a pas de note cette année</div>
            )}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
export default BulletinNote;
