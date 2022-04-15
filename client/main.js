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
    // buddhaCard.classList.add('buddha-card')
    buddhasContainer.append(buddhaCard)
    buddhaCard.append(image)
    image.src = buddha.imageURL

}

const buddhasCallback = ({ data: buddhas }) => displayBuddhas(buddhas)

function displayBuddhas(buddhas) {
    // buddhasContainer.innerHTML.remove()
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

getAllBuddhas()
