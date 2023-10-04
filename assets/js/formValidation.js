const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const userName = $(".user-name")
const email = $(".email")
const password = $(".password")
const retypePassword = $(".retype-password")
const userNameLogin = $(".user-name-login")
const passwordLogin = $(".password-login")
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const regexStr = /^(?=.{6,20}$)[a-zA-Z0-9._]+$/
const listAccount = JSON.parse(localStorage.getItem("user")) || [];
// //Focus box-shadow
$$("input").forEach(item => {
    item.addEventListener("focus", () => {
        $(".wrapper").style = "box-shadow: 0 0 10px 0 #f5f5f5 , 0 0 30px 0 #dadada ,0 0 10px 0 #fff"
    })
    item.addEventListener("blur", () => {
        $(".wrapper").style = "box-shadow: none";
    })
})
const validateInput = (valueInput, regex) => {
    if (regex.test(valueInput.value)) {
        valueInput.style = "border: none"
        return true
    } else {
        valueInput.style = "border: 1px solid red"
        return false
    }
}
const validateUserName = () => {
    const isValid = validateInput(userName, regexStr)
    return isValid
}
const validateEmail = () => {
    const isValid = validateInput(email, regexEmail)
    return isValid
}
const validatePassword = () => {
    const isValid = validateInput(password, regexStr)
    return isValid
}
const validateRetypePassword = () => {
    if (retypePassword.value == password.value && password.value != "") {
        retypePassword.style = "border : none"
        return true
    } else {
        retypePassword.style = "border : 1px solid red"
        return false
    }
}
const validateAll = () => {
    const isValidUserName = validateUserName()
    const isValidEmail = validateEmail()
    const isValidPassword = validatePassword()
    const isValidRetypePassword = validateRetypePassword()
    return (isValidUserName && isValidEmail && isValidPassword && isValidRetypePassword)
}
const handleCloseNotice = () => {
    $(".notice-success").style.display = "none"
}
const handleNoticeSuccess = (textNotice) => {
    $(".notice-success").style.display = "flex";
    $(".main-success p").innerText = textNotice
    $(".main-success p").style.color = "#000"
    $(".main-success i").setAttribute("class", "fa-regular fa-circle-check tick")
}
const handleNoticeError = (textNotice) => {
    $(".notice-success").style.display = "flex";
    $(".main-success p").innerText = textNotice
    $(".main-success p").style.color = "red"
    $(".main-success i").setAttribute("class", "fa-solid fa-exclamation error")
}
const handleCurrentUser = (data) => {
    localStorage.setItem("currentUser", JSON.stringify(data))
}
const hanleRegiter = () => {
    if (validateAll()) {
        const user = listAccount.some(users => users.userName == userName.value)
        const Email = listAccount.some(emails => emails.email == email.value)
        if (user) {
            handleNoticeError("Tên đăng nhập đã tồn tại")
        } else if (Email) {
            handleNoticeError("Email đã tồn tại")
        } else {
            handleNoticeSuccess("Đăng ký thành công")
            const data = {
                userName: userName.value,
                email: email.value,
                password: password.value,
                order: [],
                main: {}
            }
            listAccount.push(data)
            handleCurrentUser(data)
            setTimeout(() => {
                window.location.href = "../index.html"
                $(".notice-success").style.display = "none"
            }, 2000)
        }
    }
    localStorage.setItem("user", JSON.stringify(listAccount))
}

const handleLogin = () => {
    const user = listAccount.find(users => users.userName == userNameLogin.value && users.password == passwordLogin.value)
    if (user) {
        handleNoticeSuccess("Đăng nhập thành công")
        handleCurrentUser(user)
        setTimeout(() => {
            window.location.href = "../index.html"
            $(".notice-success").style.display = "none"
        }, 2000)
    } else {
        handleNoticeError("Tài khoản hoặc mật khẩu sai")
    }
}
const formValidate = () => {
    userName.addEventListener("input", validateUserName)
    email.addEventListener("input", validateEmail)
    password.addEventListener("input", validatePassword)
    retypePassword.addEventListener('input', validateRetypePassword)
}
$(".close-notice").addEventListener("click", handleCloseNotice)
if ($(".btn-login")) {
    $(".btn-login").addEventListener("click", handleLogin)
    if ($(".btn-register")) {
        $(".btn-register").removeEventListener("click", hanleRegiter)
    }
} else {
    formValidate()
    $(".btn-register").addEventListener("click", hanleRegiter)
    if ($(".btn-login")) {
        $(".btn-login").removeEventListener("click", handleLogin)
    }
}