const text = document.querySelector(".textInput")
const addBtn = document.querySelector(".addBtn")
const nav = document.querySelector(".nav")
const catagories = document.querySelectorAll("[data-selected]")
const list = document.querySelector(".list")
const undoneNumber = document.querySelector(".undoneNumber")
const clearBtn = document.querySelector(".clearBtn")
const msg = ["哎呀，您還沒輸入待辦事項喔！", "咦，怎麼空白？再試一次！", "嗨~您是不是忘了打字？？", "要做的事可能被我吃了，不然您再輸入一次？"]

let data = []
let category = "all"

addBtn.addEventListener("click", addItem)
text.addEventListener("keyup", detectKey)
list.addEventListener("click", deleteItem)
list.addEventListener("click", changeItemState)
nav.addEventListener("click", detectCategory)
clearBtn.addEventListener("click", cleanDoneItems)

renderData()

function renderData() {
  let newList
  let str = ""

  if (data.length !== 0) {
    document.querySelector(".listWrap").style.display = "block"
  }

  switch (category) {
    case "done":
      newList = data.filter(item =>  item.isDone == true)
      break
    case "undone":
      newList = data.filter(item => item.isDone == false)
      break
    default:
      newList = data
  }

  newList.forEach((item) => {
    str += `
      <li>
        <a href="#" class=${item.isDone? "done":"undone"}></a>
        <p>${item.content}</p>
        <a href="#" class="deleteBtn" data-id="${item.id}">
          <img src="img/cancel.jpg"></img>
        </a>
      </li>
    `
  })

  list.innerHTML = str
  updateUndoneNumber()
}

function updateUndoneNumber() {
  const undone = data.filter(item => item.isDone == false)
  undoneNumber.textContent = undone.length
}

function detectKey(e){
  if (e.key !== "Enter") return
  addItem()
}

function addItem() {
  if (!text.value.trim()) {
    const num = Math.floor(Math.random()*msg.length)
    text.setAttribute("placeholder", msg[num])
    return
  }
  const newItem = {
    content: text.value.trim(),
    isDone: false,
    id: Date.now()
  }
  data.push(newItem)
  renderData()
  text.value = ""
  text.setAttribute("placeholder", "新增待辦事項")
}

function deleteItem(e) {
  if (e.target.nodeName == "IMG") {
    const id = e.target.parentNode.getAttribute("data-id")
    const num = data.findIndex(item => item.id == id)
    data.splice(num, 1)
    renderData()
  }
}

function changeItemState(e) {
  if (e.target.nodeName == "A" || e.target.nodeName == "P") {
    const id = e.target.parentNode.childNodes[5].getAttribute("data-id")
    const num = data.findIndex(item => item.id == id)
    data[num].isDone = !(data[num].isDone)
  }

  const undoneNum = data.filter(item => item.isDone === false).length
  if (undoneNum === 0 || undoneNum === data.length) category = "all"
  changeCategory()
}

function detectCategory(e) {
  category = e.target.getAttribute("data-selected")
  changeCategory()
}

function changeCategory() {
  catagories.forEach(item => {
    if (item.getAttribute("data-selected") == category) {
      item.classList.add("active")
    } else {
      item.classList.remove("active")
    }
  })
  renderData()
}

function cleanDoneItems() {
  data = data.filter(item => item.isDone === false)
  category = "all"
  changeCategory()
}