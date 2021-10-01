import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';

export default function SnackAlert({ snack, closeSnack, snackSeverity, snackMessage }) {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snack}
                onClose={closeSnack}
                TransitionComponent={Fade}
                autoHideDuration={3000}
            >
                <Alert severity={snackSeverity}>{snackMessage}</Alert>
            </Snackbar>
        </Stack>
    );
}
