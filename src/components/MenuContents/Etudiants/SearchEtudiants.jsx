import TextField from '@mui/material/TextField';
function SearchEtudiants({firstName,lastName,handleChange}) {
   return (
    <div className='form-search'>
        <TextField  id="standard-basic" onChange={(event)=>handleChange(event)} name="firstName" value={firstName} label="Prénom" variant="standard" />
        <TextField  id="standard-basic" onChange={(event)=>handleChange(event)} name='lastName' value={lastName} label="Nom" variant="standard" />
    </div>
   )
}
export default SearchEtudiants