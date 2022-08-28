import { Alert, Box, CircularProgress, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import ContractsSummary from "../Components/ContractsSummary"
import TableSkeleton from "../Components/TableSkeleton";


const Contracts = () => {

  const [contracts, setContracts] = useState([])
  const [owners, setOwners] = useState(['ahmad', 'mohammad'])
  const [renters, setRenters] = useState([])
  const [errMsg, setErrMsg] = useState('')
  const [dataLoaded, setDataLoaded] = useState(false);
  const [expiredContracts, setExpiredContracts] = useState(false);
  const nav = useNavigate()



  const removeContract = (officeNumber) => {
    console.log(officeNumber);
    setDataLoaded(false)
    axios
      .post("https://pure-meadow-98451.herokuapp.com/deleteContract", { officeNumber: officeNumber, token: localStorage.getItem('token') })
      .then((res) => {
        if (res.data.message === 'user is not verified') {
          nav('/')
          return
        }
        console.log(res, 'res::removeContract');
        if (res.data.success) {
          axios
            .post("https://pure-meadow-98451.herokuapp.com/get_Contracts", { token: localStorage.getItem('token') })
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

  const renewContract = (office) => {
    console.log(office);
    setDataLoaded(false)
    axios
      .post("https://pure-meadow-98451.herokuapp.com/renewContract", {
        officeNumber:office.officeNumber,
        startDate:office.startDate,
        endDate:office.endDate,
        token: localStorage.getItem('token'),

      })
      .then((res) => {
        if (res.data.message === 'user is not verified') {
          nav('/')
          return
        }
        console.log(res, 'res::removeContract');
        if (res.data.success) {
          axios
            .post("https://pure-meadow-98451.herokuapp.com/get_Contracts", { token: localStorage.getItem('token') })
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
      .post("https://pure-meadow-98451.herokuapp.com/get_Contracts", { token: localStorage.getItem('token') })
      .then((res) => {
        if (res.data.message === 'user is not verified') {
          nav('/')
          return
        }
        if (res.data.success) {
          ///add axios call to get documents and send it with contracts

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




    axios.post('https://pure-meadow-98451.herokuapp.com/get_Renters', { token: localStorage.getItem('token') }).then(response => {
      if (response.data.message === 'user is not verified') {
        nav('/')
      }
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


  // useEffect(() => {

  // }, [expiredContracts])

  const filterContracts = (contracts) => {
    let a = []
    var tempDate = new Date()
    if (expiredContracts) {
      contracts.map((contract) => {
        var tempContractDate = new Date(contract.endDate.slice(6, contract.endDate.length), contract.endDate.slice(3, 5), contract.endDate.slice(0, 2))
        if (tempContractDate <= tempDate) {
          a.push(contract)
        }
      })
    }
    else {

      contracts.map((contract) => {
        var tempContractDate = new Date(contract.endDate.slice(6, contract.endDate.length), contract.endDate.slice(3, 5), contract.endDate.slice(0, 2))
        if (tempContractDate > tempDate) {
          a.push(contract)
        }
      })
    }

    return a
  }

  return (
    <Box >
      {errMsg && <Alert variant='outlined' severity="error">{errMsg}</Alert>}
      <Box textAlign='center' margin={3}>
        <Typography variant="h4" color="black">العقود</Typography>
      </Box>
      <ToggleButtonGroup sx={{ display: 'flex', justifyContent: 'center' }} value={expiredContracts ? 'expiredContracts' : 'activeContracts'}>
        <ToggleButton onClick={() => { setExpiredContracts(false) }} value={'activeContracts'}>
          العقود الفعالة
        </ToggleButton>
        <ToggleButton onClick={() => { setExpiredContracts(true) }} value={'expiredContracts'}>
          العقود المنتهية
        </ToggleButton>
      </ToggleButtonGroup>
      {dataLoaded ? <ContractsSummary rentersData={renters} edit={true} removeContract={removeContract} data={filterContracts(contracts)} setContracts={setContracts} renewContract={renewContract} /> :
        <CircularProgress
          size="15rem"
          style={{
            marginTop: '100px',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: '#999696'
          }}
        />}
    </Box>
  )
}

export default Contracts