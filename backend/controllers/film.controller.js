const Film = require('../models/film.model');
const CSV = require('csvtojson');

exports.loadFromCSV = async (req, res) => {
    const csvFilePath = './data/movies.csv';
    const jsonArray = await CSV().fromFile(csvFilePath);

    const linksPath = './data/links.csv';
    const jsonLinksArray = await  CSV().fromFile(linksPath);

    console.log(jsonLinksArray[1], jsonArray[1]);

    for (let index = 0; index < jsonArray.length; index++) {
        let movie = jsonArray[index];
        let links = jsonLinksArray[index];
        try {
            const { movieId, title } = movie;
            const index = title.lastIndexOf(')');
            const year = title.substring(index-4, index);
            const genres = movie.genres.replace('(no genres listed)', '').split('|');

            const mov = new Film({
                movieId: movieId,
                title: title,
                year: year,
                genres: genres,
                imdbId: links.imdbId,
                tmdbId: links.tmdbId
            });

            await mov.save();
            console.log(`Filme fake nº ${movieId} cadastrado com sucesso`);
        } catch (e) {
            console.log(e);
        }
    }

    return res.status(200).send('Filmes Cadastrados');
};

module.exports = exports;
