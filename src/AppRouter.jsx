import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import ContentEtudiants from './components/MenuContents/Etudiants/ContentEtudiants';
import ContentMatieres from './components/MenuContents/Matieres/ContentMatieres';
import ContentPropos from './components/MenuContents/ContentPropos';
import Login from './components/Authentification/Login';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './components/NotFound';
import StatsPage from './components/stat/StatsPage';
import ComponentUpdateEtudiant from './components/MenuContents/Etudiants/ComponentUpdateEtudiant';
import ContentNotes from './components/MenuContents/notes/ContentNotes';
import NoteForm from './components/MenuContents/notes/CreateNoteForm';
import Index from './components/index';


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/app" element={<App />}>

        <Route path="index" element={
          <ProtectedRoute allowedRoles={["ADMIN", "SCOLARITE","STUDENT"]}>
            <Index />
          </ProtectedRoute>
        } />

       
         <Route path="update-etudiant/:id" element={
          <ProtectedRoute allowedRoles={["SCOLARITE"]}>
            <ComponentUpdateEtudiant />
          </ProtectedRoute>
        } />

          <Route path="console" element={
            <ProtectedRoute allowedRoles={["SCOLARITE"]}>
              <StatsPage />
            </ProtectedRoute>
          } />
          <Route path="notes" element={
            <ProtectedRoute allowedRoles={["SCOLARITE","STUDENT"]}>
              <ContentNotes />
            </ProtectedRoute>
          } />

          <Route path="notes/add" element={
            <ProtectedRoute allowedRoles={["SCOLARITE"]}>
              <NoteForm />
            </ProtectedRoute>
          } />

          <Route path="etudiants" element={
            <ProtectedRoute allowedRoles={["SCOLARITE"]}>
              <ContentEtudiants />
            </ProtectedRoute>
          } />

          <Route path="matieres" element={
            <ProtectedRoute allowedRoles={["SCOLARITE"]}>
              <ContentMatieres />
            </ProtectedRoute>
          } />

          <Route path="apropos" element={
            <ProtectedRoute>
              <ContentPropos />
            </ProtectedRoute>
          } />

          <Route path="notfound" element={
            <ProtectedRoute >
              <NotFound />
            </ProtectedRoute>
          } />
          
          


        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
