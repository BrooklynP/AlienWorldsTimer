initialise();

function getCurrentlySetWaxAddress() {
    let waxAddress = localStorage.getItem('waxAddress')
    if (waxAddress) {
        document.getElementById('waxAddressDisplay').innerText = 'Your WAX address is set to ' + waxAddress
    }
}

function setCurrentWaxAddress() {
    let waxAddress = document.getElementById('waxAddress').value;
    console.log(waxAddress);
    localStorage.setItem('waxAddress', waxAddress);
    getCurrentlySetWaxAddress();
}

function getTimeUntilNextMine() {
    let timeUntilNextMineString = localStorage.getItem('nextMineTime');
    let timeUntilNextMine = new Date(timeUntilNextMineString);
    if(timeUntilNextMine > new Date()){
    document.getElementById('nextMine').innerText = timeUntilNextMine.toLocaleTimeString();
    }
    else{
        document.getElementById('nextMine').innerText = "NOW";
    }
}

function toggleShowAlerts() {
    let showAlertsToggle = document.getElementById('shouldShowAlertsToggle');
    if(showAlertsToggle.checked === true){
        localStorage.setItem('shouldShowAlerts','checked')
    }
    else{
        localStorage.setItem('shouldShowAlerts','unchecked')
    }
}

function changeSoundEffect() {
    let monkeyRadio = document.getElementById('monkeyRadio').checked;
    let alienRadio = document.getElementById('alienRadio').checked;

    if(monkeyRadio){
        localStorage.setItem('sound', 'monkey');
        let monkeyAudio = new Audio('./chimp.mp3');
        monkeyAudio.play();
    }
    else if(alienRadio){
        localStorage.setItem('sound', 'alien');
        let pingAudio = new Audio('./ping.mp3');
        pingAudio.play();
    }
    else{
        localStorage.setItem('sound', 'none');
    }
}

function initialise() {
    document.getElementById('changeWaxBtn').addEventListener('click', setCurrentWaxAddress)
    document.getElementById('shouldShowAlertsToggle').addEventListener('click', toggleShowAlerts)
    
    let monkeyRadio = document.getElementById('monkeyRadio');
    let alienRadio = document.getElementById('alienRadio');
    let noneRadio = document.getElementById('noneRadio');

    monkeyRadio.addEventListener('click', changeSoundEffect);
    alienRadio.addEventListener('click', changeSoundEffect);
    noneRadio.addEventListener('click', changeSoundEffect);

    const sound = localStorage.getItem('sound');
    noneRadio.checked = sound === 'none';
    monkeyRadio.checked = sound === 'monkey';
    alienRadio.checked = sound === 'alien';

    getCurrentlySetWaxAddress();
    getTimeUntilNextMine();

    let showAlerts = localStorage.getItem('shouldShowAlerts');
    if(!showAlerts){
        localStorage.setItem('shouldShowAlerts','checked');
        showAlerts = 'checked';
    }
    document.getElementById('shouldShowAlertsToggle').checked = showAlerts === 'checked';
}