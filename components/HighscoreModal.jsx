/* eslint-disable react-hooks/rules-of-hooks */

import { Close } from '@mui/icons-material'
import {
  AppBar,
  Backdrop,
  Dialog,
  DialogContent,
  Paper,
  Table,
  TableHead,
  Tabs,
  Tab,
  TableCell,
  TableBody,
  TableContainer,
  TableRow,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router';
import { useFetch } from "../lib/fetcher";
import { useState, useEffect } from 'react';
import TableRowWithSkeleton from './TableRowWithSkeleton'
import TableRowEmpty from './TableRowEmpty'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList'

import { Public, Panorama } from '@mui/icons-material';
import { NUMBER_OF_PLAYERS_RANKING } from '../utils/constants';

export default function HighscoreModal({ open, handleClose }) {
    const headers = ['','Name', 'Time']
    const [value, setValue] = useState('1');
    const router = useRouter();

    const [scores, setScores] = useState([])
    const [globalScores, setGlobalScores] = useState([])

    const [isLoadingGlobalScores, setIsLoadingGlobalScores] = useState(true)
    const [isLoadingScores, setIsLoadingScores] = useState(true)

    useEffect(() => {
        const getScores = async () => {
            const { data } = await useFetch(`/api/scores?id=${router.query.id}`);

            setScores(data?.scores ?? [])
            setIsLoadingScores(false)
        }

        const getGlobalScores = async () => {
            const { data } = await useFetch('/api/global-scores');

            setGlobalScores(data?.scores ?? [])
            setIsLoadingGlobalScores(false)
        }

        getScores()
        getGlobalScores()
    }, [router.query.id, open]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const goldStyle = {
        fontSize: 24,
        color: '#FFD700'
    }

    const silverStyle = {
        fontSize: 24,
        color: '#C0C0C0'
    }

    const bronzeStyle = {
        fontSize: 24,
        color: '#967444'
    }

    const getTyphographyStyle = (index) => {
        switch (index) {
            case 0:
                return goldStyle
            case 1:
                return silverStyle
            case 2:
                return bronzeStyle

            default:
                return {
                    fontSize: 12
                }
        }
    }

    return (
      <Dialog
        fullScreen={true}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100,
        }}
        open={open}
      >
        <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Top ${NUMBER_OF_PLAYERS_RANKING} players
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <Close />
            </IconButton>
        </Toolbar>
        </AppBar>
        <DialogContent dividers>
        <TabContext value={value}>
            <TabList
                centered
                value={value}
                onChange={handleChange}
                aria-label="icon position tabs example"
                >
                <Tab icon={<Public />}  iconPosition="start" label="Global ranking"  value={'1'}/>
                <Tab icon={<Panorama />} iconPosition="start" label="NFT ranking"  value={'2'}/>
                </TabList>
                    <TabPanel value={'1'}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                    {headers.map((header) => (
                                        <TableCell
                                        key={header}
                                        >
                                        {header}
                                        </TableCell>
                                    ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {isLoadingGlobalScores ? (
                                        <>
                                            <TableRowWithSkeleton numColumns={headers.length} />
                                            <TableRowWithSkeleton numColumns={headers.length} />
                                            <TableRowWithSkeleton numColumns={headers.length} />
                                            <TableRowWithSkeleton numColumns={headers.length} />
                                        </>
                                    ) : (
                                        globalScores.length > 0 ?
                                        globalScores.map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>

                                                <TableCell >
                                                    <Typography sx={getTyphographyStyle(index)}>{index + 1}st</Typography>
                                                </TableCell>
                                                <TableCell >
                                                    {row.name}
                                                </TableCell>
                                                <TableCell >
                                                {("0" + Math.floor((row.time / 60000) % 60)).slice(-2)} : {("0" + Math.floor((row.time / 1000) % 60)).slice(-2)} : {("0" + ((row.time / 10) % 100)).slice(-2)}
                                                </TableCell>
                                            </TableRow>
                                            );
                                        })
                                        : <TableRowEmpty text="No previous records"/>
                                    )
                                    }
                                </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </TabPanel>
                    <TabPanel value={'2'}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                    {headers.map((header) => (
                                        <TableCell
                                        key={header}
                                        >
                                        {header}
                                        </TableCell>
                                    ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {isLoadingScores ? (
                                        <>
                                            <TableRowWithSkeleton numColumns={headers.length} />
                                            <TableRowWithSkeleton numColumns={headers.length} />
                                            <TableRowWithSkeleton numColumns={headers.length} />
                                            <TableRowWithSkeleton numColumns={headers.length} />
                                        </>
                                    ) : (
                                        scores.length > 0 ?
                                        scores.map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                                <TableCell >
                                                    <Typography sx={getTyphographyStyle(index)}>{index + 1}st</Typography>
                                                </TableCell>
                                                <TableCell >
                                                    {row.name}
                                                </TableCell>
                                                <TableCell >
                                                    {("0" + Math.floor((row.time / 60000) % 60)).slice(-2)} : {("0" + Math.floor((row.time / 1000) % 60)).slice(-2)} : {("0" + ((row.time / 10) % 100)).slice(-2)}
                                                </TableCell>
                                            </TableRow>
                                            );
                                        })
                                        : <TableRowEmpty text="No previous records"/>
                                    )
                                    }
                                </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </TabPanel>
            </TabContext>
        </DialogContent>
      </Dialog>
    )
}
