const nameInput = document.getElementById('nameInput');
const ageInput = document.getElementById('ageInput');
const sakuInput = document.getElementById('uangSaku');
const checkBox = document.getElementById('Check1');


// variable for event to save data in localstorage
const SAVED_EVENT = 'saved-list-register';
// variable for event to load data
const RENDER_EVENT = 'render-list-register';
// variable for name of local storage
const LOCAL_STORAGE = 'list-register';
// variable for editing register
const EDIT_REGISTER = 'edit-register';

// array container 
let arrRegister = [];

// Variable for editing container
const editContainer = [];

nameInput.addEventListener('keyup', () => {
    const formRequirement = document.querySelectorAll('#form-requirement');
    const parent = formRequirement[0].querySelector('span');
    parent.innerHTML = nameInput.value.length;
});

ageInput.addEventListener('keyup', () => {
    const formRequirement = document.querySelectorAll('#form-requirement');
    const parent = formRequirement[1].querySelector('span');
    parent.innerHTML = ageInput.value   ;
});

sakuInput.addEventListener('keyup', () => {
    const formRequirement = document.querySelectorAll('#form-requirement');
    const parent = formRequirement[2].querySelector('span');
    parent.innerHTML = sakuInput.value;
})

class register {
    constructor (name,age,saku) {
        this.id = +new Date(); 
        this.name = name;
        this.age = age;
        this.saku = saku;
    }
    
    showData () {
        arrRegister.forEach((obj) => {
            const rowElement = document.createElement('tr');
            rowElement.innerHTML = `
            <td>${obj.id}</td>
            <td>${obj.name}</td>
            <td>${obj.age}</td>
            <td>${obj.saku}</td>
            <td class="text-center">
                <button type="button" class="btn btn-warning">Edit</button>
                <button type="button" class="btn btn-danger">Delete</button>
            </td>
        `
        })
    }

    saveDataArray (obj) {
        arrRegister.push(obj);
        // document.dispatchEvent(new Event(RENDER_EVENT));
    }
}

// Subclass for Editing Register
class EditRegister extends register {
    constructor(name,age,saku) {
        super(name,age,saku);
        this.id = editContainer[0].id;
    }

    // method
    findIndex() {
        for (let index in arrRegister) {
            if(editContainer[0].id === arrRegister[index].id) {
                return index;
            }
        }
    }

    changeArrRegister(obj,index) {
        // const index = this.findIndex();
        arrRegister[index] = obj;
    }

}

// create a class for saving data in local storage
class storageSaver {
    constructor (name) {
        this.name = name;
    }

    // method
    saveDataLocal () {
        const parsed = JSON.stringify(arrRegister);
        localStorage.setItem(this.name,parsed);
        // document.dispatchEvent(new Event(SAVED_EVENT));
    }

    loadDataLocal () {
        const dataJSON = localStorage.getItem(this.name);
        const objRegister = JSON.parse(dataJSON);
      
        if(objRegister !== null) {
            for (const obj of objRegister) {
                arrRegister.push(obj);
                console.log(arrRegister);
            }
        }
    }
    loadDataEdit () {
        const dataJSON = localStorage.getItem(this.name);
        const editData = JSON.parse(dataJSON);
        const editBtn = document.getElementById('edit-button');
        const submitBtn = document.getElementById('submit');

        
        if (editData !== null) {
            for (const objEdit of editData) {
                editContainer.push(objEdit);
                console.log(objEdit);
            }
            editBtn.classList.add('active');
            submitBtn.classList.add('inactive');
            nameInput.value = editContainer[0].name;
            ageInput.value = editContainer[0].age;
            sakuInput.value = editContainer[0].saku;
        }
        else {
            editBtn.classList.remove('active');
            submitBtn.classList.remove('inactive');
        }
        
    }
    deleteEditLocal () {
        localStorage.removeItem(this.name);
    }
}

// variable for form register 
const storageLocal = new storageSaver(LOCAL_STORAGE);
const editStorage = new storageSaver(EDIT_REGISTER);



const linkToList = document.getElementById('link-to-list');
linkToList.addEventListener('click', () => {
    document.dispatchEvent(new Event(SAVED_EVENT));
})


// For saving data
document.addEventListener(SAVED_EVENT, () => {
    storageLocal.saveDataLocal();
    editStorage.deleteEditLocal();
})

// For loading data 
document.addEventListener('DOMContentLoaded', () => {
    const formRegister = document.getElementById('formRegister');
    formRegister.addEventListener('submit', (ev) => {
         
        // menghapus edit register data di local storage
        // const editBtn = document.getElementById('edit-button');
        if (editContainer[0] !== undefined) {
            const objEditRegister = new EditRegister(nameInput.value,ageInput.value,sakuInput.value);
            const index = objEditRegister.findIndex();
            objEditRegister.changeArrRegister(objEditRegister,index);
        }
            // document.dispatchEvent(new Event(SAVED_EVENT));
        else {
            ev.preventDefault();
            const objRegister = new register(nameInput.value,ageInput.value,sakuInput.value);
            objRegister.saveDataArray(objRegister);
        }
        formRegister.reset();
        document.dispatchEvent(new Event(SAVED_EVENT));
        
        
    })
    document.dispatchEvent(new Event(RENDER_EVENT));
})
// For Rendering Data
document.addEventListener(RENDER_EVENT,() => {
    storageLocal.loadDataLocal();
    editStorage.loadDataEdit();

    // arrRegister = [];
})

