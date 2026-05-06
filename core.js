// get control
const sections = [document.getElementById("1"), document.getElementById("2"), document.getElementById("3")];
const SecBtns = [document.getElementById("sec1"),document.getElementById("sec2"), document.getElementById("sec3")];

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
