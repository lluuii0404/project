'use strict'

let context = document.querySelector(".context")
context.appendChild(
    document.createElement ("weather-element")
)

let search = document.querySelector(".search")
let _textInput = document.querySelector("input[type='text']");
_textInput.onkeyup = function (event) {
    search.setAttribute("data-text", event.target.value);
}

function testUsertext (param) {
    return param.split("<").join("&lt;")
}

let _inpCity = document.querySelector("input")
_inpCity.onchange = function (event) {
    search.setAttribute("data-text", "");
    context.innerHTML += `<weather-element city="${testUsertext(_inpCity.value)}"></weather-element>`
    _inpCity.value = ""
}
