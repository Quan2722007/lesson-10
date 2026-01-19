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
const containerCountries = document.getElementById("containerCountries");
let allCountries = [];
let filteredCountries = [];
let currentPage = 1;
const itemsPerPage = 12;
function clickButton() {
    containerCountries.style.display = "flex";
    const API = fetch(
        "https://restcountries.com/v3.1/all?fields=name,capital,flags",
    );
    API.then((data) => data.json())
        .then((dt) => {
            allCountries = [...dt];
            filteredCountries = [...allCountries];
            renderPage();
        })
        .catch((error) => {
            console.error(error);
        });
}
function renderPage() {
    const countryList = document.getElementById("box");
    countryList.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageCountry = filteredCountries.slice(start, end);

    let string = "";
    pageCountry.forEach((country) => {
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
    });
    countryList.innerHTML = string;
    updatePagigation();
}
function updatePagigation() {
    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");
    const pageNumbers = document.getElementById("numberPage");

    const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    let page = "";
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
            page += `<button class="page ${i === currentPage ? "active" : ""}" onclick="goToPage(${i})">${i}</button>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            page += `<span>...</span>`;
        }
    }
    pageNumbers.innerHTML = page;
}
function goToPage(page) {
    currentPage = page;
    renderPage();
}
function headerSearch() {
    const value = document.getElementById("searchInput").value.toLowerCase();
    filteredCountries = allCountries.filter((country) => {
        return country.name.common.toLowerCase().includes(value);
    });
    currentPage = 1;
    renderPage();
}
document.getElementById("searchInput").addEventListener("input", headerSearch);
document.getElementById("prev").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage();
    }
});
document.getElementById("next").addEventListener("click", () => {
    const totalPages = Math.ceil(allCountries.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderPage();
    }
});
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
