import { Alert } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import ContractsSummary from "../Components/ContractsSummary"


const OldContracts = () => {

  const [contracts, setContracts] = useState([])
  const [renters, setRenters] = useState([])
  const [errMsg, setErrMsg] = useState('')




  useEffect(() => {
    axios
      .get("http://localhost:3001/get_Old_Contracts")
      .then((res) => {
        if (res.data.success) {
          console.log(res);
          setContracts(res.data.data);
          setErrMsg('')
        }
        else{
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
      <ContractsSummary rentersData={contracts} edit={false} data={contracts} />
    </>
  )
}

export default OldContracts