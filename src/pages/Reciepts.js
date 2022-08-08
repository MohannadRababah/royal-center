import { Add } from "@mui/icons-material"
import { Box, Typography, Container, Grid, TextField, Select, Menu, MenuItem, FormControl, FormLabel, InputLabel, Button } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
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

    const nav=useNavigate()

    useEffect(() => {
        var officesTemp = []
        var rentersNamesTemp = []
        var recieptNumsTemp = []
        axios.post('https://pure-meadow-98451.herokuapp.com/get_reciepts',{ token :localStorage.getItem('token')}).then(res => {
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

        }).catch(err => {
            console.log(err);
        })


    }, [])





    return (
        <Container  sx={{mb:'30px'}}>

            <Box textAlign='center' margin={3}>
                <Typography variant="h4">Receipts</Typography>
            </Box>
            <Box>
                <Button endIcon={<Add/>} onClick={()=>{nav('/recieptManagment')}}>New Receipt</Button>
            </Box>
            <Container>
                <Grid container spacing={3} mt={3} sx={{ backgroundColor: 'white',borderRadius:'10px',paddingRight:'25px',border:1 }} >
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel >office number</InputLabel>
                            <Select label='office number' value={selectedOfficeFilter} onChange={(e) => {
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
                                <MenuItem value='إظهار الجميع' onClick={()=>{setSelectedOfficeFilter('إظهار الجميع')}}>إظهار الجميع</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel >renter name</InputLabel>
                            <Select fullWidth label='renter name' value={selectedNameFilter} onChange={(e) => {
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
                                <MenuItem value='إظهار الجميع' onClick={()=>{setSelectedNameFilter('إظهار الجميع')}}>إظهار الجميع</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField value={selectedNumberFilter} onChange={(e) => {
                            setSelectedNumberFilter(e.target.value)
                            setSelectedOfficeFilter('إظهار الجميع')
                            setSelectedNameFilter('إظهار الجميع')

                            reciepts.map(reciept => {
                                if (reciept.recieptNumber.toString()===(e.target.value.toString()))
                                    filteredDataTemp.push(reciept)
                            })
                            setFilteredData(filteredDataTemp)
                        }} fullWidth label='reciept number' variant='outlined'></TextField>
                    </Grid>


                   {console.log(recieptNums,'lllllll')}
                    <RecieptsSummary reciepts={recieptNums.includes(parseInt(selectedNumberFilter))||selectedNumberFilter===''?!filteredData.length ? reciepts : filteredData:[]} setReciepts={setReciepts} />
                   
                </Grid>
            </Container>
        </Container>
    )
}


export default Reciepts