// get control
const sections = document.querySelectorAll(".Section");
const SecBtns = document.querySelectorAll(".secBtns");

// prepare
let nowSec = 0;
const displayType = "block";
function setSectionStat() {
    for (let i = 0; i < sections.length; i++) {
        if (nowSec === i) {
            sections[i].style['display'] = displayType;
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
