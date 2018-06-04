// import 'bulma/css/bulma.css'; I put Bulma directly
import './css/main.css';


function init() {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('#'+burger.dataset.target);
    burger.addEventListener('click', function() {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
}


init();
