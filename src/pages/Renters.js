import { CardGiftcard, Label } from "@mui/icons-material"
import { Alert, Box, Button, CircularProgress, FormControlLabel, FormLabel, Switch, Typography } from "@mui/material"
import { Container } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import RentersSummary from "../Components/RentersSummary"
import TableSkeleton from "../Components/TableSkeleton"


const Renters = () => {

    const [renters, setRenters] = useState([])
    const [errMsg, setErrMsg] = useState('')
    const [dataLoaded, setDataLoaded] = useState(false);
    const [toggle, setToggle] = useState(false);
    const nav = useNavigate()

    useEffect(() => {
        axios.post('https://pure-meadow-98451.herokuapp.com/get_Renters', { token: localStorage.getItem('token') }).then(response => {
            if (response.data.message === 'user is not verified') {
                nav('/')
                return
            }
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
                <Typography variant="h4" color='black'>معلومات المستأجرين</Typography>
            </Box>
            <label style={{color:'#73777B'}}>جميع المستأجرين</label>
                <Switch disabled={!dataLoaded} onClick={() => { setToggle(!toggle) }} />
            <label style={{color:'#73777B'}}>مستأجرين بعقود فعالة</label>
                
            {dataLoaded ? <RentersSummary toggle={toggle} data={renters} /> : 
            <CircularProgress
            size="15rem"
            style={{
              marginTop:'100px',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              color: '#999696'
            }}
          />}
        </Container>
    )
}

export default Renters