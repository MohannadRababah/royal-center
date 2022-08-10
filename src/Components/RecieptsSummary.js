import { Edit } from "@mui/icons-material";
import { Button, Container, Divider, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import RecieptSchema from "../schema/RecieptSchema"


const RecieptsSummary = ({ reciepts, setReciepts }) => {
    console.log(reciepts);
    const nav = useNavigate()
    return (
        <Box >
            {
                reciepts.length !== 0 ? reciepts.map((item, idx) => (
                    <Box
                        border={1}
                        width="70%"
                        sx={{
                            margin: "auto",
                            marginBottom: '30px',
                            borderRadius: '50px',
                            boxShadow: '5px 7px 5px 2px  #545151',
                            minWidth: "350px",
                            backgroundColor: "white",
                            minHeight: '100px'
                        }}
                    >
                        <Grid container spacing={3} mt={1} mb={1} >
                            {
                                RecieptSchema.map((schema) => (
                                    item[schema.name] ?
                                        <Grid key={idx} item xs={4}>
                                            <Container><Typography color='#73777B'>{schema.label}</Typography></Container>
                                            <Container>{item[schema.name]}</Container>
                                        </Grid>
                                        : null
                                ))
                            }
                            <Grid item xs={12} textAlign='right'>
                                <Container>
                                    <Button variant="outlined" endIcon={<Edit sx={{marginRight:'5px'}}/>} onClick={() => nav('/recieptManagment', { state: { initVal: item } })}> تعديل </Button>
                                </Container>
                            </Grid>
                        </Grid>
                    </Box>
                )) : <Grid item xs={12} textAlign='center'>لا يوجد وصولات</Grid>
            }
        </Box>
    )
}

export default RecieptsSummary