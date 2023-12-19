let data = 'http://localhost:3000/data/'
let favorites = 'http://localhost:3000/favorites/'

const load = document.querySelector('.load')
const loadMore = document.querySelector('.load-more')
const cardList = document.querySelector('.card-list')
const cardWrapper = document.querySelector('.cards-wrapper')

let page = 1

const showData = (page) => {
    axios.get(`${data}?_page=${page}_limit=3`).then(response => {
        load.style.display = 'none'
        loadMore.style.display = 'block'
        response.data.forEach( item => {
            cardList.innerHTML += `
            <div class="card">
            <h2>${item.name}</h2>
            <div class="image">
                <img src=${item.image}>
            </div>
            <p>${item.description}.</p>
            <div class="buttons">
                <div class="top">
                    <button>Update</button>
                    <button>Delete</button>
                </div>
                <button>Add Favorites</button>
            </div>
            </div>`
        })
    })
}

// showData(page)

loadMore.onclick = () => {
    page ++
}

showData(page)

const alert = (type, message) => {
    let alert = document.createElement('div')
    alert.className = `alert-${type}`
    let icon = document.createElement('i')
    type == 'success' ? icon.className = 'bx bxs-check-circle' : icon.className = 'bx bxs-x-circle'
    let span = document.createElement('span')
    span.textContent = message

    alert.append(icon)
    alert.append(span)
    cardWrapper.append(alert)
}
alert('success', 'success')