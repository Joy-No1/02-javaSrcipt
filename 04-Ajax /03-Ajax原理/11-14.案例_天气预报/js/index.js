/*
 * @Author: joy 1686452422@qq.com
 * @Date: 2023-06-05 14:56:44
 * @LastEditors: joy 1686452422@qq.com
 * @LastEditTime: 2023-11-15 17:04:26
 * @FilePath: /02-javaScript/04-Ajax /03-Ajax原理/11-14.案例_天气预报/js/index.js
 */
/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */

function getWeather(cityCode) {
    myAxios({
        url: 'http://hmajax.itheima.net/api/weather',
        params: {
            city: cityCode,
        }
    }).then(result => {
        console.log(result);
        const wOBj = result.data;
        const dataStr = `
        <span class="dateShort">${wOBj.date}</span>
        <span class="calendar">农历&nbsp;
          <span class="dateLunar">${wOBj.dateLunar}</span>
        </span>
        `;
        document.querySelector('.title').innerHTML = dataStr;

        // 城市名
        document.querySelector('.area').innerHTML = wOBj.area;

        // 当天气温
        const nowStr = `
        <div class="tem-box">
        <span class="temp">
          <span class="temperature">${wOBj.temperature}</span>
          <span>°</span>
        </span>
      </div>
      <div class="climate-box">
        <div class="air">
          <span class="psPm25">${wOBj.psPm25}</span>
          <span class="psPm25Level">${wOBj.psPm25Level}</span>
        </div>
        <ul class="weather-list">
          <li>
            <img src="./imgs/小雨-line.png" class="weatherImg" alt="">
            <span class="weather">${wOBj.weather}</span>
          </li>
          <li class="windDirection">${wOBj.windDirection}</li>
          <li class="windPower">${wOBj.windPower}</li>
        </ul>
      </div>
        `;


        document.querySelector('.weather-box').innerHTtML = nowStr;
        // 当天天气
        const twOBj = wOBj.todayWeather;
        const todayStr = `
            <div class="range-box">
            <span>今天：</span>
            <span class="range">
            <span class="weather">${twOBj.weather}</span>
            <span class="temNight">${twOBj.temNight}</span>
            <span>-</span>
            <span class="temDay">${twOBj.temDay}</span>
            <span>℃</span>
            </span>
        </div>
        <ul class="sun-list">
            <li>
            <span>紫外线</span>
            <span class="ultraviolet">${twOBj.ultraviolet}</span>
            </li>
            <li>
            <span>湿度</span>
            <span class="humidity">${twOBj.humidity}</span>%
            </li>
            <li>
            <span>日出</span>
            <span class="sunriseTime">${twOBj.sunriseTime}</span>
            </li>
            <li>
            <span>日落</span>
            <span class="sunsetTime">${twOBj.sunsetTime}</span>
            </li>
        </ul>
     `;
        document.querySelector('.today-weather').innerHTML = todayStr;


        // 七日天气预报
        const dayForecast = wOBj.dayForecast;
        const dayForecastStr = dayForecast.map(item => {
            return `
            <li class="item">
            <div class="date-box">
              <span class="dateFormat">${item.dateFormat}</span>
              <span class="date">${item.date}</span>
            </div>
            <img src="${item.weatherImg}" alt="" class="weatherImg">
            <span class="weather">${item.weather}</span>
            <div class="temp">
              <span class="temNight">${item.temNight}</span>-
              <span class="temDay">${item.temDay}</span>
              <span>℃</span>
            </div>
            <div class="wind">
              <span class="windDirection">${item.windDirection}</span>
              <span class="windPower">${item.windPower}</span>
            </div>
          </li>
            `;
        }).join(``)
        // console.log(dayForecastStr);
        document.querySelector('.week-wrap').innerHTML = dayForecastStr;
    });
}

getWeather('110100');


document.querySelector('.search-city').addEventListener('input', e => {
    console.log(e.target.value);
    myAxios({
        url: 'http://hmajax.itheima.net/api/weather/city',
        params: {
            city: e.target.value
        }
    }).then(result => {
        console.log(result);
        const liStr = result.data.map(item => {
            return ` <li class="city-item" data-code="${item.code}">${item.name}</li>`
        }).join('');
        console.log(liStr);
        document.querySelector('.search-list').innerHTML = liStr;
    })
})

document.querySelector('.search-list').addEventListener('click', e => {
    if (e.target.classList.contains('city-item')) {
        const cityCode = e.target.dataset.code;
        // console.log(cityCode);
        getWeather(cityCode);
    }
})