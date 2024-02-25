const LOCAL_STORAGE = 'list-register';
const RENDER_EVENT  = 'render-list-register';
const SAVED_EVENT = 'list-register';
const arrRegister = [];


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
                console.log(obj);
            }
        }
        // document.dispatchEvent(new Event(RENDER_EVENT));
    }

    showData () {
        let tableContent = document.getElementById('table-content');
        tableContent.innerHTML = '';
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
            </td>`
            tableContent.appendChild(rowElement);
        })
 
    }
}


const storageLocal = new storageSaver(LOCAL_STORAGE);

// For loading data 
document.addEventListener('DOMContentLoaded', () => {
    document.dispatchEvent(new Event(RENDER_EVENT));
})
// For Rendering Data
document.addEventListener(RENDER_EVENT,() => {
    setTimeout(() => {
        if (storageLocal) {
            storageLocal.loadDataLocal();
            storageLocal.showData();
        }
        
    },2000);
    
    // arrRegister = [];
})