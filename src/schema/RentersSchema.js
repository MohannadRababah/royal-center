import { CloudDownload } from "@mui/icons-material";
import { Button } from "@mui/material";
import { v4 as uuid } from "uuid";

const schema= [
  {
    id: uuid(),
    label: "Name:",
    name: "name",
  },
  {
    id: uuid(),
    label: "Phone number:",
    name: "phone",
  },
  {
    id: uuid(),
    label: "Email:",
    name: "email",
  },
  {
    id: uuid(),
    label: "ID Document:",
    name: "idDocument",
    valueFun:(value)=> {console.log(value); return value?.idDocument?<a download={`ID for renter ${value?.name}`} target='_blank' href={value?.idDocument}><Button variant="outlined" endIcon={<CloudDownload/>}>download</Button></a>:'Document not uploaded' }
  },
  {
    id: uuid(),
    label: "Rented Properties:",
    name: "offices",
    valueFun:(data)=>{
        console.log(data,'lalalala');
        if(data)return data?.offices.map((item)=>(
            item+','
        ))
    }
  },
 
];


export default schema