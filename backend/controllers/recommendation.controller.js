const Film = require('../models/film.model');
const User = require('../models/user.model');

exports.getRecommendation = async (userId) => {
    /*
    Dataset com:
        id_user1 : {
            id_film1 : 5,
            id_film2 : 3,
            id_film3 : 4
        },
        id_user2 : {
            ...
        },
        ...
     */
    let dataset = await makeDataset();

    const targetRatings = dataset[userId];
    
    /*
    id_user1: similaridade,
    id_user2: similaridade,
    ...
    */
    let similarities = {}
    
    for (usId in dataset) {
        if (usId !== userId) {
            let sim = euclideanSimilarity(targetRatings, dataset[usId])
            similarities[usId] = sim;
        }
    }
    let similarUsers = getMostSimilars(similarities, 5);

    let movies = getMovies(similarUsers, dataset, targetRatings);

    let recommendation = [];
    for (item in movies) {
        let movId = movies[item][0];
        let mov = await Film.find({_id: movId});
        recommendation.push(mov);
    }
    return recommendation;
}

getMovies = (similarUsers, dataset, targetRatings) => {
    let movies = [];
    for (let simUser in similarUsers) {
        for (mov in dataset[similarUsers[simUser][0]]) {
            //Exclui da recomendacao filmes ja avaliados pelo target
            if (!movies.includes(mov) && !targetRatings[mov]){
                movies.push(mov);
            }  
        }
    }
    // Calcula relevancia: rel = somatorio(avaliacao_do_usuario_x * similaridade_do_usuario_x)
    let moviesRelevances = []
    for (mov in movies) {
        let relevance = 0;
        for (let user in similarUsers) {
            let ratings = dataset[similarUsers[user][0]];
            let rate = ratings[movies[mov]];
            
            
            if (rate) {
                relevance += similarUsers[user][1] * rate;
            }            
        }
        if (relevance > 0.4) {
            moviesRelevances.push([movies[mov], relevance]);
        }        
    }

    // Ordena por relevancia
    moviesRelevances.sort(function(first, second) {
    return second[1] - first[1];
    });

    return moviesRelevances;
}

getMostSimilars = (similarities, k) => {
    let items = Object.keys(similarities).map(function(key) {
        return [key, similarities[key]];
      });
      
    items.sort(function(first, second) {
    return second[1] - first[1];
    });
    
    return items.slice(0, k);
}

euclideanSimilarity = (targetRatings, otherUserRatings) => {
    let coef = 0;

    if (targetRatings.length == 0) {
        return 0;
    }

    for (let rating in targetRatings){
        if (rating in otherUserRatings){
            coef += Math.pow(targetRatings[rating] - otherUserRatings[rating], 2)
        } else {
            coef += Math.pow(targetRatings[rating], 2)
        }
    }

    return 1 / (1 + Math.sqrt(coef));
}

makeDataset = async () => {
    let dataset = {};
    let users = await User.aggregate([
        {
            $lookup:
              {
                from: 'ratings',
                localField: '_id',
                foreignField: 'userId',
                as: 'ratings'
              }
         }       
    ])

    for (user in users) {
        let ratings = users[user].ratings;
        let rating_dict = {}
        for (rat in ratings) {
            let filmId = ratings[rat].filmId;
            let rate = ratings[rat].rate;
            rating_dict[filmId] = rate;
        }
        dataset[users[user]._id] = rating_dict;
    }

    return dataset;
}