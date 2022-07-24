/* eslint-disable react-hooks/rules-of-hooks */
import {
  Backdrop,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  Snackbar,
  FormControl,
  TextField,
  DialogTitle,
} from '@mui/material'
import MuiAlert from '@mui/material/Alert';
import { useRouter } from 'next/router';
import { useFetch } from "../lib/fetcher";
import { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { HTTP_METHODS, NUMBER_OF_PLAYERS_RANKING } from '../utils/constants';
import { Score } from '../domain/models/score';
import { FaTrophy } from 'react-icons/fa';

type Props = {
    open: boolean
    handleClose: () => void
    time: number
    onSaveRecord: () => void
}

const DialogRecordBreaker = ({ open, handleClose, time, onSaveRecord }: Props) => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState<any>('success');
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const router = useRouter();

    const [isSaving, setIsSaving] = useState(false)

    const onClick = async () => {
        if (name === '') {
            setError(true)
            setErrorText('Fill the field')
        }

        setIsSaving(true)

        const scoresResponse = await useFetch(`/api/scores?id=${router.query.id}`);
        const globalScoresResponse = await useFetch(`/api/global-scores?id=${router.query.id}`);

        try {
            let indexOfGlobalScoreRecord = -1
            if (globalScoresResponse.data && globalScoresResponse.data.scores.length > 0) {
                indexOfGlobalScoreRecord = globalScoresResponse.data.scores.findIndex(((value: Score) => value.time > time))
            }

            if (indexOfGlobalScoreRecord !== -1 || NUMBER_OF_PLAYERS_RANKING > (globalScoresResponse.data?.scores.length ?? 0)) {
                await useFetch('/api/insert-global-score', HTTP_METHODS.POST, { time, name })
            }

            let indexOfScoreRecord = -1
            if (scoresResponse.data && scoresResponse.data.scores.length > 0) {
                indexOfScoreRecord = scoresResponse.data.scores.findIndex(((value: Score) => value.time > time))
            }

            if (indexOfScoreRecord !== -1 || NUMBER_OF_PLAYERS_RANKING > (scoresResponse.data?.scores.length ?? 0)) {
                await useFetch('/api/insert-score', HTTP_METHODS.POST, { time, name, id: router.query.id })
            }
        } catch (error) {
            setStatus('error')
            setOpenSnackBar(true)

            return
        }

        setIsSaving(false)
        setStatus('success')
        setOpenSnackBar(true)
        handleClose()
        onSaveRecord()
    };

    return (
      <Dialog
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100,
        }}
        open={open}
        onClose={(_, reason) => {
            if (reason !== "backdropClick") {
              handleClose();
            }
          }}
      >
        <DialogContent>
            <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={() => { setOpenSnackBar(false) }}>
                <MuiAlert elevation={6} variant="filled" onClose={() => { setOpenSnackBar(false) }} severity={status} sx={{ width: '100%' }}>
                    {status === 'success' ? 'Record saved succesfully': 'Error ! try again'}
                </MuiAlert>
            </Snackbar>
            <DialogTitle>
                <Typography variant='h4'>
                    Conglatulation
                    <FaTrophy color='#ffd700' />
                </Typography>
            </DialogTitle>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='subtitle1'>
                        You are in the top ranking, fill your name and save your record
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth id="name">
                        <TextField
                        variant="outlined"
                        id="name"
                        type="name"
                        label="Name"
                        value={name}
                        onChange={(event) => {
                            const { value } = event.currentTarget
                            setName(value)
                        }}
                        error={error}
                        helperText={errorText}
                    />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton loading={isSaving} variant='contained' color="success" fullWidth onClick={onClick} disabled={name === ''}>
                        Save
                    </LoadingButton>
                </Grid>
            </Grid>
        </DialogContent>
      </Dialog>
    )
}

export default DialogRecordBreaker