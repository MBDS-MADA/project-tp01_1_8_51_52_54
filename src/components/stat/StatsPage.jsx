import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import MoyenneByCourseChart from './MoyenneByCoursChart';
import MoyenneByEtudiantChart from './MoyenneByEtudiantChart';
import ClassementEtudiants from './ClassementsEtudiant';
import RepartitionNotes from './RepartitionNotes';
import NotesParMoisChart from './NotesParMoisChart';
import ClassementsByMatiere from './ClassementsByMatiere';

const StatsPage = () => {
    return (
        <div >
            <Typography variant="h4" gutterBottom>
                Statistiques Générales
            </Typography>
            <Typography variant="h5" gutterBottom style={{ marginTop: '3em' }}>
                1) Résumé
            </Typography>
            <Grid container spacing={6} style={{ marginTop: '2em' }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Nombre d'étudiants</Typography>
                            <Typography variant="h4" color="primary">25</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Nombre de cours</Typography>
                            <Typography variant="h4" color="secondary">6</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Moyenne générale</Typography>
                            <Typography variant="h4" color="textPrimary">13.4</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom style={{ marginTop: '6em' }}>
                2) Cours
            </Typography>
            <Card style={{ marginTop: '2em' }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Moyenne par cours</Typography>
                    <MoyenneByCourseChart />
                </CardContent>
            </Card>
            <Typography variant="h5" gutterBottom style={{ marginTop: '6em' }}>
                2) Étudiants
            </Typography>
            <Card style={{ marginTop: '2em' }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Moyenne par étudiant (nuage de points)</Typography>
                    <MoyenneByEtudiantChart />
                </CardContent>
            </Card>
            <Card style={{ marginTop: '2em' }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Classement des étudiants</Typography>
                    <ClassementEtudiants />
                </CardContent>
            </Card>
            <Card>
                <CardContent style={{ marginTop: '2em' }}>
                    <ClassementsByMatiere />
                </CardContent>
            </Card>
            <Typography variant="h5" gutterBottom style={{ marginTop: '6em' }}>
                2) Notes
            </Typography>
            <Card style={{ marginTop: '2em' }}>
                <CardContent>
                    <RepartitionNotes />
                </CardContent>
            </Card>
            <Card style={{ marginTop: '2em' }}>
                <CardContent>
                    <NotesParMoisChart />
                </CardContent>
            </Card>
        </div>
    );
};

export default StatsPage;