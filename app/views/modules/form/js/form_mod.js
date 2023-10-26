if(document.querySelector(".form")){
    let errorModal = document.querySelector(".form-error")
    let loaderModal = document.querySelector(".loader")
    let successModal = document.querySelector(".form-success")
    const url = '/info';
    let formBtnArr = document.querySelectorAll(".form .btn")
    for(let i=0; i<formBtnArr.length;i++){
        formBtnArr[i].addEventListener("click",(evt)=>{
            evt.preventDefault()
        })
    }

    let btnsArr = document.querySelectorAll(".form-btn")
    for(let i=0; i<btnsArr.length;i++){
        btnsArr[i].addEventListener("click",()=>{
            btnsArr[i].classList.toggle("form-btn-selected")
        })
    }

    let tabsBtnArr = document.querySelectorAll(".form__tab")
    function clearTabsState (){
        for(let j=0; j<tabsBtnArr.length;j++){
            tabsBtnArr[j].classList.remove("form__tab-selected")
        }
    }
    for(let i=0; i<tabsBtnArr.length;i++){
        tabsBtnArr[i].addEventListener("click",()=>{
            clearTabsState ()
            tabsBtnArr[i].classList.add("form__tab-selected")
        })
    }
    function showSlider() {
        loaderModal.classList.add('loader-opened');
      }
    // Функция для скрытия слайдера и отображения модального окна успеха
    function showSuccessModal() {
    loaderModal.classList.remove('loader-opened');
    successModal.classList.add('opened');
    }
    
    // Функция для скрытия слайдера и отображения модального окна ошибки
    function showErrorModal() {
    loaderModal.classList.remove('loader-opened');
    errorModal.classList.add('opened');
    }

    let btnSendForm = document.querySelector(".form-btn-send")
    btnSendForm.addEventListener("click", ()=>{
        //category
        let selectedBtn = document.querySelectorAll(".form-btn-selected")
        let category = []
        if(selectedBtn.length == 0){
            alert("Выберите категорию, которая Вас интересует")
        }
        else {
            for(let i=0;i<selectedBtn.length;i++){
                let item = selectedBtn[i].textContent
                category.push(item)
            }
        }
        //inputs
            //name
            let name =""
            //phone
            let phone=""
            //email
            let email=""
            //coments
            let comments=""
        //money
        let money = ""
        let selectedTab = document.querySelector(".form__tab-selected")
        if(selectedTab == null){
            alert("Выберите бюджет")
        }
        else {
            money = selectedTab.textContent
        }
        //file
        let file = ""
        //Подготовка запроса
        const formData = new FormData();
        formData.append('category', category);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('comments', comments);
        formData.append('money', money);
        formData.append('file', file);
        const options = {
            method: 'POST',
            body: formData,
          };
        fetch(url, options)
        .then(response => {
            if (response.ok) {
            showSlider(); // Отображение слайдера при ожидании ответа
            return response;
            } else {
            throw new Error('Error');
            }
        })
        .then(response => {
            showSuccessModal(); // Отображение модального окна успеха при получении ответа с кодом 200
        })
        .catch(error => {
            console.log(error);
            showErrorModal(); // Отображение модального окна ошибки при получении ответа с ошибкой
        });
    })
}