import { Edit } from "@mui/icons-material"
import { Container, Grid, Box, Divider, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router"
import RentersSchema from "../schema/RentersSchema"

const RentersSummary = ({ data }) => {

    const nav=useNavigate()
    return data.length!==0?data.map((item) => {
                        return <Box
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
                      ><Grid mt={3} container spacing={2}>{RentersSchema.map((schema) => {
                            return <Grid item xs={4}>
                                <Container><Typography color='#73777B'>{schema.label}</Typography></Container>
                                <Container>{schema?.valueFun ? schema.valueFun(item) : item[schema.name]}</Container>
                            </Grid>
                        })}
                            <Grid textAlign='right' item xs={12}>
                                <Button sx={{marginRight:"100px"}} variant='outlined' startIcon={<Edit/>}  onClick={()=>{
                                    nav('/renterManagment',{state:{renter:item}})
                                }}>Edit</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider sx={{ margin: "10px" }} />
                            </Grid>
                            </Grid>
                        </Box>
                    }):<Grid item xs={12} textAlign='center'>لا يوجد مستأجرين</Grid>
                

           
            
    
}

export default RentersSummary