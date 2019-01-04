'use strict'

let context = document.querySelector(".context")
context.appendChild(
  document.createElement ("weather-element")
)

let search = document.querySelector(".search")
let _textInput = document.querySelector("input[type='text']");
_textInput.addEventListener("keyup", keyUpHandler)

let _inpCity = document.getElementsByClassName("search")[0].children[0]
_inpCity.addEventListener ("change", createNewElemHandler)

let _btnCity = document.getElementsByClassName("search")[0].children[1]
_btnCity.addEventListener ("click", createNewElemHandler)


function testUsertext (param) {
  return param.split("<").join("&lt;")
}

function keyUpHandler (event) {
  search.setAttribute("data-text", event.target.value);
  // _textInput.removeEventListener("keyup", keyUpHandler)
}

function createNewElemHandler (event) {
    event.stopPropagation()
    search.setAttribute("data-text", "");

    context.innerHTML += `<weather-element city="${testUsertext(_inpCity.value)}"></weather-element>`

    _inpCity.value = ""

    event === "change" ?
      _inpCity.removeEventListener ("change", createNewElemHandler) :
      _btnCity.removeEventListener ("click", createNewElemHandler)
}
