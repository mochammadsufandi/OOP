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

// array container 
let arrRegister = [];

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
        this.id = Math.floor(Math.random()*1000000000); 
        this.name = name;
        this.age = age;
        this.saku = saku;
    }
    
    showData () {
        const rowElement = document.createElement('tr');
        rowElement.innerHTML = `
            <td>2024648003</td>
            <td>Mochammad Dwi Putra Sufandi</td>
            <td>25</td>
            <td>100000</td>
            <td class="text-center">
                <button type="button" class="btn btn-warning">Edit</button>
                <button type="button" class="btn btn-danger">Delete</button>
            </td>
        `
    }

    saveDataArray (obj) {
        arrRegister.push(obj);
        document.dispatchEvent(new Event(RENDER_EVENT));
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
        document.dispatchEvent(new Event(SAVED_EVENT));
    }

    loadDataLocal () {
        const dataJSON = localStorage.getItem(this.name);
        const objRegister = JSON.parse(dataJSON);

        if(objRegister !== null) {
            for (const obj of objRegister) {
                arrRegister.push(obj);
            }
        }
        document.dispatchEvent(new Event(RENDER_EVENT));
    }
}

// variable for form register 
const formRegister = document.getElementById('formRegister');
formRegister.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const objRegister = new register(nameInput.value,ageInput.value,sakuInput.value);
    objRegister.saveDataArray(objRegister);

    const storageLocal = new storageSaver(LOCAL_STORAGE);
    storageLocal.saveDataLocal();
})


// For load data 
document.addEventListener(RENDER_EVENT,() => {
    const storageLocal = new storageSaver(LOCAL_STORAGE);
    storageLocal.loadDataLocal();
})

