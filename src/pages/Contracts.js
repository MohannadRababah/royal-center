import { Alert, Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import ContractsSummary from "../Components/ContractsSummary"
import TableSkeleton from "../Components/TableSkeleton";


const Contracts = () => {

  const [contracts, setContracts] = useState([])
  const [owners, setOwners] = useState(['ahmad', 'mohammad'])
  const [renters, setRenters] = useState([])
  const [errMsg, setErrMsg] = useState('')
  const [dataLoaded, setDataLoaded] = useState(false);




  const removeContract = (officeNumber) => {
    console.log(officeNumber);
    setDataLoaded(false)
    axios
      .post("https://pure-meadow-98451.herokuapp.com/deleteContract", { officeNumber: officeNumber, token :localStorage.getItem('token') })
      .then((res) => {
        console.log(res, 'res::removeContract');
        if (res.data.success) {
          axios
            .post("https://pure-meadow-98451.herokuapp.com/get_Contracts",{ token :localStorage.getItem('token')})
            .then((res) => {
              console.log(res);
              setContracts(res.data.data);
              setDataLoaded(true)
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
        else {
          setErrMsg(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err.message);
      });



  }



  useEffect(() => {
    axios
      .post("https://pure-meadow-98451.herokuapp.com/get_Contracts",{ token :localStorage.getItem('token')})
      .then((res) => {
        if (res.data.success) {
          console.log(res);
          setContracts(res.data.data);
          setErrMsg('')

        }
        else {
          setErrMsg(res.data.message)
        }
      })
      .catch((err) => {
        setErrMsg(err.message)
      });




    axios.post('https://pure-meadow-98451.herokuapp.com/get_Renters',{ token :localStorage.getItem('token')}).then(response => {
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





  }, []);

  return (
    <>
      {errMsg && <Alert variant='outlined' severity="error">{errMsg}</Alert>}
      <Box textAlign='center' margin={3}>
        <Typography variant="h4">Contracts</Typography>
      </Box>
      {dataLoaded?<ContractsSummary rentersData={renters} edit={true} removeContract={removeContract} data={contracts} setContracts={setContracts} />:<TableSkeleton/>}
    </>
  )
}

export default Contracts