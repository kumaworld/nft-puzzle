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

export default function HighscoreModal({ open, handleClose }) {
    const headers = ['Name', 'Time']
    const [value, setValue] = useState(0);
    const router = useRouter();

    const [scores, setScores] = useState([])
    const [globalScores, setGlobalScores] = useState([])

    const [isLoadingGlobalScores, setIsLoadingGlobalScores] = useState(true)
    const [isLoadingScores, setIsLoadingScores] = useState(true)

    console.log(scores)

    useEffect(() => {
        const getScores = async () => {
            const { data } = await useFetch(`/api/scores?id=${router.query.id}`);

            setScores(data?.scores ?? [])
            setIsLoadingScores(false)
        }

        const getGlobalScores = async () => {
            const { data } = await useFetch(`/api/global-scores?id=${router.query.id}`);

            setGlobalScores(data?.scores ?? [])
            setIsLoadingGlobalScores(false)
        }

        getScores()
        getGlobalScores()
    }, [router.query.id]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

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
            Ranking
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
                <Tab icon={<Public />}  iconPosition="start" label="Global ranking"  value={1}/>
                <Tab icon={<Panorama />} iconPosition="start" label="NFT ranking"  value={2}/>
                </TabList>
                    <TabPanel value={1}>
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
                                        globalScores.map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                                <TableCell >
                                                    {row.name}
                                                </TableCell>
                                                <TableCell >
                                                    {row.time}
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
                    <TabPanel value={2}>
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
                                        scores.map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                                <TableCell >
                                                    {row.name}
                                                </TableCell>
                                                <TableCell >
                                                    {row.time}
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
