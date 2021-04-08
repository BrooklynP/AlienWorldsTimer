initialise();

function getCurrentlySetWaxAddress() {
    const waxAddress = localStorage.getItem('waxAddress');
    let cmLink = document.getElementById('cmLink');
    cmLink.href = 'https://cmstats.net/mining/user/?user=' + waxAddress;
    if (waxAddress) {
        document.getElementById('waxAddressDisplay').innerText = 'Your WAX address is set to ' + waxAddress
    }
}

function setCurrentWaxAddress() {
    const waxAddress = document.getElementById('waxAddress').value;
    console.log(waxAddress);
    localStorage.setItem('waxAddress', waxAddress);
    getCurrentlySetWaxAddress();
    getTLMMined();
}

function getTimeUntilNextMine() {
    const timeUntilNextMineString = localStorage.getItem('nextMineTime');
    const timeUntilNextMine = new Date(timeUntilNextMineString);
    if (timeUntilNextMine > new Date()) {
        document.getElementById('nextMine').innerText = timeUntilNextMine.toLocaleTimeString();
    }
    else {
        document.getElementById('nextMine').innerText = "NOW";
    }
}

function toggleShowAlerts() {
    const showAlertsToggle = document.getElementById('shouldShowAlertsToggle');
    if (showAlertsToggle.checked === true) {
        localStorage.setItem('shouldShowAlerts', 'checked')
    }
    else {
        localStorage.setItem('shouldShowAlerts', 'unchecked')
    }
}

function changeSoundEffect() {
    const monkeyRadio = document.getElementById('monkeyRadio').checked;
    const alienRadio = document.getElementById('alienRadio').checked;

    if (monkeyRadio) {
        localStorage.setItem('sound', 'monkey');
        let monkeyAudio = new Audio('./monkey.wav');
        monkeyAudio.play();
    }
    else if (alienRadio) {
        localStorage.setItem('sound', 'alien');
        let pingAudio = new Audio('./ping.mp3');
        pingAudio.play();
    }
    else {
        localStorage.setItem('sound', 'none');
    }
}

function getTLMMined() {
    let tlmMined = document.getElementById('TLM');
    tlmMined.innerText = "LOADING";
    const waxAddress = localStorage.getItem('waxAddress')
    if (waxAddress) {
        fetch('https://cmstats.net/mining/user/?user=' + waxAddress, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then(response => response.text())
            .then(text => {
                let div = text.split('<div class="card text-center text-black  mb-3" id="red">')
                if (div.length > 0) {
                    div = div[1].split('<div class="col-md">')[0];
                    let tlmValue = div.split('<h3 class="card-title">')[1].split('</h3>')[0];
                    tlmMined.innerText = tlmValue + "TLM";
                }
                else {
                    div = text.split('<div class="card text-center text-black  mb-3" id="green">')
                    div = div[1].split('<div class="col-md">')[0];
                    let tlmValue = div.split('<h3 class="card-title">')[1].split('</h3>')[0];
                    tlmMined.innerText = tlmValue + "TLM";
                }
            }).catch(error => { console.log(error) })
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
    getTLMMined();

    let showAlerts = localStorage.getItem('shouldShowAlerts');
    if (!showAlerts) {
        localStorage.setItem('shouldShowAlerts', 'checked');
        showAlerts = 'checked';
    }
    document.getElementById('shouldShowAlertsToggle').checked = showAlerts === 'checked';
}