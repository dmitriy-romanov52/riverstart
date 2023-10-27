
if(document.querySelector(".form")){
    const url = '/info';
    let errorModal = document.querySelector(".form-error")
    let loaderModal = document.querySelector(".loader")
    let successModal = document.querySelector(".form-success")

    //inputs
    let inputName = document.querySelector(".form__input-name")
    let inputPhone = document.querySelector(".form__input-phone")
    let inputEmail = document.querySelector(".form__input-email")
    let inputComments = document.querySelector(".form__input-txt")

    let nameValue = ""
    let phoneValue = ""
    let emailValue = ""
    let commentsValue = ""

    inputName.addEventListener("input",(e)=>{
       
        nameValue = e.target.value
    })
    inputPhone.addEventListener("input",(e)=>{
       
        phoneValue = e.target.value
    })
    inputEmail.addEventListener("input",(e)=>{
       
        emailValue = e.target.value
    })
    inputComments.addEventListener("input",(e)=>{
       
        commentsValue = e.target.value
    })

    function clearInputs (){
        inputName.value = ""
        inputPhone.value = ""
        inputEmail.value = ""
        inputComments.value = ""
    }
    //btns
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
    function clearBtnState (){
        for(let i=0; i<btnsArr.length;i++){
            btnsArr[i].classList.remove("form-btn-selected")
        }
    }
    //tabs
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
    //file 
    var fileInput = document.querySelector('.form__file input');
    fileInput.addEventListener('change', handleFileValidation);

    function handleFileValidation(event) {
    var file = event.target.files[0];
    var isValid = validateFile(file);

    if (isValid) {
        fileInput.classList.remove('error');
        fileInput.classList.add('file-selected');
        console.log('Файл валиден:', file.name);
    } else {
        fileInput.classList.add('error');
        fileInput.classList.remove('file-selected');
        alert('Файл невалиден:', file.name)
    }
    }

    function validateFile(file) {
    var fileSize = file.size;
    var fileExtension = file.name.split('.').pop().toLowerCase();

    var allowedExtensions = ['doc', 'docx', 'pdf'];
    var maxSize = 10 * 1024 * 1024; // 10MB

    if (fileSize > maxSize) {
        return false;
    }

    if (!allowedExtensions.includes(fileExtension)) {
        return false;
    }

    return true;
    }
    //Loader
    function showLoader() {
        loaderModal.classList.add('loader-opened');
      }
    // Функция для скрытия лоадера и отображения модального окна успеха
    function showSuccessModal() {
    loaderModal.classList.remove('loader-opened');
    successModal.classList.add('form-success-opened');
    }
    // Функция для скрытия лоадера и отображения модального окна ошибки
    function showErrorModal() {
    loaderModal.classList.remove('loader-opened');
    errorModal.classList.add('form-error-opened');
    }

    //close error and success
    let successModalClose = successModal.querySelector(".form-success-close")
    let errorModalClose = errorModal.querySelector(".form-error-close")
    let repeatSendForm = errorModal.querySelector(".form-error-btn")
    successModalClose.addEventListener("click",()=>{
        successModal.classList.remove("form-success-opened")
    })
    errorModalClose.addEventListener("click",()=>{
        errorModal.classList.remove("form-error-opened")
    })

    //send-form
    function sendForm (){
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
            let name = nameValue
            //phone
            let phone= phoneValue
            //email
            let email= emailValue
            //coments
            let comments= commentsValue
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
        let selectedFile = ""
        
        //Подготовка запроса
        const formData = new FormData();
        formData.append('category', category);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('comments', comments);
        formData.append('money', money);
        formData.append('file', selectedFile);

        const options = {
            method: 'POST',
            body: formData,
        };

        fetch(url, options)
        .then(response => {
            if (response.ok) {
            showLoader(); // Отображение слайдера при ожидании ответа
            return response;
            } else {
            throw new Error('Error');
            }
        })
        .then(response => {
            showSuccessModal(); // Отображение модального окна успеха при получении ответа с кодом 200
            clearTabsState ()
            clearBtnState ()
            clearInputs()
        })
        .catch(error => {
            console.log(error);
            showErrorModal(); // Отображение модального окна ошибки при получении ответа с ошибкой
        });
    }
    let btnSendForm = document.querySelector(".form-btn-send")
    btnSendForm.addEventListener("click", ()=>{
        sendForm()
    })
    repeatSendForm.addEventListener("click", ()=>{
        sendForm()
    })
}

if(document.querySelector(".mySwiper")){
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        spaceBetween: 16,
        initialSlide: 0,
        centeredSlides: true,
        allowTouchMove: isSmallScreen(),
        loop: false,
        loopAdditionalSlides: 2,
        loopedSlides: 3, // настройте это значение, исходя из количества отображаемых слайдов
        navigation: {
          prevEl: ".slider .prev-slide",
          nextEl: ".slider .next-slide",
        },
      });
      
      function isSmallScreen() {
        return window.innerWidth < 1200;
      }
      
      window.addEventListener("resize", function() {
        swiper.params.allowTouchMove = isSmallScreen();
        swiper.update();
      });
}