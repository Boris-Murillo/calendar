function paintRecordatorios(i, element, month, annio){
    if ( localStorage.getItem(`T-${i}-${month}-${annio}`) || localStorage.getItem(`D-${i}-${month}-${annio}`) )
      {
        element.addEventListener(
          'mouseover', function(){ actionMouseOver(element) }
        )
  
        element.addEventListener(
          'mouseleave', function(){ actionMouseLeave(element) }
        )

        element.innerText = '';
        const p = document.createElement('p');
        p.innerText = i;

        if(element.classList.contains('today')){
            p.classList.add('note-today');
        }else if(element.classList.contains('holiday')){
            p.classList.add('note-holiday');
        }else{
            element.classList.add('note-background-gray');
            p.classList.add('note');
        }
        
        element.classList.add('note-background');
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