import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateNoteForm from "./UpdateNoteForm";
import ExportCsvNote from "../ExportCsvNotes";
import { TableFooter, TablePagination } from "@mui/material";
import TableHeadSorting from "../TableHeadSorting";
import SearchNotes from "./SearchNotes";
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
function ContentNotes() {
  const userconnected = JSON.parse(localStorage.getItem("user"));
  const isAdmin = userconnected?.role === "SCOLARITE";
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    studentId: 0,
    courseId: 0,
    noteMin:0,
    noteMax:100
  });
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  function descendingComparator(a, b, orderBy) {
    if (orderBy == "course") {
      if (b[orderBy].name < a[orderBy].name) {
        return -1;
      }
      if (b[orderBy].name > a[orderBy].name) {
        return 1;
      }
    } else if (orderBy == "student") {
      if (
        `${b[orderBy].firstName} ${b[orderBy].lastName}` <
        `${a[orderBy].firstName} ${a[orderBy].lastName}`
      ) {
        return -1;
      }
      if (
        `${b[orderBy].firstName} ${b[orderBy].lastName}` >
        `${a[orderBy].firstName} ${a[orderBy].lastName}`
      ) {
        return 1;
      }
    }

    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  const headCells = [
    {
      id: "course",
      numeric: false,
      disablePadding: true,
      label: "Matière",
    },
    {
      id: "student",
      numeric: false,
      disablePadding: true,
      label: "Etudiant",
    },
    {
      id: "grade",
      numeric: true,
      disablePadding: true,
      label: "Note",
    },
    {
      id: "date",
      numeric: false,
      disablePadding: true,
      label: "Date",
    },
  ];
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  function fetchNote(){
    fetch(`${BACKEND_URL}/grades`,{
      method:"GET",
      Authorization: localStorage.getItem('jwtToken')
    })
    .then((res) => res.json())
    .then((data) => {
      setNotes(data);
      setTotalPages(data.length);
      setFilteredNotes(
        data
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .sort(getComparator(order, orderBy))
      );
    })
    .catch(() => console.error("Erreur lors du chargement", "error"));
  if(userconnected.role !== "STUDENT") {
    fetch(`${BACKEND_URL}/students`,{
      method:"GET",
      Authorization: localStorage.getItem('jwtToken')
    })
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      })
      .catch(() => console.error("Erreur lors du chargement", "error"));
  }

  
  fetch(`${BACKEND_URL}/courses`,{
    method:"GET",
    Authorization: localStorage.getItem('jwtToken')
  })
    .then((res) => res.json())
    .then((data) => {
      setCourses(data);
    
    })
    .catch(() => console.error("Erreur lors du chargement", "error"));
  }

  function handleUpdateSuccess() {
    fetchNote();
    setNoteToEdit(null);
  }

  useEffect(() => {
    fetchNote()
  }, []);
  const deleteNote = async (id) => {
    try {
      await fetch(`${BACKEND_URL}/grades/${id}`, {
        method: "DELETE",
        Authorization:localStorage.getItem("jwtToken")
      });
      const tab = [...notes].filter((note) => note._id !== id);
      setFilteredNotes(
        filtres(tab)
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .sort(getComparator(order, orderBy))
      );

      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setFilteredNotes(
      filtres()
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [order, orderBy, page, rowsPerPage,searchTerm]);
  const filtres = (notesList) => {
    let data = notesList || [...notes];
    if (searchTerm.courseId !==0) {
      data=data.filter(note=>note.course._id==searchTerm.courseId)
    }
    if (searchTerm.studentId !== 0) {
      data=data.filter(note=>note.student._id==searchTerm.studentId)
    }
    data=data.filter(note=>note.grade>=searchTerm.noteMin && note.grade<=searchTerm.noteMax )
    setTotalPages(data.length);
    return data;
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchTerm({ ...searchTerm, [name]: value });
  };
  
  return (
    <div>
      <p>Voici le contenu de la rubrique des Notes</p>
      {notes.length>0 &&
        <ExportCsvNote title="Notes" data={notes} />
      }
      {noteToEdit && (
        <UpdateNoteForm
          noteToEdit={noteToEdit}
          onUpdateSuccess={handleUpdateSuccess} 
        />
      )}
      <SearchNotes {...searchTerm} handleChange={handleChange} courses={courses} students={students} />
      <TableContainer component={Paper} className="mt-4">
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableHeadSorting
                headCells={userconnected.role === "STUDENT"?headCells.filter(header=>header.id!=="student"):headCells}
                onRequestSort={handleRequestSort}
                order={order}
                orderBy={orderBy}
              />
              {isAdmin && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNotes.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.course?.name}</TableCell>
                {userconnected.role !== "STUDENT"
                &&
                (
                <TableCell>
                  {row.student?.firstName} {row.student?.lastName}
                </TableCell>

                )}
                <TableCell>{row.grade}</TableCell>
                <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                {isAdmin && (
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        setNoteToEdit({
                          ...row,
                          student_id: row.student?._id,
                        })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteNote(row._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={totalPages}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
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
    </div>
  );
}

export default ContentNotes;
