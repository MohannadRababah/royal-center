import { Edit } from "@mui/icons-material"
import { Container, Grid, Box, Divider, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router"
import RentersSchema from "../schema/RentersSchema"

const RentersSummary = ({ data,toggle }) => {

    const nav=useNavigate()
    return data.length!==0?data.map((item) => {
                        return toggle||item.offices.length!==0?<Box
                        
                        border={1}
                        width="70%"
                        sx={{
                          direction:'rtl',
                          margin: "auto",
                          marginBottom: '30px',
                          borderRadius: '50px',
                          boxShadow: '5px 7px 5px 2px  #545151',
                          minWidth: "350px",
                          backgroundColor: "white",
                          minHeight: '100px'
                        }}
                      ><Grid mt={3} container spacing={3}>{RentersSchema.map((schema) => {
                            return <Grid item xs={4}>
                                <Container><Typography color='#73777B'>{schema.label}</Typography></Container>
                                <Container>{schema?.valueFun ? schema.valueFun(item) : item[schema.name]}</Container>
                            </Grid>
                        })}
                            <Grid textAlign='left' margin={3} item xs={12}>
                                <Button  variant='outlined' endIcon={<Edit sx={{marginRight:'5px'}}/>}  onClick={()=>{
                                    nav('/renterManagment',{state:{renter:item}})
                                }}>تعديل</Button>
                            </Grid>
                            </Grid>
                        </Box>:null
                    }):<Grid item xs={12} textAlign='center'>لا يوجد مستأجرين</Grid>
                

           
            
    
}

export default RentersSummary