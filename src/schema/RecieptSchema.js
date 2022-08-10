import { v4 as uuid } from "uuid";

const schema= [
  {
    id: uuid(),
    label: "رقم الممتلك :",
    name: "officeNumber",
  },
  {
    id: uuid(),
    label: "الاسم :",
    name: "name",
  },
  
  {
    id: uuid(),
    label: "التاريخ :",
    name: "date",
  },
  {
    id: uuid(),
    label: "وذلك عن :",
    name: "desc",
  },
  {
    id: uuid(),
    label: "قيمة الدفعة :",
    name: "amount",
  },
  {
    id: uuid(),
    label: "رقم الوصل :",
    name: "recieptNumber",
  },
 
];

export default schema
