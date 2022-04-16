document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
};

const quoteButton = document.getElementById("quoteButton")

quoteButton.addEventListener('click', () => {
    axios.get("http://localhost:4000/api/quote/")
        .then ((res) => {
            alert(res.data)
        });
})

const buddhasContainer = document.querySelector('#buddhas-container')

function createBuddhaCard(buddha) {
    const buddhaCard = document.createElement('div')
    const image = document.createElement('img')
    image.src = buddha.imageURL
    const caption = document.createElement('p')
    caption.textContent = buddha.caption
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = "Remove from the collection"
    deleteButton.classList.add('deleteButton')
    // buddhaCard.classList.add('buddha-card')
    buddhasContainer.append(buddhaCard)
    buddhaCard.append(image)
    buddhaCard.append(deleteButton)
    buddhaCard.append(caption)
    buddhaCard.append(document.createElement("br"))
    buddhaCard.append(document.createElement("br"))
    buddhaCard.append(document.createElement("br"))

}

const buddhasCallback = ({ data: buddhas }) => displayBuddhas(buddhas)

function displayBuddhas(buddhas) {
    buddhasContainer.innerHTML = ""
    for (let i = 0; i < buddhas.length; i++) {
        createBuddhaCard(buddhas[i])
    }
}

const getAllBuddhas = () => {
    axios
        .get("http://localhost:4000/api/buddhas/")
        .then(buddhasCallback)
        .catch(err => console.log(err.response.data))
    }
// const inputField = document.querySelector('input')
// movieTitle.textContent = inputField.value

const oneBuddhaCallback = ({ data: buddhas }) => displayOneBuddha(buddhas)

function displayOneBuddha(buddhas) {
    buddhasContainer.innerHTML = ""
    const input = document.getElementById('buddhaId')
    if (!buddhas[+input.value - 1]) {
        buddhasContainer.innerHTML = "(There is no Buddha with that Id)"
    } else {
        createBuddhaCard(buddhas[+input.value - 1])
    }
    input.value = ""
}

const getOneBuddha = () => {
    event.preventDefault()
    axios
        .get(`http://localhost:4000/api/buddhas/`)
        .then(oneBuddhaCallback)
        .catch(err => {
            // console.log(err.response.data)
            console.log(`to console --> There is no Buddha with that Id.`)
        })
    }

document.getElementById('getAllBuddhasButton').addEventListener('click', getAllBuddhas)
document.getElementById('getABuddhaButton').addEventListener('click', getOneBuddha)