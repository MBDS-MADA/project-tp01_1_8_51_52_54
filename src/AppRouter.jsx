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
import ContentNotes from './components/MenuContents/Notes/ContentNotes';
import NoteForm from './components/MenuContents/Notes/CreateNoteForm';
import Index from './components/index';
// import SignIn from './components/Authentification/sign-in/SignIn';
import SignInSide from './components/Authentification/sign-in-side/SignInSide';
import Blog from './components/blog/Blog';


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInSide />} />
        
        {/* <Route path="/blog" element={<Blog />} /> */}

        <Route path="/app" element={<App />}>

{/* 
        <Route path="blog" element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <Blog />
            </ProtectedRoute>
          } /> */}

        <Route path="index" element={
          <ProtectedRoute allowedRoles={["ADMIN", "SCOLARITE","STUDENT"]}>
            <Index />
          </ProtectedRoute>
        } />

       
         <Route path="update-etudiant/:id" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <ComponentUpdateEtudiant />
          </ProtectedRoute>
        } />

          <Route path="console" element={
            <ProtectedRoute allowedRoles={["ADMIN", "SCOLARITE","STUDENT"]}>
              <StatsPage />
            </ProtectedRoute>
          } />
          <Route path="notes" element={
            <ProtectedRoute allowedRoles={["ADMIN", "SCOLARITE","STUDENT"]}>
              <ContentNotes />
            </ProtectedRoute>
          } />

          <Route path="notes/add" element={
            <ProtectedRoute allowedRoles={["ADMIN","SCOLARITE"]}>
              <NoteForm />
            </ProtectedRoute>
          } />

          <Route path="etudiants" element={
            <ProtectedRoute allowedRoles={["ADMIN", "SCOLARITE"]}>
              <ContentEtudiants />
            </ProtectedRoute>
          } />

          <Route path="matieres" element={
            <ProtectedRoute allowedRoles={["ADMIN", "SCOLARITE"]}>
              <ContentMatieres />
            </ProtectedRoute>
          } />

          <Route path="apropos" element={
            <ProtectedRoute>
              <ContentPropos />
            </ProtectedRoute>
          } />

          <Route path="notfound" element={
            <ProtectedRoute allowedRoles={["ADMIN", "SCOLARITE"]}>
              <NotFound />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
