//My Java Script

function loadWallet() {
    //load the save ballance
    getBallance();
    //load the ledger
    loadLedger();
}

function getBallance() {
    //get from repository
    var wobj = localStorage.getItem("MWallet");
    var wallet;
    if(!wobj) 
    {
        //then create it
        var w = {
            balance: 0.00,
            head: 0,
            ledger: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
        };
        localStorage.setItem("MWallet",JSON.stringify(w));
        var obj = localStorage.getItem("MWallet");
        wallet = JSON.parse(obj);
    } else {
        wallet = JSON.parse(wobj);
    }
    document.getElementById("balance").innerHTML = parseFloat(wallet.balance).toFixed(2);
}

function loadLedger() {
    var row;
    var wobj = localStorage.getItem("MWallet");
    var wallet = JSON.parse(wobj);
    var idx = parseInt(wallet.head);
    idx--;
    if( idx < 0)
       idx = 15;
    for( row = 1; row <= 16; row ++ ){
        loadRow(row, idx, wallet.ledger[idx]);
        idx--;
        if( idx < 0) {
            idx = 15;
        }
    }
}

function loadRow(row, index, ledger) {
 
    var tf = ledger.tf;
    if(!tf){
        tf = "**"
    }
    eid = "c" + row + "0";
    document.getElementById(eid).innerHTML = tf;

    var mmo = ledger.memo;
    if(!mmo){
        mmo = "**"
    }
    eid = "c" + row + "1";
    document.getElementById(eid).innerHTML = mmo;

    var amt = ledger.amount;
    if(!amt){
        amt = "**"
    }
    eid = "c" + row + "2";
    document.getElementById(eid).innerHTML = amt;
}

function saveDeposit() {
    //update the balance
    var amount = document.getElementById("damount").value;
    var wobj = localStorage.getItem("MWallet");
    var wallet = JSON.parse(wobj);   
    var total = parseFloat(wallet.balance);
    var dep = parseFloat(amount);
    total = total + dep;
    wallet.balance = total;
    var memo = document.getElementById("dmemo").value;
    var tf =  document.getElementById("dfrom").value;
    saveRecord(wallet,tf,memo,amount);
}

function savePurchase( ) {
    var amount = document.getElementById("pamount").value;
    var wobj = localStorage.getItem("MWallet");
    var wallet = JSON.parse(wobj);   
    var total = parseFloat(wallet.balance);
    var dep = parseFloat(amount);
    total = total - dep;
    localStorage.setItem("MWBalance",total);
    wallet.balance = total;
    var memo = document.getElementById("pmemo").value;
    var tf =  document.getElementById("pfrom").value;
    saveRecord(wallet,tf,memo,"-" + amount);
}

function saveRecord(wallet,ft,memo,amount){
    var cell = {
        tf: ft,
        memo: memo,
        amount: amount
    }
    var idx = parseInt(wallet.head);
    wallet.ledger[idx] = cell;
    idx++;
    if( idx > 15){
        idx = 0;
    }
    wallet.head = idx;
    localStorage.setItem("MWallet",JSON.stringify(wallet));
}