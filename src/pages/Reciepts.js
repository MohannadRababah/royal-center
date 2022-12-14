import { Add } from "@mui/icons-material"
import { Box, Typography, Container, Grid, TextField, Select, Menu, MenuItem, FormControl, FormLabel, InputLabel, Button, Skeleton, Divider, CircularProgress } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import CardsSkeleton from "../Components/CardsSkeleton"
import RecieptsSummary from "../Components/RecieptsSummary"


const Reciepts = () => {
    const [reciepts, setReciepts] = useState([])
    const [offices, setOffices] = useState([])
    const [rentersNames, setRentersNames] = useState([])
    const [recieptNums, setRecieptNums] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [selectedOfficeFilter, setSelectedOfficeFilter] = useState('إظهار الجميع')
    const [selectedNameFilter, setSelectedNameFilter] = useState('إظهار الجميع')
    const [selectedNumberFilter, setSelectedNumberFilter] = useState('')
    var filteredDataTemp = []

    const [dataLoaded, setDataLoaded] = useState(false);


    const nav = useNavigate()

    useEffect(() => {
        var officesTemp = []
        var rentersNamesTemp = []
        var recieptNumsTemp = []
        axios.post('https://pure-meadow-98451.herokuapp.com/get_reciepts', { token: localStorage.getItem('token') }).then(res => {
            if(res.data.message==='user is not verified'){
                nav('/')
                return
            }    
        setReciepts(res.data.data)
            res.data.data.map((item, idx) => {
                console.log(!offices.includes(item.officeNumber));
                console.log(!rentersNames.includes(item.name));
                if (!officesTemp.includes(item.officeNumber)) {
                    officesTemp.push(item.officeNumber)
                }
                if (!rentersNamesTemp.includes(item.name)) {
                    rentersNamesTemp.push(item.name)
                }
                recieptNumsTemp.push(item.recieptNumber)
            })
            setOffices(officesTemp)
            setRentersNames(rentersNamesTemp)
            setRecieptNums(recieptNumsTemp)
            setDataLoaded(true)

        }).catch(err => {
            console.log(err);
        })


    }, [])





    return (
        <Container  sx={{direction:'rtl', mb: '30px' }}>

            <Box textAlign='center' margin={3}>
                <Typography variant="h4" color='black'>الوصولات</Typography>
            </Box>
            <Box textAlign='left'>
                <Button color='success' endIcon={<Add sx={{marginRight:'5px'}}/>} onClick={() => { nav('/recieptManagment') }}> اضافة وصل </Button>
            </Box>
            <Container>
                <Grid container spacing={3} mt={3} sx={{ backgroundColor: '#F0E3CA', borderRadius: '10px', paddingRight: '25px', border: 1 }} >
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel >رقم الممتلك</InputLabel>
                            <Select label='رقم الممتلك' value={selectedOfficeFilter} onChange={(e) => {
                                setSelectedNameFilter('إظهار الجميع')
                                setSelectedNumberFilter('')
                                reciepts.map(reciept => {
                                    if (reciept.officeNumber.toString().includes(e.target.value.toString()))
                                        filteredDataTemp.push(reciept)
                                })
                                setFilteredData(filteredDataTemp)
                            }}>
                                {
                                    offices.map((officenum, idx) => {
                                        return <MenuItem key={idx} value={officenum} onClick={() => { setSelectedOfficeFilter(officenum) }}>
                                            {officenum}
                                        </MenuItem>
                                    })
                                }
                                <MenuItem value='إظهار الجميع' onClick={() => { setSelectedOfficeFilter('إظهار الجميع') }}>إظهار الجميع</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel >اسم المستأجر</InputLabel>
                            <Select fullWidth label='اسم المستأجر' value={selectedNameFilter} onChange={(e) => {
                                setSelectedOfficeFilter('إظهار الجميع')
                                setSelectedNumberFilter('')
                                reciepts.map(reciept => {
                                    if (reciept.name.toString().includes(e.target.value.toString()))
                                        filteredDataTemp.push(reciept)
                                })
                                setFilteredData(filteredDataTemp)
                            }}>
                                {
                                    rentersNames.map((name, idx) => {
                                        return <MenuItem onClick={() => {
                                            setSelectedNameFilter(name)
                                        }} key={idx} value={name}>
                                            {name}
                                        </MenuItem>
                                    })
                                }
                                <MenuItem value='إظهار الجميع' onClick={() => { setSelectedNameFilter('إظهار الجميع') }}>إظهار الجميع</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField value={selectedNumberFilter} onChange={(e) => {
                            setSelectedNumberFilter(e.target.value)
                            setSelectedOfficeFilter('إظهار الجميع')
                            setSelectedNameFilter('إظهار الجميع')

                            reciepts.map(reciept => {
                                if (reciept.recieptNumber.toString() === (e.target.value.toString()))
                                    filteredDataTemp.push(reciept)
                            })
                            setFilteredData(filteredDataTemp)
                        }} fullWidth label='رقم الوصل' variant='outlined'></TextField>
                    </Grid>

                  
                    {console.log(recieptNums, 'lllllll')}
                    {dataLoaded ?  <Grid container spacing={3} mt={5} mb={1} ><RecieptsSummary reciepts={recieptNums.includes(parseInt(selectedNumberFilter)) || selectedNumberFilter === '' ? !filteredData.length ? reciepts : filteredData : []} setReciepts={setReciepts} /></Grid> :
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

                        </Grid>
            </Container>
        </Container>
    )
}


export default Reciepts