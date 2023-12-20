let data = 'http://localhost:3000/data/'
let favorites = 'http://localhost:3000/favorites/'

//--------------> DOM <--------------

const load = document.querySelector('.load')
const cardList = document.querySelector('.card-list')
const cardWrapper = document.querySelector('.cards-wrapper')
const modal = document.querySelector('.modal')
const form = document.querySelector('form')
const name = document.querySelector('.name')
const description = document.querySelector('.description')
const img = document.querySelector('#image')
const image = form.querySelector('label img')
const btn = form.querySelector('button')
const addBtn = document.querySelector('.add-btn')
const favBtn = document.querySelector('.fav-btn')

const showData = () => {
    axios.get(data).then(response => {
        load.style.display = 'none'
        response.data.forEach(item => {
            cardList.innerHTML += `
            <div class="card" id="card">
            <h2>${item.name}</h2>
            <div class="image">
                <img src=${item.image}>
            </div>
            <p>${item.description}.</p>
            <div class="buttons">
                <div class="top">
                    <button onclick="update(${item.id})">Update</button>
                    <button onclick="deleteItem(${item.id})">Delete</button>
                </div>
                <button onclick="addFavorite(${item.id})">Add Favorites</button>
            </div>
            </div>`
        })
    })
}

showData()

//--------------> Alert <--------------

const showAlert = (type, message) => {
    let alert = document.querySelector(`.alert-${type}`)
    type == 'success' ? alert.querySelector('i').className = 'bx bxs-check-circle' : alert.querySelector('i').className = 'bx bxs-x-circle'
    alert.querySelector('span').textContent = message

    alert.classList.add('active')
    setTimeout(() => {
        alert.classList.remove('active')
    }, 3000);
}

//--------------> Open Modal <--------------

const openModal = () => {
    modal.classList.add('active')
    form.classList.add('active')
    modal.onclick = (e) => {
        if (e.target.classList.contains('container') || e.target.classList.contains('modal')) {
            modal.classList.remove('active')
            form.classList.remove('active')
        }
    }
}

//--------------> Update <--------------

const update = (id) => {
    openModal()
    btn.textContent = 'Update'

    axios.get(data + id).then(response => {
        image.src = response.data.image
        name.value = response.data.name
        description.value = response.data.description
    })

    form.onsubmit = (e) => {
        e.preventDefault()
        if (name.value != '' && description.value != '') {
            let reader = new FileReader
            reader.readAsDataURL(img.files[0])
            reader.onload = (e) => {
                axios.patch(data + id, {
                    name: name.value,
                    description: description.value,
                    image: e.target.result
                }).then(response => {
                    showAlert('success', 'element successfully updated')
                    modal.classList.remove('active')
                    form.classList.remove('active')
                    setTimeout(() => {
                        window.location.reload()
                    }, 4000);
                })
            }
        }
        else {
            showAlert('error', 'please fill in the boxes')
        }
    }
}

img.onchange = () => {
    image.src = URL.createObjectURL(img.files[0])
}

//--------------> Add <--------------

addBtn.onclick = () => {
    openModal()
    btn.textContent = 'Add'

    form.onsubmit = (e) => {
        e.preventDefault()
        if (name.value != '' && description.value != '') {
            let reader = new FileReader
            reader.readAsDataURL(img.files[0])
            reader.onload = (e) => {
                axios.post(data, {
                    name: name.value,
                    description: description.value,
                    image: e.target.result
                }).then(response => {
                    modal.classList.remove('active')
                    form.classList.remove('active')
                    showAlert('success', 'Item added successfully')
                })
            }
        }
        else {
            showAlert('error', 'please fill in the boxes')
        }
    }
}

//--------------> Delete <--------------

const deleteItem = (id) => {
    axios.delete(data+id).then(response => {
        showAlert('success', 'item deleted successfully')
        setTimeout(() => {
            window.location.reload()
        }, 4000);
    })
}

//--------------> Add Favorite <--------------

const addFavorite = (id) => {
    axios.get(data+id).then(response => {
        axios.post(favorites, response.data).then(res => {
            showAlert('success', 'item added to favorites')
        })
    })
}

//--------------> Favorites Page <--------------

favBtn.onclick = () => {
    window.location = 'favorite.html'
}