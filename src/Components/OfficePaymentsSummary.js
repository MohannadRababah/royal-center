import {
    AppBar,
    Button,
    Toolbar,
    Grid,
    Typography,
    Box,
    MenuItem,
    MenuList,
    FormLabel,
    Divider,
    Container,
    Dialog,
    DialogContent,
    DialogActions
} from "@mui/material";
import axios from "axios";
import { TextField } from "mui-rff";
import { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router";
import OfficesSummary from "../Components/OfficesSummary";
import CardsSkeleton from "./CardsSkeleton";





const OfficePaymentsSummary = ({ requiredPayments, setRequiredPayments, setDataLoaded, dataLoaded }) => {

    const [officeNumber, setOfficeNumber] = useState('')
    const [payments, setPayments] = useState('')
    const [open, setOpen] = useState(false)
    const [rentersInfo, setRentersInfo] = useState([])
    const [recieptNumber, setRecieptNumber] = useState()
    const [oldRecieptNumber, setOldRecieptNumber] = useState()
    const [renterName, setRenterName] = useState('')
    const [addPaymentFormData, setAddPaymentFormData] = useState({})
    const nav=useNavigate()

    useEffect(() => {
        axios.post('https://pure-meadow-98451.herokuapp.com/get_Renters',{ token :localStorage.getItem('token')}).then(res => {
            console.log(res.data.data);
            setRentersInfo(res.data.data)
            setDataLoaded(true)
            if(res.data.message==='user is not verified'){
                nav('/')
                return
            }

            axios.post('https://pure-meadow-98451.herokuapp.com/get_reciept_number',{ token :localStorage.getItem('token')}).then(response => {
                setRecieptNumber(response.data.data)
                setOldRecieptNumber(response.data.data)
                console.log(response.data.data);
                if(res.data.message==='user is not verified'){
                    nav('/')
                    return
                }
            })
        }).catch(err => {
            console.log(err.message);
        })
    }, [])

    const todayDate= new Date


    const onSubmit = (values) => {
        setDataLoaded(false)
        console.log(values, 'kkkkkkkkkkk');
        axios.post('https://pure-meadow-98451.herokuapp.com/addReciept', {
            officeNumber: officeNumber,
            name: values.name,
            amount: values.amount,
            recieptNumber: values.recieptNumber,
            desc: values.desc,
            date: values.date,
            token :localStorage.getItem('token')
        }).then((res) => {
            if(res.data.message==='user is not verified'){
                nav('/')
                return
            }
            if (res.data.success) {
                axios
                    .post("https://pure-meadow-98451.herokuapp.com/addPayment", {
                        officeNumber: officeNumber,
                        payed: payments, 
                        token :localStorage.getItem('token')
                    })
                    .then((res) => {
                        if(res.data.message==='user is not verified'){
                            nav('/')
                            return
                        }
                        if (res.data.success) {
                            
                            axios
                                .post("https://pure-meadow-98451.herokuapp.com/get_Required_Payments",{ token :localStorage.getItem('token')})
                                .then((res) => {
                                    if(res.data.message==='user is not verified'){
                                        nav('/')
                                        return
                                    }
                                    if (res.data.success) {
                                        setRequiredPayments(res.data.data)
                                        setDataLoaded(true)
                                        axios.post('https://pure-meadow-98451.herokuapp.com/increase_reciept_number', { oldRecieptNumber:oldRecieptNumber,recieptNumber: values.recieptNumber, token :localStorage.getItem('token') }).then(response => {
                                            console.log(response);
                                            setRecieptNumber(recieptNumber+1)
                                        })
                                    }
                                    else {
                                        console.log(res.data.message);
                                    }
                                })
                                .catch((err) => {
                                    console.log(err.message);
                                });
                        }
                        else {
                            console.log(res.data.message);
                        }
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            }
            else {
                console.log(res.data.message);
            }
        }).catch(err => {
            console.log(err.message);
        })


        setOpen(false)


    }



    return dataLoaded?<>
            <Form
                initialValues={{
                    recieptNumber: recieptNumber,
                    name: renterName,
                    amount:addPaymentFormData.amount,
                    desc:addPaymentFormData.desc,
                    date: `${todayDate.getDate()}/${todayDate.getMonth()+1}/${todayDate.getFullYear()}`
                }}
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (

                    <Dialog fullWidth open={open} onClose={() => { setOpen(false) }}>
                        <DialogContent >
                            <form onSubmit={handleSubmit}>
                                <Grid item xs={12} textAlign='center'>
                                    <Typography variant="h4">
                                        Property Payments
                                    </Typography>
                                </Grid>
                                <Container>
                                    <Grid item xs={12}>
                                        <Typography color='#73777B'>Property Number:</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {officeNumber}
                                    </Grid>
                                </Container>

                                <Grid item xs={12} margin={3}>
                                    <TextField  required label='Reciept Number' name="recieptNumber"></TextField>{/*retrieved*/}
                                </Grid>
                                <Grid item xs={12} margin={3}>
                                    <TextField disabled required label='Renter Name' name="name"></TextField>{/*retrieved*/}
                                </Grid>
                                <Grid item xs={12} margin={3}>
                                    <TextField disabled required label='amount' name="amount"></TextField>{/*retrieved*/}
                                </Grid>
                                <Grid item xs={12} margin={3}>
                                    <TextField label='Today`s Date' required name="date"></TextField>{/*generated from todays date*/}
                                </Grid>
                                <Grid item xs={12} margin={3}>
                                    <TextField required label='That`s For' name="desc"></TextField>{/*retrieved as a structure*/}
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                                    <Button type='submit'>Confirm</Button>
                                </Grid>


                            </form>

                        </DialogContent>
                    </Dialog>

                )}
            />
                {
                     requiredPayments.length!==0?requiredPayments.map((item, idx) => {
                        var date = new Date(parseInt(item.startDate.slice(6, 10)), parseInt(item.startDate.slice(3, 5)) - 1 + (item.payed) * (12 / (item.paymentPeriod)), parseInt(item.startDate.slice(0, 3)));
                        console.log(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);
                        return <Box key={idx}
                        border={1}
                        width="70%"
                        sx={{
                          margin: "auto",
                          marginBottom: '30px',
                          borderRadius: '50px',
                          boxShadow: '5px 5px 5px 5px  #b3b3b3',
                          minWidth: "350px",
                          overflow: "auto",
                          backgroundColor: "white",
                          minHeight: '100px'
                        }}
                      ><Container><Grid container spacing={3} mt={2}>
                            <Grid item xs={4} ><FormLabel sx={{ display: 'block' }}> Property Number : </FormLabel>{item.officeNumber}</Grid>
                            <Grid item xs={4}><FormLabel sx={{ display: 'block' }}> Required Payment : </FormLabel> {item.totalPayment / item.paymentPeriod}</Grid>
                            <Grid item xs={4}><FormLabel sx={{ display: 'block' }}> Payment Date : </FormLabel> {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</Grid>


                            {
                                rentersInfo.map(renter => {
                                    return renter.offices.includes(item.officeNumber) ? <>
                                        <Grid item xs={4}><FormLabel sx={{ display: 'block' }}> Renter name : </FormLabel>{renter.name}</Grid>
                                        <Grid item xs={4}><FormLabel sx={{ display: 'block' }}> Renter email : </FormLabel>{renter.email}</Grid>
                                        <Grid item xs={4}><FormLabel sx={{ display: 'block' }}> Renter phone : </FormLabel>{renter.phone}</Grid>
                                        <Grid item xs={12} sx={{ textAlign: 'right', marginBottom: '10px', marginTop: '20px' }}>
                                            <Button variant="outlined" sx={{ height: '20px' }} onClick={() => {
                                                setPayments(item.payed)
                                                setRenterName(renter.name)
                                                setAddPaymentFormData({ amount: item.totalPayment / item.paymentPeriod, recieptNumber: recieptNumber, name: renterName, desc: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} payment for office number ${item.officeNumber}` })
                                                console.log(addPaymentFormData);
                                                setOfficeNumber(item.officeNumber)
                                                setOpen(true)
                                            }}>Add Payment</Button>
                                        </Grid>
                                    </> : null
                                })
                            }
                        </Grid></Container>

                            <Divider /></Box>
                    }):<Box sx={{minHeight: '100px',marginTop:'80px'}}  textAlign='center'>لا يوجد دفعات حالية</Box>
                }</>: <CardsSkeleton/>
    
}

export default OfficePaymentsSummary