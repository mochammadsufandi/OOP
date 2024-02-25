const LOCAL_STORAGE = 'list-register';
const RENDER_EVENT  = 'render-list-register';
const SAVED_EVENT = 'list-register';
const EDIT_REGISTER = 'edit-register';
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
                <a href="#"><button type="button" class="btn btn-warning" id="edit-btn">Edit</button></a>
                <button type="button" class="btn btn-danger">Delete</button>
            </td>`
            tableContent.appendChild(rowElement);
        })
    }

    editList () {
        const trTable = document.querySelectorAll('#edit-btn');
        let registerEdit = [];
        
        for (const index in arrRegister) {
            trTable[index].addEventListener('click',()=> {
                registerEdit.push(arrRegister[index]);
                const parsed = JSON.stringify(registerEdit);
                localStorage.setItem(this.name,parsed);
                console.log(registerEdit);
            })
        }
        registerEdit = [];
        // document.dispatchEvent(new Event(RENDER_EVENT));
        
    }

    editProcess () {
       


    }
}

// class register {
//     constructor (name,age,saku) {
//         // this.id = +new Date(); 
//         this.name = name;
//         this.age = age;
//         this.saku = saku;
//     }

    
// }

const storageLocal = new storageSaver(LOCAL_STORAGE);
const editStorage = new storageSaver(EDIT_REGISTER);


// For loading data 
document.addEventListener('DOMContentLoaded', () => {
    document.dispatchEvent(new Event(RENDER_EVENT));
    document.dispatchEvent(new Event(SAVED_EVENT));
    
})

// For Saving Edit Data Register 
document.addEventListener(SAVED_EVENT, ()=> {
    editStorage.editList();
}
)
// For Rendering Data
document.addEventListener(RENDER_EVENT,() => {
    setTimeout(() => {
        if (storageLocal) {
            storageLocal.loadDataLocal();
            storageLocal.showData();
        }
      
        // storageLocal.editList();
        editStorage.editList();
    },2000);
    
    
    // arrRegister = [];
})

// For Editing List Register
