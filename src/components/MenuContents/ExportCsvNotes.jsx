import { CSVLink } from "react-csv";
function ExportCsvNote({ title, data }) {
    const final_data=()=>{
         return data.map(note => {
            return {
              course: note.course.name,
              firstname: note.student.firstName,
              lastname: note.student.lastName,
              date: new Date(note.date).toLocaleDateString(),
              grade: note.grade
            };
          
        });
    }
   
    
    
  return (
    <>
      {data.length >= 0 && (
        <CSVLink
        style={{marginBottom:12}}
        filename={title}
            title={title}
          data={[Object.keys(final_data()[0])].concat(
            final_data().map((person) => Object.values(person))
          )}
        >
         Télécharger en csv
        </CSVLink>
      )}
      <br />
      
    </>
  );
}
export default ExportCsvNote;
