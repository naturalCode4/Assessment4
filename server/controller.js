let buddhas = require('./buddhas.json')

globalId = buddhas.length + 1

module.exports = {
    getBuddhas: (req, res) => res.status(200).send(buddhas),

    // deleteBuddha: (req, res) => {
    //     let index = buddhas.findIndex(elem => elem.id === +req.params.id)
    //     buddhas.splice(index, 1)
    //     res.status(200).send(buddhas)
    // },

    // createBuddha: (req, res) => {
    //     let { imageURL } = req.body
    //     let newBuddha = {
    //         id: globalId,
    //         imageURL
    //     }
    //     buddhas.push(newBuddha)
    //     res.status(200).send(buddhas)
    // },

//     updateMovie: (req, res) => {
//         let { id } = req.params
//         let { type } = req.body
//         let index = buddhas.findIndex(elem => +elem.id === +id)

//         if (movies[index].rating === 5 && type === 'plus') {
//             res.status(400).send('cannot go above 5')
//         } else if (movies[index].rating === 0 && type === 'minus') {
//             res.status(400).send('cannot go below 0')
//         } else if (type === 'plus') {
//             movies[index].rating++
//             res.status(200).send(movies)
//         } else if (type === 'minus') {
//             movies[index].rating--
//             res.status(200).send(movies)
//         } else {
//             res.sendStatus(400)
//         }
//     }
}