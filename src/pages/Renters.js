import { Alert, Box, Typography } from "@mui/material"
import { Container } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"
import RentersSummary from "../Components/RentersSummary"


const Renters = () => {

    const [renters, setRenters] = useState([])
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3001/get_Renters').then(response => {
            if (response.data.success) {
                setRenters(response.data.data)
                setErrMsg('')
            }
            else{
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
            <Box textAlign='center' margin={3}>
                <Typography variant="h4">Renters Information</Typography>
            </Box>
            <RentersSummary data={renters} />
        </Container>
    )
}

export default Renters