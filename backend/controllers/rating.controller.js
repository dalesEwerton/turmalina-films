const Rating = require('../models/rating.model');
const User = require('../models/user.model');
const Film = require('../models/film.model');
const CSV = require('csvtojson');

exports.loadFromCSV = async (req, res) => {
    const csvFilePath = './data/ratings.csv';
    const jsonArray = await CSV().fromFile(csvFilePath);

    for (let userRating of jsonArray) {

        try {
            let { movieId, userId, rating} = userRating;
            //Busca pelo _id do usuário e do filme no banco
            const user = await User.findOne({userId: userId});
            const movie = await Film.findOne({movieId: movieId});

            //salva com a referencia pro _id (ObjectID)
            const rat = new Rating({
                userId: user._id,
                filmId: movie._id,
                rate: rating
            });

            await rat.save();
            console.log(`Avaliacao fake ${rat._id} cadastrada com sucesso`);
        } catch (e) {
            console.log(e);
        }
    }
};

exports.rateFilm = async (req, res) => {
   
    try {
        const { userId, filmId, rate, comment } = req.body;
        
        await Rating.findOneAndUpdate({userId: userId, filmId: filmId}, {rate: rate, comment: comment}, {upsert: true});

        res.status(200).send({message: 'Avaliacao salva com sucesso.'})
    } catch (error) {
        res.status(500).send({error: error})
    } 

}

exports.getRatings = async (req, res) => {
    try {
        const { userId } = req.params.userId;
        let ratings = await Rating.find({userId: userId});
        res.status(200).send(ratings);
    } catch (error) {
        res.status(500).send({error: error})
    }
}

module.exports = exports;
