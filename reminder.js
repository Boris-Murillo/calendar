function paintRecordatorios(i, element, month, annio){
    if ( localStorage.getItem(`T-${i}-${month}-${annio}`) || localStorage.getItem(`D-${i}-${month}-${annio}`) )
      {
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
    }

    if(localStorage.getItem(`Gym-${i}-${month}-${annio}`)){
        const img = document.createElement('img');
        img.src = localStorage.getItem(`Gym-${i}-${month}-${annio}`);
        img.classList.add('bolt-img');
        element.appendChild(img);
    }
}
