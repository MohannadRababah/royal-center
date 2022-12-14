
import { Container } from "@mui/system";
import { Form } from "react-final-form";
import { TextField, Select } from "mui-rff";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    MenuItem,
    Typography
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";



const AddNewReciept = () => {
    const todayDate = new Date
    const location = useLocation()

    const [recieptNumber, setRecieptNumber] = useState()
    const [submitting, setSubmitting] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [oldRecieptNumber, setOldRecieptNumber] = useState()
    const initVal = location?.state?.initVal
    const nav = useNavigate()
    console.log(initVal);


    const onSubmit = (values) => {
        setSubmitting(true)
        console.log(values.recieptNumber, oldRecieptNumber, 'lalaalalalkkakkakakaak');
        if (!initVal) {
            axios.post('https://pure-meadow-98451.herokuapp.com/addReciept', {
                officeNumber: 'random reciept',
                name: values.name,
                amount: values.amount,
                recieptNumber: values.recieptNumber,
                desc: values.desc,
                date: values.date,
                token: localStorage.getItem('token')
            }).then((res) => {
                if (res.data.message === 'user is not verified') {
                    nav('/')
                    return
                }
                if (res.data.success) {

                    axios.post('https://pure-meadow-98451.herokuapp.com/increase_reciept_number', { oldRecieptNumber: oldRecieptNumber, recieptNumber: values.recieptNumber, token: localStorage.getItem('token') }).then(response => {

                        console.log(response, 'log increase');
                        setSubmitting(false)
                        nav('/reciepts')
                    })

                        .catch((err) => {
                            console.log(err.message);
                        });
                }
                else {
                    setErrMsg(res.data.message)
                setSubmitting(false)

                }


            }).catch(err => {
                setErrMsg(err.message);
                setSubmitting(false)

            })

        }
        else {
            axios.post('https://pure-meadow-98451.herokuapp.com/editReciept', {
                officeNumber: 'random reciept',
                name: values.name,
                amount: values.amount,
                oldRecieptNumber: oldRecieptNumber,
                recieptNumber: values.recieptNumber,
                desc: values.desc,
                date: values.date,
                token: localStorage.getItem('token')
            })
                .then((res) => {
                    if (!res.data.success) {
                        setErrMsg(res.data.message)
                setSubmitting(false)

                    }
                    setSubmitting(false)
                    if (res.data.message === 'user is not verified') {
                        nav('/')
                        return
                    }
                    else { nav('/reciepts') }
                })
                .catch(err => {
                    setErrMsg(err.message)
                    setSubmitting(false)

                })
        }

    }
    useEffect(() => {


        axios.post('https://pure-meadow-98451.herokuapp.com/get_reciept_number', { token: localStorage.getItem('token') }).then(response => {
            if (response.data.message === 'user is not verified') {
                nav('/')
                return
            }
            if (!response.data.success) {
                setErrMsg(response.data.message)
                setSubmitting(false)
            }
            setRecieptNumber(response.data.data)
            setOldRecieptNumber(initVal ? initVal?.recieptNumber : response.data.data)
            console.log(response.data.data);
        })
    }, [])

    return <Box textAlign='center' sx={{direction:'rtl'}} >
        <Typography variant="h4" color='black'>
            ?????????? ??????
        </Typography>
        <Container sx={{ backgroundColor: 'white', mt: '50px', marginBottom: '50px', paddingTop: '30px', border: 1, borderRadius: '10px' }}>
            {errMsg && <Alert severity="error" variant="outlined">{errMsg}</Alert>}
            <Form
                initialValues={!initVal ? {
                    recieptNumber: recieptNumber,
                    // name: renterName,
                    // amount:addPaymentFormData.amount,
                    // desc:addPaymentFormData.desc,
                    date: `${todayDate.getDate()}/${todayDate.getMonth() + 1}/${todayDate.getFullYear()}`
                } : { ...initVal }}
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (

                    <form onSubmit={handleSubmit}>

                        <Grid item xs={12} margin={3} >
                            <TextField required label='?????? ??????????' name="recieptNumber"></TextField>{/*retrieved*/}
                        </Grid>
                        <Grid item xs={12} margin={3}>
                            <TextField required label='??????????' name="name"></TextField>{/*retrieved*/}
                        </Grid>
                        <Grid item xs={12} margin={3}>
                            <TextField required label='????????????' name="amount"></TextField>{/*retrieved*/}
                        </Grid>
                        <Grid item xs={12} margin={3}>
                            <TextField label='?????????? ??????????' required name="date"></TextField>{/*generated from todays date*/}
                        </Grid>
                        <Grid item xs={12} margin={3}>
                            <TextField required label='???????? ????' name="desc"></TextField>{/*retrieved as a structure*/}
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: '60px',mb:'10px' }}>
                            <Button disabled={submitting} onClick={() => nav('/reciepts')}>??????????</Button>
                            <Button disabled={submitting} endIcon={submitting ? <CircularProgress size='15px' sx={{ color: 'GrayText' }} /> : null} type='submit'>??????</Button>
                        </Grid>


                    </form>



                )}
            />
        </Container></Box>
}

export default AddNewReciept