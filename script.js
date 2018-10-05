const main = document.getElementsByClassName('container')[0];
const form = document.getElementsByClassName('main__form')[0];
const input = form.querySelector('input');
const submitButton = form.querySelector('button');
const ul = document.getElementsByClassName('main__list')[0];

const listFilter = document.createElement('div');
const filterCheckbox = document.createElement('input');
filterCheckbox.type = 'checkbox';
const filterLabel = document.createElement('span');
filterLabel.textContent = 'Hide finished tasks';

listFilter.appendChild(filterCheckbox);
listFilter.appendChild(filterLabel);
listFilter.classList = 'list__filter';
main.insertBefore(listFilter, form);    

// 
filterCheckbox.addEventListener('change', (ev) => {
    const checkbox = ev.target;
    const isChecked = checkbox.checked;
    const list = ul.children;
    console.log(list);
    
        if(isChecked){
            for (let i = 0 ; i < list.length ; i ++){
                let lis = list[i]
                if(lis.className === "list__item list__item--checked"){
                    lis.style.display = 'none';
                } else {
                    lis.style.display = '';
                }
            }
        } else { 
            for (let i = 0 ; i < list.length ; i ++){
                let lis = list[i]
                lis.style.display = '';
            }
        }
});

function createLi(text) {   

    // Adding items to list
    const li = document.createElement('li'); 
    li.classList = 'list__item';

    const liText = document.createElement('div');
    const span = document.createElement('span');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';


    // checkbox and label wrapper

    span.textContent = text;
    liText.appendChild(span);
    liText.appendChild(checkbox);
    liText.classList = 'list__text';
    li.appendChild(liText);

    // buttons wrapper
    const buttons = document.createElement('div');
    buttons.classList = 'list__buttons';

    // Adding edit button to list item
    const edit = document.createElement('button');
    edit.textContent ='edit';    
    edit.classList ='buttons__edit';
    buttons.appendChild(edit);

    // Adding remove button to list item
    const remove = document.createElement('button');
    remove.textContent ='remove';    
    remove.classList ='buttons__remove';
    buttons.appendChild(remove);

    li.appendChild(buttons);

    return li;
}

// Form Submitting Event
form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    // Capturing input value
    const text = input.value;    
    input.value = '';
    const li = createLi(text);
    ul.appendChild(li);
    
});

// Bubbling through list to add class when list item is checked
ul.addEventListener('change', (ev) => {
    const checkbox = ev.target;
    const checked = checkbox.checked;
    const li = checkbox.parentNode.parentNode;
    
    if(checked) {
        li.classList.add('list__item--checked');
    } else {
        li.className = 'list__item';
    }
});

// Bubbling through list remove list item event
ul.addEventListener('click', (ev) => {
    if (ev.target.tagName === 'BUTTON'){
        const li = ev.target.parentNode.parentNode;
        const ul = li.parentNode;

        if(ev.target.textContent === 'remove'){
            ul.removeChild(li);   
        } else if (ev.target.textContent === 'edit'){
            const list = li.firstChild;
            const span  = li.firstChild.firstChild;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.textContent;            
            list.insertBefore(input, span);
            ev.target.textContent = 'save';
            list.removeChild(span);
        }   else if (ev.target.textContent === 'save'){
            const list = li.firstChild;
            const input  = li.firstChild.firstChild;
            const span = document.createElement('span');
            span.textContent = input.value ;            
            list.insertBefore(span, input);
            ev.target.textContent = 'edit';
            list.removeChild(input); 
        }
    }
});