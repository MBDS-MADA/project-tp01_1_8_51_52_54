import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

function SearchNotes({ courseId,studentId,noteMin,noteMax,handleChange,courses,students }) {
    const user=JSON.parse(localStorage.getItem('user'))
    const handleKeyDown = (event) => {
        // Bloque l'entrée de caractères non numériques (autre que Backspace, etc.)
        if (/[^0-9\.]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
          event.preventDefault();
        }
    };
    
  return (
    <div className="form-search">
      <FormControl>
        <InputLabel id="demo-simple-select-label">Cours</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={courseId}
          label="Cours"
          name="courseId"
          defaultValue={0}
          onChange={handleChange}
        >
             <MenuItem value={0} defaultChecked>Selectionnez un cours</MenuItem>

            {courses.map(course=>
             <MenuItem value={course._id}>{course.name}</MenuItem>
            )}
          
        </Select>
      </FormControl>
      {user.role != "STUDENT" &&
      (
        <FormControl>
        <InputLabel id="demo-simple-select-label">Etudiants</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={studentId}
          label="Etudiants"
          name="studentId"
          defaultValue={0}
          onChange={handleChange}
        >
             <MenuItem value={0} defaultChecked>Selectionnez un étudiant</MenuItem>
            {students.map(student=>
             <MenuItem value={student._id}>{student.firstName} {student.lastName}</MenuItem>
            )}
          
        </Select>
      </FormControl>
      )}
     
      <TextField
          
          label="Note minimum"
          type="text"
          name="noteMin"
          onChange={handleChange}
          value={noteMin}
         
          onKeyDown={handleKeyDown}
          
        />
         <TextField
          
          label="Note maximum"
          type="text"
          name="noteMax"
          value={noteMax}
          onChange={handleChange}
          onKeyDown={handleKeyDown}

        />
    </div>
  );
}
export default SearchNotes;