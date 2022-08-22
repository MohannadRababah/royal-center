
const uploadDocument =async (file,multiple=false) => {
  if (multiple) {
    var imagesArray=[]
    for(var i=0;i<file.length;i++){
      imagesArray.push(await new Promise((resolve) => {
        var reader = new FileReader();
        reader?.readAsDataURL(file[i]);
        reader.onloadend = () => {
          
          var base64String = reader?.result;
          console.log(base64String);
           return resolve(base64String);
        }
    
      })
      )
    }
    console.log(imagesArray,'array');
    return imagesArray
  } 
  else {
    return new Promise((resolve) => {
      var reader = new FileReader();
      reader?.readAsDataURL(file);
      reader.onloadend = () => {

        var base64String = reader?.result;
        console.log(base64String);
        return resolve(base64String);
      }

    })
  }

}

export default uploadDocument