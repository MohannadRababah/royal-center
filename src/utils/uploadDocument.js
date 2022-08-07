
const uploadDocument = (file) => {
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

export default uploadDocument