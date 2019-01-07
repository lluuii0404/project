class MyErrorElement extends HTMLElement {
     constructor () {
        super()

        this.param = this.getAttribute("city")
        this.paramStl = `
            font-size: 25px;
            color: #55f;
        `

        this.wrapper = document.createElement ( 'div' )
        this.wrapper.className = "error-block"
        this.wrapper.innerHTML = `<span>You entered don't wrong city name <i style='${this.paramStl}'>${this.param}</i>. Please, try again</span>`

        this.shadow = this.attachShadow({ mode: "closed" })
        let style = document.createElement("style")
        style.textContent = `
                        .error-block {
                           display: flex;
                           align-items: center;
                           border-radius: 30px;
                           box-shadow: 10px 10px 75px 2px #00000062;
                           margin: 0;
                           background: #ffffff;
                           text-align: center;
                           transition: all .5s ease-in-out;
                           padding: 10px 25px;
                           color: #333;
                           font-size: 23px;
                        }
        `
        this.shadow.appendChild ( style )
        this.shadow.appendChild ( this.wrapper )

        this.showElement()
    }
    showElement(){
        TweenLite.fromTo( this.wrapper, .15, {
                width: "0px",
                height: "0px"
            }, {
                width: "275px",
                height: "150px"
            })
    }

}

customElements.define (
    "error-element",
    MyErrorElement
)
