const pageName = document.querySelector('.pageName');
const syncPageName = document.getElementById('syncPage');
syncPageName.textContent = pageName.textContent;

const navigation = document.querySelector('.nav');
const mainContent = document.querySelector('.mainContent');
let btnMenu = document.getElementById('ham-btn');

btnMenu.addEventListener('click', () => {
    btnMenu.classList.toggle('show');
    navigation.classList.toggle('drop');
    mainContent.classList.toggle('pushdown');
});

