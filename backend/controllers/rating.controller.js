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

module.exports = exports;
