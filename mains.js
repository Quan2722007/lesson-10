//Bài 1
const array1 = ["1", "2", "3", "4"];
const array2 = ["Lê Văn A", "Nguyễn Thị B", "Đỗ Thị C"];

function consoleLog(letter) {
    console.log(letter);
}

function forEachTest(array, callback) {
    for (let i = 0; i < array.length; i++) {
        callback(array[i]);
    }
}

forEachTest(array1, consoleLog);
forEachTest(array2, consoleLog);

// Bài 2
function forEachTest2(array, callback) {
    let result = [];
    for (let i = 0; i < array.length - 1; i++) {
        let num1 = parseInt(array[i], 10);
        let num2 = parseInt(array[i + 1], 10);
        result.push(num1 + num2);
    }
    // return result;
    callback(result);
}
forEachTest2(array1, consoleLog);

//Bài 3
function random() {
    const promise = new Promise((resolve, reject) => {
        const mathRandom = Math.floor(Math.random() * 10);
        if (mathRandom) {
            resolve(`Số ngẫu nhiên: ${mathRandom}`);
        } else {
            reject(`Không thể tạo số ngẫu nhiên.`);
        }
    });
    promise
        .then((data) => {
            document.getElementById("output3").textContent = data;
        })
        .catch((error) => {
            document.getElementById("output3").textContent = error;
        });
}

// Bài 4
function checkArray() {
    let input4 = document.getElementById("input4").value.trim();
    const promise = new Promise((resolve, reject) => {
        let array = input4.split(",");
        let result = [];
        for (let i = 0; i < array.length; i++) {
            let num = parseInt(array[i], 10);
            if (num % 2 === 0) {
                result.push(num);
            }
        }
        if (result.length > 0) {
            resolve(result);
        } else {
            reject(`Không tìm thấy số chẵn.`);
        }
    });
    promise
        .then((data) => {
            document.getElementById("output4").textContent = data;
        })
        .catch((error) => {
            document.getElementById("output4").textContent = error;
        });
}

//Bài 5
function clickButton() {
    const API = fetch(
        "https://restcountries.com/v3.1/all?fields=name,capital,flags",
    );
    API.then((data) => data.json())
        .then((dt) => {
            console.log(dt);
            const box = document.getElementById("box");
            let string = "";
            for (let i = 0; i < dt.length; i++) {
                let country = dt[i];
                string += `
                <div class="boxCountries">
                    <img
                    src="${country.flags.png}"
                    alt="${country.name.common}"
                    loading="lazy"
                    class="img"
                />
                    <div class="nameCountry">${country.name.common}</div>
                </div>
                `;
            }
            box.innerHTML = string;
        })
        .catch((error) => {
            console.error(error);
        });
}

// Bài 6
function getIP() {
    const getIP = document.getElementById("get");

    fetch("https://api.ipify.org?format=json")
        .then((res) => res.json())
        .then((data) => {
            getIP.textContent = "IP của bạn là: " + data.ip;
        })
        .catch(() => {
            getIP.textContent = "Không lấy được IP";
        });
}
