const text = document.querySelector(".textInput")
const addBtn = document.querySelector(".addBtn")
const nav = document.querySelector(".nav")
const list = document.querySelector(".list")
const undoneNumber = document.querySelector(".undoneNumber")
const clearBtn = document.querySelector(".clearBtn")
const data = []

addBtn.addEventListener("click", addItem)
text.addEventListener("keyup", detectKey)
list.addEventListener("click", deleteItem)
list.addEventListener("click", changeItemState)
nav.addEventListener("click", changeCategory)
clearBtn.addEventListener("click", cleanDoneItems)

renderData()

function renderData(items) {
  let newList
  let str = ""
  if (data.length !== 0) {
    document.querySelector(".listWrap").style.display = "block"
  }

  if (items !== undefined) {
    newList = items
  } else {
    newList = data
  }

  newList.forEach((item, index) => {
    str += `
      <li>
        <a href="#" class=${item.isDone? "done":"undone"}></a>
        <p>${item.content}</p>
        <a href="#" class="deleteBtn" data-num="${index}">
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
  if (!text.value) {
    alert("請輸入待辦事項")
    return
  }
  const newItem = {
    content: text.value.trim(),
    isDone: false
  }
  data.push(newItem)
  renderData(data)
  text.value = ""
}

function deleteItem(e) {
  if (e.target.nodeName == "IMG") {
    const num = e.target.parentNode.getAttribute("data-num")
    data.splice(num, 1)
    renderData()
  }
}

function changeItemState(e) {
  if (e.target.nodeName == "A" || e.target.nodeName == "P") {
    let num = e.target.parentNode.childNodes[5].getAttribute("data-num")
    data[num].isDone = !(data[num].isDone)
    renderData()
  }
}

function changeCategory(e) {
  const catagories = document.querySelectorAll("[data-selected]")
  const activeItem = e.target.getAttribute("data-selected")
  catagories.forEach(item => {
    if (item.getAttribute("data-selected") == activeItem) {
      item.classList.add("active")
    } else {
      item.classList.remove("active")
    }
  })
  filterData(activeItem)
}

function filterData(catagories) {
  let items
  switch (catagories) {
    case "done":
      items = data.filter(item =>  item.isDone == true)
      break
    case "undone":
      items = data.filter(item => item.isDone == false)
      break
    default:
      items = data
  }
  renderData(items)
}

function cleanDoneItems() {
  for (let i = data.length - 1; i >= 0; i--){
    if (data[i].isDone == true) data.splice(i,1)
  }
  renderData()
}