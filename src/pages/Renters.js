import { Label } from "@mui/icons-material"
import { Alert, Box, Button, FormControlLabel, FormLabel, Switch, Typography } from "@mui/material"
import { Container } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"
import RentersSummary from "../Components/RentersSummary"
import TableSkeleton from "../Components/TableSkeleton"


const Renters = () => {

    const [renters, setRenters] = useState([])
    const [errMsg, setErrMsg] = useState('')
    const [dataLoaded, setDataLoaded] = useState(false);
    const [toggle, setToggle] = useState(false);


    useEffect(() => {
        axios.post('https://pure-meadow-98451.herokuapp.com/get_Renters', { token: localStorage.getItem('token') }).then(response => {
            if (response.data.success) {
                setRenters(response.data.data)
                setErrMsg('')
                setDataLoaded(true)
            }
            else {
                setErrMsg(response.data.message)
            }
        }).catch(err => {
            setErrMsg(err.message)
        })
    }, [])
    return (
        <Container sx={{ minWidth: '830px' }}>
            {
                errMsg && <Alert variant='outlined' severity='error'>{errMsg}</Alert>
            }
            <Box textAlign='center' margin={3} mb='70px'>
                <Typography variant="h4">Renters Information</Typography>
            </Box>
            <Box display='flex'>
                <FormLabel> renters with active contracts</FormLabel>
                <Switch onClick={()=>{setToggle(!toggle)}}/>
                <FormLabel>all renters</FormLabel>
            </Box>
            {dataLoaded ? <RentersSummary toggle={toggle} data={renters} /> : <TableSkeleton />}
        </Container>
    )
}

export default Renters