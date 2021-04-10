let lastNotifiedID = null;
function checkIfMineReady(timeToCheck) {
    setTimeout(() => {
        const shouldShowAlerts = localStorage.getItem('shouldShowAlerts');
        const shouldPingSound = localStorage.getItem('sound');
        if (shouldShowAlerts === 'checked' || shouldPingSound === 'alien' || shouldPingSound === 'monkey') {
            console.log("Checking if mine ready");
            const waxAddress = localStorage.getItem('waxAddress');
            if (waxAddress) {
                let waxoreos = 'eos'
                if (waxoreos === 'eos') {
                    checkMineViaEOS(waxAddress)
                }
                else if (waxoreos === 'wax') {
                    checkMineViaWax(waxAddress);
                }
            }
            else {
                checkIfMineReady(5000);
            }
        }
        else {
            checkIfMineReady(5000)
        }
    }, timeToCheck);
}
checkIfMineReady(0);

function checkMine(lastMineDate, nextMineDate) {
    localStorage.setItem('nextMineTime', nextMineDate);
    let nowDate = new Date();
    console.log(nowDate, nextMineDate);

    if (nowDate > nextMineDate) {
        console.log("mine ready");
        if (JSON.stringify(lastMineDate) != JSON.stringify(lastNotifiedID)) {
            lastNotifiedID = null;
        }
        if (lastNotifiedID === null) {
            notifyUser();
            lastNotifiedID = lastMineDate;
        }
        console.log("checking again in 5000");
        checkIfMineReady(5000);
    }
    else {
        console.log("Mine not ready, ready at ", nextMineDate);
        console.log("Checking again in ", nextMineDate - nowDate);
        checkIfMineReady(nextMineDate - nowDate);
    }
}


function checkMineViaEOS(waxAddress) {
    fetch('https://wax.eosrio.io/v2/state/get_account?account=' + waxAddress)
        .then(response => response.json())
        .then(json => {
            let transactions = json.actions;
            console.log(transactions);
            let transactionToUse
            for (let i = 0; i < transactions.length; i++) {
                if (transactions[i].act.name === "mine") {
                    transactionToUse = transactions[i]
                    break;
                }
            }
            console.log(transactionToUse);
            if (transactionToUse) {
                fetch('https://wax.eosrio.io/v2/history/get_transaction?id=' + transactionToUse.trx_id)
                    .then(response => response.json())
                    .then(json => {
                        console.log(json);
                        let data = json.actions[3].act.data
                        const lastMineDate = new Date(json.actions[3]["@timestamp"]);
                        const mineCooldownTime = data.params.delay;
                        const nextMineDate = new Date(lastMineDate.getTime() + (mineCooldownTime * 1000));
                        nextMineDate.setHours(nextMineDate.getHours() + 1);

                        checkMine(lastMineDate, nextMineDate);
                    }).catch(error => {
                        console.log(error); checkIfMineReady(5000);
                    });
            }
        }).catch(error => {
            console.error(error); checkIfMineReady(5000);
        });
}

function checkMineViaWax(waxAddress) {
    fetch('https://api.alienworlds.io/v1/alienworlds/mines?limit=1&miner=' + waxAddress)
        .then(response => response.json())
        .then(json => {
            const lastMineDate = new Date(json.results[0].block_timestamp);
            const mineCooldownTime = json.results[0].params.delay;
            const nextMineDate = new Date(lastMineDate.getTime() + (mineCooldownTime * 1000));

            checkMine(lastMineDate, nextMineDate);
        }).catch(error => {
            console.error(error); checkIfMineReady(5000);
        });
}


function notifyUser() {
    const shouldShowAlerts = localStorage.getItem('shouldShowAlerts');
    const sound = localStorage.getItem('sound');
    let audio;

    console.log(sound);

    if (sound === 'alien') {
        audio = new Audio('./ping.mp3');
        audio.play();
    }
    else if (sound === 'monkey') {
        audio = new Audio('/monkey.wav');
        audio.play();
    }
    if (shouldShowAlerts === 'checked') {
        if (audio) {
            setTimeout(() => { alert('Ready To Mine'); }, 100)
        }
        else {
            alert('Ready To Mine');
        }
    }
}