function verifyLocalStorage(i, month, annio){
    let response = [];
    const title = localStorage.getItem(`T-${i}-${month}-${annio}`);
    const description = localStorage.getItem(`D-${i}-${month}-${annio}`);
    if(title || description){
      if(title){
        response['title'] = title;
      }
      if(description){
        response['description'] = description;
      }
    }
    return response;
  }