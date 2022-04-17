document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (res) {
          const data = res.data;
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
    buddhaCard.setAttribute('id',`buddhaCard${buddha.id}`)

    const image = document.createElement('img')
    image.src = buddha.imageURL
    const caption = document.createElement('p')
    caption.textContent = buddha.caption
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = "Remove from the collection"
    
    deleteButton.setAttribute('id',`deleteButton${buddha.id}`)

    buddhasContainer.append(buddhaCard)
    buddhaCard.append(image)
    buddhaCard.append(deleteButton)
    buddhaCard.append(caption)
    buddhaCard.append(document.createElement("br"))
    buddhaCard.append(document.createElement("br"))
    buddhaCard.append(document.createElement("br"))

    document.getElementById(`deleteButton${buddha.id}`).addEventListener('click', () => {
        console.log('listening to delete button')
        deleteBuddha(buddha.id)
    })
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
        .catch(err => console.log(err.res.data))
    }

const oneBuddhaCallback = ({ data: buddhas }) => displayOneBuddha(buddhas)

function displayOneBuddha(buddhas) {
    buddhasContainer.innerHTML = ""
    const input = document.getElementById('buddhaId')
    const index = buddhas.findIndex(elem => elem.id == +input.value)
    if (!buddhas[index]) {
        buddhasContainer.innerHTML = "(There is no Buddha with that Id)"
    } else {
        createBuddhaCard(buddhas[index])
        //buddhas.findIndex(elem => elem.id === +req.params.id)
    }
    input.value = ""
}

const getOneBuddha = () => {
    event.preventDefault()
    axios
        .get(`http://localhost:4000/api/buddhas/`)
        .then(oneBuddhaCallback)
        .catch(err => {
            // console.log(err.res.data)
            console.log(`to console --> There is no Buddha with that Id.`)
        })
    }

const deleteCallback = (res) => {
    const { buddhas, id } = res.data
    console.log('res: ', res.data)
    console.log(buddhas, id, buddhas[id-1])
    document.getElementById(`buddhaCard${id}`).remove()
}

const deleteBuddha = id => {
    console.log(id)
    axios  
        .delete(`http://localhost:4000/api/buddhas/${id}`)
        .then((res) => {
            deleteCallback(res)
        })
        .catch(err => {
            console.log(err)
        })
}
const updateCallback = res => {
    const { buddhas, id, index, caption } = res.data
    console.log('res.data.buddhas: ', buddhas)

    // const index = buddhas.findIndex(elem => elem.id == +id)
    // buddhas[index].caption = res.data.caption

    // we only need to live update (thats what this part is for) if there is buddha cards displayed. Otherwise its gonna get an error and wont do the rest of the code block.
    if (document.querySelector(`#buddhaCard${id}`)) {
        document.querySelector(`#buddhaCard${id}`).querySelector('p').innerText = caption
    }

    document.getElementById('buddhaIdToChange').value = ""
    document.getElementById('updateBuddhaText').value = ""
}

const updateBuddha = () => {
    event.preventDefault()

    let inputIdUpdate = document.getElementById('buddhaIdToChange').value
    let inputTextUpdate = document.getElementById('updateBuddhaText').value

    console.log(inputIdUpdate)

    axios
        .put(`http://localhost:4000/api/buddhas/${inputIdUpdate}`, {caption: inputTextUpdate})
        .then((res) => {
            console.log(res.data)
            updateCallback(res)
        })
        .catch(err => {
            console.log(err)
        })
}

document.getElementById('getAllBuddhasButton').addEventListener('click', getAllBuddhas)
document.getElementById('getABuddhaButton').addEventListener('click', getOneBuddha)
document.getElementById('updateBuddhaButton').addEventListener('click', updateBuddha)