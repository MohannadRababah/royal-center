import axios from "axios"
import { utils, writeFile } from "xlsx";



const createBackUp=async()=>{
    var a=await axios.post('https://pure-meadow-98451.herokuapp.com/createBackUp', {token :localStorage.getItem('token')}).then(res => {
        if(res.data.message==='user is not verified'){
            window.location.assign('/')
            return
        }
        console.log(res);
        var text=new Text()
        var workBook = utils.book_new()
        var worksheet = utils.json_to_sheet(res.data.data.Contracts)
        workBook.SheetNames.push("Contracts")
        workBook.SheetNames.push("Offices")
        workBook.SheetNames.push("RecieptNumber")
        workBook.SheetNames.push("Reciepts")
        workBook.SheetNames.push("RentersInfo")
        workBook.Sheets["Contracts"] = worksheet

        worksheet = utils.json_to_sheet(res.data.data.Offices)
        workBook.Sheets["Offices"] = worksheet

        worksheet = utils.json_to_sheet(res.data.data.RecieptNumber)
        workBook.Sheets["RecieptNumber"] = worksheet

        worksheet = utils.json_to_sheet(res.data.data.Reciepts)
        workBook.Sheets["Reciepts"] = worksheet

        worksheet = utils.json_to_sheet(res.data.data.RentersInfo)
        workBook.Sheets["RentersInfo"] = worksheet


        // (C3) TO BINARY STRING
        var xlsbin = writeFile(workBook, 'RoyalCenterBackup.xlsx', {
            bookType: "xlsx",
            type: "binary"
        })
        

        
        return res.data.data
    }).catch(err => { console.log(err, 'err retreiving backup data'); })
    return a
}

export default createBackUp