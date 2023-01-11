function verifyLocalStorage(i){
    let response = [];
    const title = localStorage.getItem(`title${i}`);
    const description = localStorage.getItem(`description${i}`);
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