class WeatherElement extends HTMLElement {
     constructor () {
        super()

        let weatherData

        let _city = this.getAttribute("city") || "Kharkiv"

        this.wrapper = document.createElement ( 'div' )
        this.wrapper.className = "wrapper"
    		this.wrapper.innerHTML = `
    			<div class="header-weather">
    				<div class="icon">
    					<img src="" alt="icon" class="current_icon">
    				</div>
    				<div class="description">
    					<span class="current_date">date</span>
    					<span class="current_city">city</span>
    					<span class="current_temp">temp</span>
    					<span class="current_desc">clouds</span>
    				</div>
    			</div>

    			<div class="additional_desc">
    				<div class="desc">
    					<span>Pressure</span>
    					<span>hPa</span>
    				</div>
    				<hr>
    				<div class="desc">
    					<span>Humidity</span>
    					<span>%</span>
    				</div>
    				<hr>
    				<div class="desc">
    					<span>Cloudiness</span>
    					<span>%</span>
    				</div>
    				<hr>
    				<div class="desc">
    					<span>Wind speed</span>
    					<span>meter/sec</span>
    				</div>
            <hr>
    				<div class="desc">
    					<span>Min temp</span>
    					<span>°C</span>
    				</div>
            <hr>
    				<div class="desc">
    					<span>Max temp</span>
    					<span>°C</span>
    				</div>
    			</div>

    			<div class="close">
    				<button class="btn">
              <hr class ="one">
              <hr class ="two">
    				</button>
    			</div>
        `

        this.shadow = this.attachShadow({mode: "open"})
        let style = document.createElement("style")
        style.textContent = `
            .wrapper{
      				max-width: 240px;
      				min-width: 240px;
      				border-radius: 30px;
      				margin: 0 auto;
      				display: flex;
      				justify-content: space-between;
      				align-items: center;
      				flex-direction: column;
      				padding: 10px;
      				box-shadow: 10px 10px 75px 2px rgba(0,0,0,0.62);
      				background: rgba(255,255,255,0.3);
      				font-size: 10px;
      				position: relative;
              margin: 0 2vw 2rem 2vw;
              transition: all .5s ease-in-out;
      			}
      			.header-weather{
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
      			.current_icon{
      				padding-left: 5px;
      				width: 100px;
      			}
      			.description span{
      				display: block;
      				margin-right: 10px;
      				text-align: center;
      			}
      			.current_city{
      				font-size: 22px;
              font-weight: bold;
      			}
      			.current_temp{
      				font-size: 44px;
      			}
      			.current_desc{
      				font-size: 18px;
      			}
      			.current_date{
      				font-size: 14px;
      			}

      			.additional_desc{
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

            .close  {
      				position: absolute;
      				top: -10px;
      				right: -10px;
      			}
            button{
              margin: 0 ;
       				padding: 0;
            }
      			.btn{
      				width: 20px;
      				height: 20px;
      				border-radius: 15px;
       				background: #ffffff00;
      				border-style: none;
       			  outline: none;
       				margin: 0 ;
       				padding: 0;
        			color: #00000040;
              transform: rotate(45deg);
      			}
            .one {
                border: 1px solid #000000;
                width: 15px;
                transform: rotate(90deg);
            }
            .two {
                border: 1px solid #000000;
                width: 15px;
                transform: translate(0px, -3px);
            }
        `

        this.shadow.appendChild ( style )
        this.shadow.appendChild ( this.wrapper )

        this.btnClose = this.shadow.children[1].children[2].children[0]
        this.btnClose.addEventListener("click", this.close.bind(this));

        this.setData( _city )

    }
    // readAttributes () {
  	// 	this._city = this.getAttribute( "city" ) || "Kharkiv";
  	// }

    // updateUI () {
    //     console.log (this.getAttribute("city"))
    //     this.setData(this.getAttribute("city"))
    // }

    initURL ( _city_ ) {
        let source = "http://api.openweathermap.org/data/2.5/weather?"
        let appid = "5ebc9334e1933914b46a2ba252a3ea99"
        let units = "metric"
        return `${source}q=${_city_}&appid=${appid}&units=${units}`
    }

    // async  promise ( param ) {
    //     var response
    //     await fetch ( param ).then(resp => response = resp)
    //     return new Promise ( function ( resolve, reject ) {
    //         console.log ("Status ",response.status)
    //         if (response.status === 200)
    //             resolve(response.json())
    //         else{
    //             console.log ("Status ",response.status)
    //             reject( response.message )
    //         }
    //     })
    // }

    async  promise ( param ) {
        let response = await fetch ( param )
        return new Promise ( function ( resolve, reject ) {
            response.status === 200 ?
                resolve( response.json() ) :
                reject( response.message )
        })
    }

    getData ( c ) {
        var URL = this.initURL( c )
        return  this.promise(URL)
                        .then ( response => {
                            this.weatherData = response
                        })
                        .catch (error => {
                            JSON.stringify(this.weatherData = {
                                "weather": [
                                  {
                                    "description": "Unknown",
                                    "icon": "Unknown"
                                  }
                                ],
                                "main": {
                                  "temp": "NaN",
                                  "pressure": "NaN",
                                  "humidity": "NaN",
                                  "temp_min": "NaN",
                                  "temp_max": "NaN"
                                },
                                "wind": {
                                  "speed": "NaN"
                                },
                                "clouds": {
                                  "all": "NaN"
                                },
                                "sys": {
                                  "country": "",
                                },
                                "dt": "NaN",
                                "name": "City not found"
                            })
                            console.error ( error )
                        })
    }

    updateDate() {
        let pic = this.shadow.lastElementChild.children[0].children[0]
        let wtr = this.shadow.lastElementChild.children[0].children[1]
        let additional = this.shadow.children[1].children[1]

        pic.children[0].src = `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        wtr.children[0].innerHTML = this.convertData(this.weatherData.dt)
        wtr.children[1].innerHTML = `${this.weatherData.name}, ${this.weatherData.sys.country}`
        wtr.children[2].innerHTML = `${Math.round(this.weatherData.main.temp)}°C`
        wtr.children[3].innerHTML = `${this.weatherData.weather[0].description}`

        additional.children[0].children[1].innerHTML = `${this.weatherData.main.pressure}hPa`
        additional.children[2].children[1].innerHTML = `${this.weatherData.main.humidity}%`
        additional.children[4].children[1].innerHTML = `${this.weatherData.clouds.all}%`
        additional.children[6].children[1].innerHTML = `${this.weatherData.wind.speed}m/s`
        additional.children[8].children[1].innerHTML = `${this.weatherData.main.temp_min}°C`
        additional.children[10].children[1].innerHTML = `${this.weatherData.main.temp_max}°C`
    }

    convertData( dt ){
        let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let date = new Date( dt * 1000)
        let month = months_arr[date.getMonth()]
        let day = date.getDate()
        let weekD = date.toString().split(" ")[0]
        return `${weekD} ${day} ${month}`
    }

    async setData (param) {
        await this.getData(param)
        await this.updateDate()
    }

    close () {
        this.remove()
    }
}

customElements.define (
    "weather-element",
    WeatherElement
)
//
// let elem = document.createElement ("weather-element")
// document.body.appendChild(elem)

// elem.setAttribute("city", "Kiev")
// elem.updateUI()
