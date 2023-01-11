function paintRecordatorios(i, element){
    if ( localStorage.getItem(`title${i}`) || localStorage.getItem(`description${i}`) )
      {
        element.addEventListener(
          'mouseover', function(){ actionMouseOver(element) }
        )
  
        element.addEventListener(
          'mouseleave', function(){ actionMouseLeave(element) }
        )
  
        element.innerText = '';
        element.classList.add('note-background');
        const p = document.createElement('p');
        p.innerText = i;
        p.classList.add('note');
        element.appendChild(p);
  
        const divReminder = document.createElement('div');
        divReminder.classList.add('reminder');
        element.appendChild(divReminder);
  
        const circle = document.createElement('div');
        circle.classList.add('circle');
        divReminder.appendChild(circle);
      }
  }

  function actionMouseOver(element){
    element.firstChild.classList.add('note-hover');
  }
  
  function actionMouseLeave(element){
    element.firstChild.classList.remove('note-hover');
  }