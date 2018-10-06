const main = document.getElementsByClassName('container')[0];
const form = document.getElementsByClassName('main__form')[0];
const input = form.querySelector('input');
const submitButton = form.querySelector('button');
const ul = document.getElementsByClassName('main__list')[0];

// Adding filter to list
const listFilter = document.createElement('div');
const filterCheckbox = document.createElement('input');
filterCheckbox.type = 'checkbox';
const filterLabel = document.createElement('span');
filterLabel.textContent = 'Hide finished tasks';

listFilter.appendChild(filterCheckbox);
listFilter.appendChild(filterLabel);
listFilter.classList = 'list__filter';
main.insertBefore(listFilter, form);    

// Running an event bubbling through filter checkbox
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

    function createElement(elName, property, value) {
        const el = document.createElement(elName);
        el[property] = value;
        return el;
    }

    // Adding items to list
    // const li = document.createElement('li'); 
    // li.classList = 'list__item'; 
    const li = createElement('li', 'classList', 'list__item');

    // checkbox and label wrapper
    // const liText = document.createElement('div');
    // liText.classList = 'list__text';
    const liText = createElement('div', 'classList', 'list__text');
    // const span = document.createElement('span');
    // span.textContent = text;
    const span = createElement('span', 'textContent', text);
    
    // const checkbox = document.createElement('input');
    // checkbox.type = 'checkbox';
    const checkbox = createElement('input', 'type', 'checkbox');

    liText.appendChild(span);
    liText.appendChild(checkbox);
    li.appendChild(liText);

    // buttons wrapper

    // const buttons = document.createElement('div');
    // buttons.classList = 'list__buttons';
    const buttons = createElement('div', 'classList', 'list__button');

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
        const nameAction = {
            remove: () => {
                ul.removeChild(li);   
            },

            edit: () => {
                const list = li.firstChild;
                const span  = li.firstChild.firstChild;
                const input = document.createElement('input');
                input.type = 'text';
                input.value = span.textContent;            
                list.insertBefore(input, span);
                ev.target.textContent = 'save';
                list.removeChild(span);
            },

            save: () => {
                const list = li.firstChild;
                const input  = li.firstChild.firstChild;
                const span = document.createElement('span');
                span.textContent = input.value ;            
                list.insertBefore(span, input);
                ev.target.textContent = 'edit';
                list.removeChild(input); 
            }
        }

        const buttonEvent = ev.target.textContent;
        nameAction[buttonEvent]();
        // If button is remove
        // if(buttonEvent === 'remove'){
        //     nameAction.remove();

        // // If button is edit
        // } else if (buttonEvent === 'edit'){
        //     nameAction.edit();

        //     // If button is save
        // }   else if (buttonEvent === 'save'){
        //     nameAction.save();
        // }
    }
});