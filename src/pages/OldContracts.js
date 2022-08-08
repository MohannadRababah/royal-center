import { Alert, Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import CardsSkeleton from "../Components/CardsSkeleton";
import ContractsSummary from "../Components/ContractsSummary"
import TableSkeleton from "../Components/TableSkeleton";


const OldContracts = () => {

  const [contracts, setContracts] = useState([])
  const [renters, setRenters] = useState([])
  const [errMsg, setErrMsg] = useState('')
  const [dataLoaded, setDataLoaded] = useState(false);




  useEffect(() => {
    
    axios
      .post("https://pure-meadow-98451.herokuapp.com/get_Old_Contracts",{ token :localStorage.getItem('token')})
      .then((res) => {
        if (res.data.success) {
          console.log(res);
          setContracts(res.data.data);
          setErrMsg('')
          setDataLoaded(true)
        }
        else {
          setErrMsg(res.data.message)
        }
      })
      .catch((err) => {
        setErrMsg(err.message)
      });
  }, []);

  return (
    <>
      {errMsg && <Alert variant='outlined' severity="error">{errMsg}</Alert>}
      <Box textAlign='center' margin={3}>
        <Typography variant="h4">Old Contracts</Typography>
      </Box>
      {dataLoaded?<ContractsSummary rentersData={contracts} edit={false} data={contracts} />:<CardsSkeleton/>}
    </>
  )
}

export default OldContracts