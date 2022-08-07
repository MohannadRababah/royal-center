import { Alert, Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import ContractsSummary from "../Components/ContractsSummary"


const Contracts = () => {

  const [contracts, setContracts] = useState([])
  const [owners, setOwners] = useState(['ahmad', 'mohammad'])
  const [renters, setRenters] = useState([])
  const [errMsg, setErrMsg] = useState('')



  const removeContract = (officeNumber) => {
    console.log(officeNumber);
    axios
      .post("https://pure-meadow-98451.herokuapp.com/deleteContract", { officeNumber: officeNumber })
      .then((res) => {
        console.log(res, 'res::removeContract');
        if (res.data.success) {
          axios
            .get("https://pure-meadow-98451.herokuapp.com/get_Contracts")
            .then((res) => {
              console.log(res);
              setContracts(res.data.data);
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
      .get("https://pure-meadow-98451.herokuapp.com/get_Contracts")
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




    axios.get('https://pure-meadow-98451.herokuapp.com/get_Renters').then(response => {
      if (response.data.success) {
        setRenters(response.data.data)
        setErrMsg('')
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
      <ContractsSummary rentersData={renters} edit={true} removeContract={removeContract} data={contracts} setContracts={setContracts} />
    </>
  )
}

export default Contracts