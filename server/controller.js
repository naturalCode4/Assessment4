let buddhas = require('./buddhas.json')

newGlobalId = buddhas[buddhas.length - 1].id + 1

module.exports = {
    getBuddhas: (req, res) => res.status(200).send(buddhas),

    getOneBuddha: (req, res) => res.status(200).send(buddhas),

    deleteBuddha: (req, res) => {
        let index = buddhas.findIndex(elem => elem.id === +req.params.id)
        buddhas.splice(index, 1)
        res.status(200).send({buddhas, id: +req.params.id})
    },

    // createBuddha: (req, res) => {
    //     let { imageURL } = req.body
    //     let newBuddha = {
    //         id: globalId,
    //         imageURL
    //     }
    //     buddhas.push(newBuddha)
    //     res.status(200).send(buddhas)
    // },

updateBuddha: (req, res) => {

    let index = buddhas.findIndex(elem => elem.id == +req.params.id)

    if (!buddhas[index]) {
        console.log('that buddha doesnt exist')
        res.status(400).send({errorMessage: 'that buddha doesnt exist'})
        console.log(buddhas)
        return
    }
    if (req.body.caption.length === 0) {
        console.log('no update made. caption length equals 0')
        res.sendStatus(400)
        console.log(buddhas)
        return
    }

    console.log(req.body)
    
    buddhas[index].caption = req.body.caption
    console.log('updated: ', buddhas[index])

    res.status(200).send({buddhas: buddhas, id: +req.params.id, index: index, caption: req.body.caption})
    
    console.log(buddhas)
    }
}