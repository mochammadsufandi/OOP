const nameInput = document.getElementById('nameInput');
const ageInput = document.getElementById('ageInput');
const sakuInput = document.getElementById('uangSaku');

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