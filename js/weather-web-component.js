class WeatherElement extends HTMLElement {
     constructor () {
        super()

        this.srcPic= ""
        this.date = ""
        this.cityName = this.getAttribute("city") || "Kharkiv"
        this.temp = ""
        this.clouds = ""
        this.pressure = ""
        this.humidity = ""
        this.cloudness = ""
        this.wind_speed = ""
        this.min_temp = ""
        this.max_temp = ""

        this.wrapper = document.createElement ( 'div' )
        this.wrapper.className = "wrapper"

        this.refillingForm()

        this.shadow = this.attachShadow({mode: "open"})

        let style = document.createElement("style")
        style.textContent = `
        .wrapper {
      		max-width: 240px;
      		min-width: 240px;
      		border-radius: 30px;
      		display: flex;
      		justify-content: space-between;
      		align-items: center;
      		flex-direction: column;
      		padding: 10px;
      		box-shadow: 10px 10px 75px 2px rgba(0,0,0,0.62);
      		background: rgba(255,255,255,0.45);
      		font-size: 10px;
      		position: relative;
          margin: 0 2vw 2rem 2vw;
          transition: all .5s ease-in-out;
      	}
      	.header-weather {
      	  display: flex;
      		justify-content: space-around;
      		align-items: center;
      		flex-direction: row;
      		border-radius: 30px;
      		width: 100%;
      		box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.3);
      		padding: 10px 0;
      		margin-bottom: 1em;
      	}
      	.current_icon {
      		padding-left: 5px;
      		width: 100px;
      	}
      	.description span {
      		display: block;
      		margin-right: 10px;
      		text-align: center;
      	}
      	.current_city {
      		font-size: 22px;
          font-weight: bold;
      	}
      	.current_temp {
      		font-size: 44px;
      	}
      	.current_desc {
      		font-size: 18px;
      	}
      	.current_date {
      		font-size: 14px;
      	}

      	.additional_desc {
      		display: flex;
      		justify-content: space-between;
      		flex-direction: column;
      		align-items: center;
      		width: 100%;
      		font-size: 18px;
      		box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.3);
      		border-radius: 30px;
      	}
      	.desc {
      		display: flex;
      		justify-content: space-between;
      		width: 65%;
      		padding: 15px 5px;
      	}
      	hr {
      		margin: 0;
      		width: 75%;
      		border: 0.5px solid black;
      	}
        button {
          margin: 0 ;
       	  padding: 0;
          position: absolute;
          display: block;
      		top: -20px;
      		right: -15px;
      		width: 30px;
      		height: 30px;
      		border-radius: 15px;
       		background: #ffffff00;
      		border-style: none;
       		outline: none;
        	color: #000000;
          font-size: 30px;
          z-index:100;
        }
        error-element {
          margin: 0 auto;
          position: absolute;
          bottom: 5vw;
          right: 5vw;
          z-index: 10;
          transition: all .5s ease-in-out;
        }
        `

        this.shadow.appendChild ( style )
        this.shadow.appendChild ( this.wrapper )

        this.getData( this.cityName )
    }

    refillingForm () {
        this.wrapper.innerHTML = `
    			<div class="header-weather">
    				<div class="icon">
    					<img src="${this.srcPic}" alt="icon" class="current_icon">
    				</div>
    				<div class="description">
    					<span class="current_date">${this.date}</span>
    					<span class="current_city">${this.cityName}</span>
    					<span class="current_temp">${this.temp}</span>
    					<span class="current_desc">${this.clouds}</span>
    				</div>
    			</div>

    			<div class="additional_desc">
    				<div class="desc">
    					<span>Pressure</span>
    					<span>${this.pressure}hPa</span>
    				</div>
    				<hr>
    				<div class="desc">
    					<span>Humidity</span>
    					<span>${this.humidity}%</span>
    				</div>
    				<hr>
    				<div class="desc">
    					<span>Cloudiness</span>
    					<span>${this.cloudness}%</span>
    				</div>
    				<hr>
    				<div class="desc">
    					<span>Wind speed</span>
    					<span>${this.wind_speed}m/s</span>
    				</div>
            <hr>
    				<div class="desc">
    					<span>Min temp</span>
    					<span>${this.min_temp}°C</span>
    				</div>
            <hr>
    				<div class="desc">
    					<span>Max temp</span>
    					<span>${this.max_temp}°C</span>
    				</div>
    			</div>
          <button > x </button>
        `
        this.wrapper.querySelector("button")
            .onclick = function (event) {
                  this.remove()
            }.bind(this)
    }

    initURL ( cityN ) {
        let source = "https://api.openweathermap.org/data/2.5/weather?"
        let appid = "5ebc9334e1933914b46a2ba252a3ea99"
        let units = "metric"
        return `${source}q=${cityN}&appid=${appid}&units=${units}`
    }

    async getData ( cityN = "kharkiv" ) {
        var URL = this.initURL( cityN )

        return await fetch( URL )
            .then(response => {
                if (response.status === 200){
                    response.json()
                        .then(respon => this.updateDate(respon))
                } else {
                  this.wrapper.remove()

                  this.shadow.innerHTML += `<error-element city="${this.cityName}"></error-element>`
                  // let elemError = document.createElement("error-element")
                  // this.shadow.appendChild(elemError)

                  setTimeout( function() {
                      this.remove()
                  }.bind(this), 3000);

                  console.error ( `Error ${response.status}: City not found`  )
                }
            })
    }

    updateDate( weather ) {
        this.srcPic =  `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`
        this.date =  this.convertData(weather.dt)
        this.cityName = `${weather.name}, ${weather.sys.country} `
        this.temp =  Math.round(weather.main.temp)
        this.clouds = weather.weather[0].description
        this.pressure = weather.main.pressure
        this.humidity = weather.main.humidity
        this.cloudness = weather.clouds.all
        this.wind_speed = weather.wind.speed
        this.min_temp = weather.main.temp_min
        this.max_temp = weather.main.temp_max

        this.refillingForm()
    }

    convertData( dt ){
        let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let date = new Date( dt * 1000)
        let month = months_arr[date.getMonth()]
        let day = date.getDate()
        let weekD = date.toString().split(" ")[0]
        return `${weekD} ${day} ${month}`
    }
}

customElements.define (
    "weather-element",
    WeatherElement
)
