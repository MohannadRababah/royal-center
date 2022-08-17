import { CloudDownload, CloudDownloadOutlined } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { v4 as uuid } from "uuid";
import downloadDoc from "../utils/downloadDocument";

const schema = [
  {
    id: uuid(),
    label: "رقم الممتلك :",
    name: "officeNumber",
  },
  {
    id: uuid(),
    label: "تاريخ بداية العقد :",
    name: "startDate",
  },
  {
    id: uuid(),
    label: "تاريخ نهاية العقد :",
    name: "endDate",
  },
  {
    id: uuid(),
    label: "قيمة العقد الكلية :",
    name: "totalPayment",
  },
  {
    id: uuid(),
    label: "عدد الدفعات :",
    name: "paymentPeriod",
  },
  {
    id: uuid(),
    label: "قيمة الدفعه الواحدة :",
    name: "eachPayment",
    attFun: (item) => {
      return (parseInt(item.totalPayment) / parseInt(item.paymentPeriod)).toFixed(3)
    }
  },
  {
    id: uuid(),
    label: "عدد الدفعات المدفوعة :",
    name: "payed"
  },
  {
    id: uuid(),
    label: "تاريخ الدفعة القادمة :",
    name: "nextPayment",
    attFun: (item) => {
      var date = new Date(parseInt(item.startDate.slice(6, 10)), parseInt(item.startDate.slice(3, 5)) - 1 + (item.payed) * (12 / (item.paymentPeriod)), parseInt(item.startDate.slice(0, 3)));
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()//item.startDate.slice(0,3)+(parseInt(item.startDate.slice(3,5))+)// parseInt(totalPayment)/parseInt(paymentPeriod)paymentPeriod,payed,startDate
    }
  },
  {
    id: uuid(),
    label: "صورة عن العقد :",
    name: "contractDocument",
    attFun: (value) => {
      return value?.contractDocument ?<Button variant="outlined" endIcon={<CloudDownloadOutlined sx={{ marginRight: '10px' }} />} onClick={async() => {
        var anchor = document.createElement('a');
        anchor.href = await downloadDoc(value.contractDocument);
        anchor.download = `صورة عن عقد ممتلك رقم ${value.officeNumber}`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      }}>download</Button>: 'لم يتم رفع المستند'
      }
  },
  {
    id: uuid(),
    label: "المالك :",
    name: "owner",
  },
];

const renterFields = [
  {
    id: uuid(),
    label: "اسم المستأجر :",
    name: "name",
  },
  {
    id: uuid(),
    label: "هاتف المستأجر :",
    name: "phone",
  },
  {
    id: uuid(),
    label: "البريد الألكتروني للمستأجر :",
    name: "email",
  },
]
export { renterFields }
export default schema