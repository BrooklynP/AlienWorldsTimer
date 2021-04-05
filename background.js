let lastNotifiedID = null;

function checkIfMineReady(timeToCheck) {
    setTimeout(() => {
        console.log("Checking if mine ready");
        const waxAddress = localStorage.getItem('waxAddress');
        if (waxAddress) {
            fetch('https://awstats.io/mining/miner/24/' + waxAddress)
                .then(response => response.text())
                .then(html => {
                    const table = html.split('<table border="0" class="dataframe w3-table w3-hoverable w3-light-grey top-miner-table" id="all-mines-table">')[1];
                    const tableBody = table.split('<tbody>')[1];
                    const topTableRow = tableBody.split('<tr>')[1];
                    const tableCol = topTableRow.split('<td>');

                    const lastMineDate = new Date(tableCol[3].replace('</td>', '').replace(' ', 'T').trim() + 'Z');
                    const mineCooldownTime = parseInt(tableCol[6].replace('</td>', '').trim());
                    const nowDate = new Date();
                    const nextMineDate = new Date(lastMineDate.getTime() + (mineCooldownTime * 1000));

                    if (nowDate > nextMineDate) {
                        console.log("mine ready");
                        if(JSON.stringify(lastMineDate) != JSON.stringify(lastNotifiedID)){
                            lastNotifiedID = null;
                        }
                        if(lastNotifiedID === null){
                            alert("Ready to mine");
                            lastNotifiedID = lastMineDate;
                        }
                        checkIfMineReady(1000);
                    }
                    else {
                        console.log("Mine not ready, ready at ", nextMineDate);
                        console.log("Checking again in ", nextMineDate - nowDate);
                        checkIfMineReady(nextMineDate - nowDate);
                    }
                }).catch(error => { console.error(error) });
        }
        else {
            checkIfMineReady(10000);
        }
    }, timeToCheck);
}
checkIfMineReady(1000);
