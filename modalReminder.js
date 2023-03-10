function showModal(event, month, annio){
    const modal = document.createElement("div");
    modal.classList.add("modal");
    document.querySelector("body").appendChild(modal);

    const close = document.createElement("div");
    close.classList.add('container-button-close');
    close.innerHTML = '<img src="icons/close.svg" id="close" alt="close" />';
    modal.appendChild(close);

    const inputTitle = document.createElement('input');
    inputTitle.placeholder = 'Title';
    inputTitle.classList.add('title');
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Description';
    textarea.classList.add('description');

    let response = verifyLocalStorage(event.firstChild.innerHTML, month, annio);
    if(response){
      inputTitle.value = response['title'] ? response['title'] : '';
      textarea.innerText = response['description'] ? response['description'] : '';
    }

    const divForm = document.createElement('div');
    divForm.classList.add('form');
    divForm.appendChild(inputTitle);
    divForm.appendChild(textarea);
    modal.appendChild(divForm);

    const divButton = document.createElement('div');
    const button = document.createElement('button');
    button.classList.add('button_save');
    button.innerText = 'Save';
    divButton.appendChild(button);
    modal.appendChild(divButton);
  
    document.querySelector(".wrapper").classList.add("wrapper_opacity");
    document.querySelector(".year").classList.add("wrapper_opacity");
    document.querySelector(".bolt").classList.add("wrapper_opacity");
    document.querySelector(".modal").classList.add("modal_show"); 

    document.querySelector('#close')?.addEventListener(
      'click', () => {
        closeModal();
      }
    )

    document.querySelector('.button_save')?.addEventListener(
      'click', () => {
        const title = document.querySelector('.title').value;
        const description = document.querySelector('.description').value;
        title.trim();
        description.trim();
        if(title || description){
          numberDay = event.innerHTML.split('<')[0];
          localStorage.setItem(`T-${numberDay}-${month}-${annio}`, title);
          localStorage.setItem(`D-${numberDay}-${month}-${annio}`, description);
          paintRecordatorios(numberDay, event, month, annio);
          alert('successfully saved');
        }
        closeModal();
      }
    )
}

function closeModal(){
  document.querySelector(".modal").remove();
  document.querySelector(".wrapper").classList.remove("wrapper_opacity");
  document.querySelector(".year").classList.remove("wrapper_opacity");
  document.querySelector(".bolt").classList.remove("wrapper_opacity");
}