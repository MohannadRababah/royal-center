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
    label: "id:",
    name: "idDocument",
  },
  {
    id: uuid(),
    label: "Rented offices:",
    name: "offices",
    valueFun:(data)=>{
        console.log(data,'lalalala');
        if(data)return data.map((item)=>(
            item+','
        ))
    }
  },
 
];


export default schema