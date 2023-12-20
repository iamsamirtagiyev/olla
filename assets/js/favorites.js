let favorites = 'http://localhost:3000/favorites/'

const showFav = () => {
    axios.get(favorites).then(response => {
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

showFav()