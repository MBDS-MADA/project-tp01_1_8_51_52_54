import { CSVLink } from "react-csv";
function ExportCsvNote({ title, data }) {
    const final_data=()=>{

         return data.map(note => {
          
            return {
              unique_id: note.unique_id,
              course: note.course,
              firstname: note.student.firstname,
              lastname: note.student.lastname,
              id: note.student.id,
              date: note.date,
              grade: note.grade
            };
          
        });
    }
   
    
    
  return (
    <>
      {data.length >= 0 && (
        <CSVLink
        filename={title}
            title={title}
          data={[Object.keys(final_data()[0])].concat(
            final_data().map((person) => Object.values(person))
          )}
        >
         Télécharger en csv
        </CSVLink>
      )}
    </>
  );
}
export default ExportCsvNote;
