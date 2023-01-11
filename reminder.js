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
        let p = document.createElement('p');
        p.innerText = i;
        p.classList.add('note');
        element.appendChild(p);
  
        let divsito = document.createElement('div');
        divsito.classList.add('recordatorio');
  
        let div2 = document.createElement('div');
        div2.classList.add('circle');
        divsito.appendChild(div2);
        element.appendChild(divsito);
      }
  }

  function actionMouseOver(element){
    element.firstChild.classList.add('note-hover');
  }
  
  function actionMouseLeave(element){
    element.firstChild.classList.remove('note-hover');
  }