class popup {
    constructor() {
        this.height = 5;
        this.padding = 5;
    }
    messageInElement(element, message, timeout = 3) {
        const aq = document.createElement("div");
        const sp = document.createElement("span");
        aq.classList.add("popupJS");
        sp.innerHTML = message;
        aq.appendChild(sp);
        aq.style["top"] = this.height + "px";
        element.appendChild(aq);
        this.height += (this.padding + aq.clientHeight);
        setTimeout(() => {
            this.height = this.height - (this.padding + aq.clientHeight);
            aq.remove();
        }, timeout * 1000);
    }
}


// get control
const sections = document.querySelectorAll(".Section");
const SecBtns = document.querySelectorAll(".secBtns");

// prepare
let nowSec = 0;
const displayType = "block";
function setSectionStat() {
    for (let i = 0; i < sections.length; i++) {
        if (nowSec === i) {
            sections[i].style['display'] = i == 1 ? "flex" : displayType;
        } else {
            sections[i].style['display'] = "none";
        }
    }
}

// execute
setSectionStat();
for (let i = 0; i < SecBtns.length; i++) {
    SecBtns[i].onclick = () => {
        nowSec = i;
        setSectionStat();
    }
}

//// get control of section 2 items
if (document.getElementById("SignPage")) {
    const s2 = document.getElementById("s2");
    if (window.innerWidth > innerHeight) s2.style["backgroundImage"] = "url('wallpaper.jpg')"; else s2.style["backgroundImage"] = "url('wallpaperMob.jpg')";
    const goLogin = document.querySelector("#goLogin");
    const goSign = document.querySelector("#goSign");
    const pagesSigns = [document.querySelector("#Home"), document.querySelector("#SignUp"), document.querySelector("#Login"), document.querySelector("#Code")];
    let lvl = 0;
    let isL = 0;
    let thisPage = 0;
    function resetPages() {
        for (let i = 0; i < pagesSigns.length; i++) {
            if (thisPage === i) {
                pagesSigns[i].style['display'] = "flex";
            } else {
                pagesSigns[i].style['display'] = "none";
            }
        }
    }
    resetPages();
    goSign.onclick = () => {
        thisPage = 1;
        isL = 1;
        lvl = 1;
        resetPages()
    }
    goLogin.onclick = () => {
        lvl = 1;
        isL = 2;
        thisPage = 2;
        resetPages()
    }
    const back = document.querySelectorAll(".Backwards");
    for (let i = 0; i < back.length; i++) {
        back[i].onclick = () => {
            if (lvl === 1) {
                lvl = 0;
                isL = 0;
                thisPage = 0;
                resetPages()
            } else if (lvl === 2) {
                lvl = 1;
                thisPage = isL;
                resetPages()
            }
        }
    }
    const registry = document.getElementById("registry");
    const pop1 = new popup();
    registry.onsubmit = (e) => {
        e.preventDefault();
        const email = registry.email.value;
        const pass = registry.password.value;
        const repeat = registry.isSame.value;
        if (email == "") 
            pop1.messageInElement(registry, "فیلد ایمیل  باید پر شود!", 2);
        else if (pass.length < 4)
            pop1.messageInElement(registry, "حداقل طول رمز عبور 4 کارکتر است!", 2);
        else if (pass !== repeat)
            pop1.messageInElement(registry, "رمز های عبور یکسان نیست! دوباره تلاش کنید.", 2);
        else {
            /**
             * INSERT YOUR XHR Connection Server codes and send code
             * also you can change email with phone number
             */
            lvl = 2;
            thisPage = 3;
            resetPages()
        }
    }
    
    
    const login = document.getElementById("login");
    const pop2 = new popup();
    login.onsubmit = (e) => {
        e.preventDefault();
        const id = login.user2.value;
        const pass = registry.password.value;
        if (id.match(/^[A-Za-z0-9_\.\-]+@[a-zA-Z]+\.[a-zA-Z]/) || id.match(/^[A-Za-z0-9_]+/)) 
            pop1.messageInElement(registry, "ورودی فیلد اول نامعتبر!", 2);
        else {
            /**
             * INSERT YOUR XHR Connection Server codes and send code
             */
            lvl = 2;
            thisPage = 3;
            resetPages()
        }
    }
    const PasswordArea = document.querySelectorAll(".PasswordArea");
    const defaultPassKey = "password"; // it could only be "password" or "text"
    for (let i = 0; i < PasswordArea.length; i++) {
        for (let k = 0; k < PasswordArea[i].children.length; k++) {
            if (PasswordArea[i].children[k] instanceof HTMLAnchorElement) {
                let input;
                for (let u = 0; u < PasswordArea[i].children.length; u++) if (PasswordArea[i].children[u] instanceof HTMLInputElement) input = PasswordArea[i].children[u];
                const a = PasswordArea[i].children[k];
                let isOpen = defaultPassKey === "password" ? false : true;
                input.setAttribute("type", defaultPassKey);
                a.innerHTML = isOpen ? "***" : "Abc";
                a.onclick = () => {
                    isOpen = isOpen ? false : true;
                    input.setAttribute("type", !isOpen ? "password" : "text");
                    a.innerHTML = isOpen ? "***" : "Abc";
                }
            }
        }
    }


    const Verifaction = document.querySelectorAll(".Verifaction");
    for (let i = 0; i < Verifaction.length; i++) {
        const pup = new popup();
        Verifaction[i].setAttribute("dir", "ltr");
        const chs = Number(Verifaction[i].getAttribute("data-len"));
        let step = 1;
        const inputs = [];
        for (let k = 0; k < chs;k++) {
            const input = document.createElement("input");
            input.setAttribute("maxlength", "1");
            inputs.push(input);
            input.tabIndex = k;
            Verifaction[i].append(input);
            function runCode() {
                let code = "";
                for (let o = 0; o < inputs.length;o++) {
                    code += inputs[o].value;
                }



                /**
                 * INSERT Your Auth test Code and Your Strategy
                **/





                pup.messageInElement(Verifaction[i], "Oh shit you cant!", 2);
                code = "";
                step = 1;
                setTimeout(() => {
                    for (let o = 0; o < inputs.length;o++) {
                        inputs[o].value = "";
                    }
                    inputs[0].focus();
                }, 1);
            }
            input.onkeydown = (e) => {
                if (e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode >= 65 && e.keyCode <= 90) {
                    if (k < inputs.length - 1 && step <= chs) {
                        input.value = e.key;    
                        
                        let counter = 1;
                        for (let o = 0; o < inputs.length;o++) counter = inputs[o].value != "" ? counter + 1 : counter;
                        step = counter;

                        setTimeout(() => {
                            inputs[k + 1].focus();
                        }, 1);
                    } else if (step <= chs) {
                        input.value = e.key;
                        
                        let counter = 1;
                        for (let o = 0; o < inputs.length;o++) counter = inputs[o].value != "" ? counter + 1 : counter;
                        step = counter;
                    }
                    if (step > chs) {
                        runCode();
                    }
                } else if (e.keyCode == 8) {
                    if (step > 1) {
                        input.value = "";
                        setTimeout(() => {
                            inputs[k - 1].focus();
                        }, 1);
                        
                        let counter = 1;
                        for (let o = 0; o < inputs.length;o++) counter = inputs[o].value != "" ? counter + 1 : counter;
                        step = counter;
                    } else {
                        let counter = 1;
                        for (let o = 0; o < inputs.length;o++) counter = inputs[o].value != "" ? counter + 1 : counter;
                        step = counter;
                        
                        input.value = "";
                        input.focus();
                    }
                } else if (e.keyCode == 37 && k > 0) {
                    inputs[k - 1].focus();
                } else if (e.keyCode == 39 && k < inputs.length - 1) {
                    inputs[k + 1].focus();   
                }
            }
            input.onchange = () => {
                let counter = 1;
                for (let o = 0; o < inputs.length;o++) counter = inputs[o].value != "" ? counter + 1 : counter;
                step = counter;

                if (step > chs) {
                    runCode()
                }
            }
        }
    }

    
    const forget = document.getElementById("forget");
    forget.onclick = () => {
        const user2 = document.getElementById("user2");
        if (user2.value.match(/^09[0-9]+$/)) {
            const phone = user2.value;
            /**
             * ENTER Your Ajax codes. with this phone number: user2.value
             */
            lvl = 2;
            thisPage = 3;
            resetPages()
        } else {
            pop2.messageInElement(login, "تنها یک شماره موبایل معتبر وارد کنید.", 2)
            pop2.messageInElement(login, "با شروع 09", 2)
        }

    }
}
