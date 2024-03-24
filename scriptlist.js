const LOCAL_STORAGE = 'list-register';
const RENDER_EVENT  = 'render-list-register';
const SAVED_EVENT = 'list-register';
const EDIT_REGISTER = 'edit-register';
const arrRegister = [];
const arrDelete = [];

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
                <a href="index.html"><button type="button" class="btn btn-warning" id="edit-btn">Edit</button></a>
                <button type="button" class="btn btn-danger" id="delete-btn" data-bs-toggle="modal" data-bs-target="#DeleteModal">Delete</button>
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
    }

    deleteList () {
        const deleteBtn = document.querySelectorAll('#delete-btn');

        for (const index in arrRegister) {
            deleteBtn[index].addEventListener('click', () => {
                const deleteItem = arrRegister[index];
                arrDelete[0] = deleteItem;
                console.log(deleteItem);
            })
        }
    }

    resume () {
        let sumSaku = 0;
        let sumAge = 0;
        arrRegister.forEach((obj) => {
            sumSaku += Number(obj.saku);
            sumAge += Number(obj.age);
        })
        const sakuMean = Math.round(sumSaku/arrRegister.length);
        const ageMean =  Math.round(sumAge/arrRegister.length);

        const tableResume = document.getElementById('table-resume');
        tableResume.innerHTML = '';
        const rowElement = document.createElement('tr');
        rowElement.innerHTML = `
            <td class="text-center">${sakuMean}</td>
            <td class="text-center">${ageMean}</td>`;
        tableResume.appendChild(rowElement);
       
    }
}

class register {
    constructor(id,name,age,saku) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.saku = saku;
    }
}

class deleteRegister extends register {
    // method
    findIndex () {
        for (let index in arrRegister) {
            if(arrDelete[0].id === arrRegister[index].id) {
                return index;
            }
        }
    }
    deleteReg (index) {
        arrRegister.splice(index,1);   
    }
}

// variable for storage
const storageLocal = new storageSaver(LOCAL_STORAGE);
const editStorage = new storageSaver(EDIT_REGISTER);

// variable for editing
// const dialogBoxBtn = document.getElementById()


// For loading data 
document.addEventListener('DOMContentLoaded', () => {
    const delBtn = document.getElementById('delete-button');

    delBtn.addEventListener('click', () => {
        const del = new deleteRegister(
            arrDelete[0].id,
            arrDelete[0].name,
            arrDelete[0].age,
            arrDelete[0].saku
        )
        const index = del.findIndex();
        del.deleteReg(index);
        document.dispatchEvent(new Event(SAVED_EVENT));
        location.reload();
    })
    
    document.dispatchEvent(new Event(RENDER_EVENT));
})

    

// For Saving Edit Data Register 
document.addEventListener(SAVED_EVENT, ()=> {
    storageLocal.saveDataLocal();
    // editStorage.editList();

}
)
// For Rendering Data
document.addEventListener(RENDER_EVENT,() => {
    setTimeout(() => {
        if (storageLocal) {
            storageLocal.loadDataLocal();
            storageLocal.showData();
            storageLocal.resume();
        }
      
        // storageLocal.editList();
        editStorage.editList();
        editStorage.deleteList();
    },2000);
})


