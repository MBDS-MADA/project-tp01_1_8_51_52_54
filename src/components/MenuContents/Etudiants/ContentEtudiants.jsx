import React , { useState,useEffect } from 'react';
import TableFooter from '@mui/material/TableFooter';
import TableHeadSorting from '../TableHeadSorting';
import SearchEtudiants from './SearchEtudiants';
import ExportCsv from '../ExportCsv';
import BulletinNote from './BulletinNote';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button } from '@mui/material';
import { Link } from 'react-router-dom';



const menuItems = ['Lister Etudiant','Crée Étudiant'];
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
function Menu({ activeItem, onSelect }) {
  return (
   
      <ul style={{listStyle: 'none',padding: 0, display: 'flex', gap: '10px'}}>
        {menuItems.map((item) => (
          <li key={item}>
            <button
              onClick={() => onSelect(item)}
              style={{
                margin: '5px 0',
                padding: '8px 12px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: item === activeItem ? '#238dd1' : '#1976d2',
                color: 'white',
                fontWeight: item === activeItem ? 'bold' : 'normal',
                cursor: 'pointer'
              }}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
  );
}

function Content({ activeItem }) {
  switch (activeItem) {
    case 'Lister Etudiant':
      return <ContentEtudiantsDefault />;
    case 'Crée Étudiant':
      return <ComponentAddEtudiant />;
    default:
      return <ContentEtudiantsDefault />;
  }
}



function ContentEtudiants() {

  const userconnected = JSON.parse(localStorage.getItem("user"));
  const isAdmin = userconnected?.role === "ADMIN";
  const [activeItem, setActiveItem] = useState('Notes');
  
  return (
  <div className="text-center mt-10">
   
   {isAdmin && (<Menu activeItem={activeItem} onSelect={setActiveItem} />)}
    <Content activeItem={activeItem} />
    
  </div>
  );

}


function ComponentAddEtudiant() { 
  
  const [form, setForm] = useState({
    firstName: '',
    lastName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const etudiant = { ...form };
    console.log(etudiant);
    AddEtudiant(etudiant);
    alert("Étudiant ajouté avec succès !");
  };

  return (
    <div style={{ 
      maxWidth: '600px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#f4f6f8',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', color: '#000205' }}>Ajouter un Étudiant</h2>

        {["firstName", "lastName"].map((field) => (
          <div key={field} style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
              {field}
            </label>
            <input type="text" name={field} value={form[field]} onChange={handleChange} required style={{   width: '100%',   padding: '10px',   borderRadius: '6px',   border: '1px solid #ccc',   backgroundColor: '#e7effc',   color: '#000' }}
            />
          </div>
        ))}

        <button
          type="submit"
          style={{backgroundColor: '#1c4387',color: 'white',padding: '10px 20px',border: 'none',borderRadius: '8px',cursor: 'pointer',display: 'block',width: '100%',fontSize: '16px',fontWeight: 'bold',marginTop: '20px'
          }}>
          Ajouter l'étudiant
        </button>
      </form>
    </div>
  );
}
function AddEtudiant(etudiant) {
  const userconnected = JSON.parse(localStorage.getItem("user"));
  fetch(`${BACKEND_URL}/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization:`Bearer ${userconnected.token}` 
    },
    body: JSON.stringify(etudiant),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de l\'étudiant');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Étudiant ajouté avec succès :', data);
      // Optionnel : mettre à jour l'état ou rafraîchir la liste des étudiants
    })
    .catch((error) => {
      console.error('Erreur :', error);
    });
}


////////////////////////////////////////////////////////////////////////
function ContentEtudiantsDefault() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('firstname');
  const [page, setPage] = React.useState(0);
  const [totalPages,setTotalPages]=useState(0)
  const [searchTerm,setSearchTerm]=useState({
    firstName:"",
    lastName:""
  })
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fetch(`${BACKEND_URL}/students`,
      {method : 'GET', headers:{
        authorization:`Bearer ${user.token}` 
      } 
    }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur de la réponse HTTP');
        }
        return response.json();
      })
      .then((data) => {
        setTotalPages(data.length)
        setStudents(data);
        setFilteredStudents(data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) .sort(getComparator(order, orderBy)));
      })
      .catch((error) => {
        console.error('Erreur de communication :', error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  function deleteEtudiant(id) {
    console.log(id);
    
    fetch(`${BACKEND_URL}/students/${id}`,{
      method:"DELETE",
      headers:{
        authorization:`Bearer ${user.token}` 
      },
      body:JSON.stringify({id:id})
    })
    .then(res=>res.json()).then(data=> { 
      const final_stud=[...students].filter(student=> student._id !==id)
 
      setStudents(final_stud)
      setFilteredStudents(filtres(final_stud)
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
    })
    .catch(error => console.error(error))
    
  }
    const headCells = [
      {
        id: 'firstName',
        numeric: false,
        disablePadding: true,
        label: 'Prénom',
      },
    {
      id: 'lastName',
      numeric: false,
      disablePadding: true,
      label: 'Nom',
    },
  ]
  const filtres = (studentsList) => {
    const filtre=(studentsList || [...students]).filter((student) => {
      return (
        student.firstName.toLowerCase().includes(searchTerm.firstName.toLowerCase()) &&
        student.lastName.toLowerCase().includes(searchTerm.lastName.toLowerCase())
      );
    });
    setTotalPages(filtre.length)
      return filtre  
  
  };
 
 useEffect(()=>{  
  console.log("Miditra");
     
    setFilteredStudents( filtres()
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
  },[order, orderBy, page, rowsPerPage,searchTerm])

  
  const handleFilter=(event)=>{
    const {name,value}=event.target;
    setSearchTerm({...searchTerm,[name]:value})
  }
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Liste des étudiants</h2>
      <SearchEtudiants {...searchTerm} handleChange={handleFilter} />
      <ExportCsv title="Etudiants" data={students} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableHeadSorting
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}

            />
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>Aucun étudiant trouvé.</TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell align="right">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Link to={`/app/update-etudiant/${student._id}`} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="success">
                          Update
                        </Button>
                      </Link>

                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteEtudiant(student._id)}
                      >
                        Delete
                      </Button>

                      <BulletinNote etudiant={student} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalPages}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

export default ContentEtudiants;
