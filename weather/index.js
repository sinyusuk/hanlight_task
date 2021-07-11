const API_KEY = ""
const weather = document.querySelector(".js-weather");

// const API_KEY = "API KEY 입력";
const COORDS = "coords";

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
        .then(function (response) { // .then = fetch가 완료 된 후 실행됨
            return response.json(); // json형태로 변환
        })
        .then(function (json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature}℃ @ ${place}`;
        });
}
function saveCoords(coordsObj) { // localStorage에 저장
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) { // 요청 수락
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude,
    };
    saveCoords(coordsObj); // localStorage에 저장 함수
}

function handleGeoError() { // 요청 거절
    console.log("Not allowed.");
}

function askForCoords() { // 사용자 위치 요청 (요청 수락, 요청 거절)
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS); // localStorage에서 위치정보 가져옴
    if (loadedCoords === null) { // 위치 정보가 없으면
        askForCoords(); // 위치 정보 요청 함수
    } else {
        const parseCoords = JSON.parse(loadedCoords); // json형식을 객체 타입으로 바꿔서 저장
        getWeather(parseCoords.latitude, parseCoords.longitude); // 날씨 요청 함수
    }
}

function init() {
    loadCoords();
}

init();
