import { Box, Typography, Container } from "@mui/material"
import { useState } from "react"
import RecieptsSummary from "../Components/RecieptsSummary"


const Reciepts = () => {
    const [reciepts,setReciepts]=useState([])

    
    return(
        <Container >
            <Box textAlign='center' margin={3}>
                <Typography variant="h4">Receipts</Typography>
            </Box>
            <RecieptsSummary reciepts={[{name:'mohannad',officeNumber:'101',date:'1/7/2022',desc:'Rent of office 101',amount:'500'},{name:'mohannad',officeNumber:'101',date:'1/7/2022',desc:'Rent of office 101',amount:'500'}]} setReciepts={setReciepts}/>
        </Container>
    )
}


export default Reciepts