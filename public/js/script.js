
const formDOM = document.querySelector('form');
const input_value = document.getElementById('name');
const search_box_btn = document.querySelector('.btn');
const temperature = document.querySelector('.temp');
const wind_speed = document.querySelector('.wind');
const description = document.querySelector('.description');
const time = document.querySelector('.time');
const alertform = document.querySelector('.alert');
const tempIcon = document.querySelector('.fa-temperature-high');
const windIcon = document.querySelector('.fa-wind');
const timeIcon = document.querySelector('.fa-business-time');
const errorNotFoundIcon = document.querySelector('.fa-circle-xmark');

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        let city_name;
        let value = input_value.value;
        if (value) {
            city_name = value.toLowerCase();
            await fetch('/weather', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    city_name: city_name
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                temperature.textContent = `${data.main.temp.toFixed(0)} C`;
                wind_speed.textContent = `${data.wind.speed}`;
                description.textContent = `${data.weather[0].description}`;
                temperature.appendChild(tempIcon);
                wind_speed.appendChild(windIcon);
            });
            time_zone();
            input_value.value = '';
            alertform.classList.add('text-success');
        }else {
            alertform.innerHTML = '<h3>Input must not be empty, please provide country name!</h3>'
            alertform.style.color = 'red';
        }
    } catch (error) {
        alertform.innerHTML = `${error}`;
        alertform.style.color = 'red';
    }
    setTimeout(() => {
        alertform.style.display = 'none';
        alertform.classList.remove('text-success');
    }, 3000);
});


function time_zone() {
    let day = new Date();
    let hours = day.getHours();
    let t;
    if (hours > 12){
        t = "PM"
    }else {
        t = "AM"
    }
    time.textContent = day.getHours() + ":" + day.getMinutes() + ":" + day.getSeconds() + " " + t;
    time.appendChild(timeIcon);
}