import TextField from "@mui/material/TextField";
function SearchMatiere({ courseName, handleChangeName }) {
  return (
    <div className="form-search">
      <TextField
        id="standard-basic"
        label="Nom de la matière"
        value={courseName}
        onChange={(event)=>handleChangeName(event.target.value)}
        variant="standard"
      />
    </div>
  );
}
export default SearchMatiere;
