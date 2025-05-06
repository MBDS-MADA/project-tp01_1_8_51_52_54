import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
  IconButton,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExportCsv from "../ExportCsv";
import SearchMatiere from "./SearchMatieres";
import TableHeadSorting from "../TableHeadSorting";

const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
function ContentMatieres() {
  const userconnected = JSON.parse(localStorage.getItem("user"));
  const isAdmin = userconnected?.role === "ADMIN";

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [newCourse, setNewCourse] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editedName, setEditedName] = useState("");
  const [totalPages,setTotalPages]=useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Nom de la matière',
    },
   
  ];
  const filtres=(coursesList)=>{
    const data=(coursesList||[...courses]).filter((course) => course.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setTotalPages(data.length)
    return data;
  }
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
     const [page, setPage] = React.useState(0);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    

     React.useEffect(()=>{
        setFilteredCourses( filtres()
          .sort(getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
        
      },[order, orderBy, page, rowsPerPage,searchTerm])
      
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // Charger la liste des cours depuis l'API
  const init = ()=>{
    fetch(`${BACKEND_URL}/courses`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setTotalPages(data.length)
        setFilteredCourses(data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).sort(getComparator(order, orderBy)))
      })
      .catch(() => showSnackbar("Erreur lors du chargement", "error"));
  }
  useEffect(() => {
    init();
  }, []);

  // Ajouter un cours
  const addCourse = async () => {
    if (newCourse.trim() === "") return;

    const alreadyExists = courses.some(
      (c) => c.name.toLowerCase() === newCourse.toLowerCase()
    );
    if (alreadyExists) return;

    try {
      const response = await fetch(`${BACKEND_URL}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCourse.trim() }),
      });
      init();
      setSearchTerm("");

      setNewCourse("");
      showSnackbar("Matière ajoutée avec succès !");
    } catch (error) {
      showSnackbar("Erreur lors de l'ajout", "error");
    }
  };

  // Commencer la modification
  const startEditing = (id, name) => {
    setEditingId(id);
    setEditedName(name);
  };

  // Sauvegarder la modification
  const saveEdit = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/courses/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: editedName }),
        }
      );
      const data = await response.json();
      console.log(data,editingId);
      
      setCourses((prev) =>
        prev.map((c) => {
          return (c._id === editingId ? data.updated : c)})
      );
      const tab=[...courses.map((c) => {
        return (c._id === editingId ? data.updated : c)})]
    
      setFilteredCourses(filtres(tab).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).sort(getComparator(order, orderBy)))
      setEditingId(null);
      setEditedName("");
      showSnackbar("Matière modifiée !");
    } catch (error) {
      showSnackbar("Erreur lors de la modification", "error");
    }
  };

  // Supprimer un cours
  const deleteCourse = async (id) => {
    try {
      await fetch(`${BACKEND_URL}/courses/${id}`, {
        method: "DELETE",
      });
      const tab=[...courses].filter((course) => course._id !== id)
      setFilteredCourses(filtres(tab).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).sort(getComparator(order, orderBy)));
      
      setCourses((prev) => prev.filter((course) => course._id !== id));
      showSnackbar("Matière supprimée !");
    } catch (error) {
      console.error(error)
      showSnackbar("Erreur lors de la suppression", "error");
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Gestion des Matières</h2>

      {isAdmin && (
        <div
          style={{
            display: "flex",
            alignItems: "end",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <TextField
            label="Nouvelle matière"
            variant="outlined"
            size="small"
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
          />
          <Button variant="contained" onClick={addCourse}>
            Ajouter
          </Button>
          <ExportCsv data={courses} title="Cours" />
        </div>
      )}
      <SearchMatiere courseName={searchTerm} handleChangeName={handleSearch} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadSorting headCells={headCells} onRequestSort={handleRequestSort} order={order}
              orderBy={orderBy}/>
              {isAdmin && <TableCell align="right">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>
                  {editingId === course._id ? (
                    <TextField
                      size="small"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                    />
                  ) : (
                    course.name
                  )}
                </TableCell>
                {isAdmin && (
                  <TableCell align="right">
                    {editingId === course._id ? (
                      <Button size="small" onClick={saveEdit}>
                        Valider
                      </Button>
                    ) : (
                      <>
                        <IconButton
                          onClick={() => startEditing(course._id, course.name)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => deleteCourse(course._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
           <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={totalPages}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        slotProps={{
                          select: {
                            inputProps: {
                              'aria-label': 'rows per page',
                            },
                            native: true,
                          },
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                       
                      />
                    </TableRow>
                  </TableFooter>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ContentMatieres;
