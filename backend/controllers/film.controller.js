const Film = require('../models/film.model');
const CSV = require('csvtojson');

exports.loadFromCSV = async (req, res) => {
    const csvFilePath = './data/movies.csv';
    const jsonArray = await CSV().fromFile(csvFilePath);

    for (let movie of jsonArray) {

        try {
            const { movieId, title } = movie;
            const index = title.lastIndexOf(')');
            const year = title.substring(index-4, index);
            const genres = movie.genres.replace('(no genres listed)', '').split('|');

            const mov = new Film({movieId, title, year, genres});

            await mov.save();
            console.log(`Filme fake nº ${movieId} cadastrado com sucesso`);
        } catch (e) {
            console.log(e);
        }
    }
};

module.exports = exports;