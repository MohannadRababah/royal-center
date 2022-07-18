import axios from "axios";
import { useEffect, useState } from "react"
import ContractsSummary from "../Components/ContractsSummary"


const Contracts=()=>{

    const [contracts,setContracts]=useState([])


    const removeContract=(officeNumber)=>{
      console.log(officeNumber);
      axios
        .post("http://localhost:3001/deleteContract", { officeNumber: officeNumber })
        .then((res) => {
          axios
            .get("http://localhost:3001/get_Contracts")
            .then((res) => {
              console.log(res);
              setContracts(res.data.data);
            })
            .catch((err) => {
              console.log(err.message);
            });
        })
        .catch((err) => {
          console.log(err.message);
        });
  }



    useEffect(() => {
        axios
          .get("http://localhost:3001/get_Contracts")
          .then((res) => {
            console.log(res);
            setContracts(res.data.data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, []);
    
    return  (
        <ContractsSummary show={false} removeContract={removeContract} data={contracts}/>
    )
}

export default Contracts