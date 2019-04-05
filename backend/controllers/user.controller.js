const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

function generateToken(user){
    return jwt.sign({user}, 'secret_key', {
        expiresIn: 86400
    });
}

exports.verifyToken = async(req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send({error: "Token não fornecido."});
    jwt.verify(token, 'secret_key', (err, decoded) => {
        req.user = decoded.user;
        if (err) return res.status(403).send({error: 'Falha ao autenticar token.' });
        next();
    });
}

exports.create = async(req, res) => {

    const {email} = req.body;

    try{

        if ( await User.findOne({ email })){
            return res.status(400).send({ error: "Usuário já existe."});
        }

        let user = await User.create(req.body);

        user.password = undefined;

        res.send({user, token: generateToken(user)});

    } catch (e) {
        res.status(400).send({error: 'Falha no cadastro. ' + e});
    }
};

exports.update = async(req, res) => {

    const loggedUser = req.user;
    const { _id } = req.body;

    try {

        if (loggedUser._id == _id) await User.findOneAndUpdate({_id: _id}, req.body);

        else throw new Error('Você precisa estar logado para atualizar o usuário.')

        res.status(200).send({message: 'Atualizado com sucesso.'});

    } catch (e) {
        return res.status(400).send({error: 'Falha na atualizacao. ' + e});
    }
};

exports.delete = async(req, res) => {

    const loggedUser = req.user;

    try {
        let result;

        if (loggedUser._id == req.params.id) result = await User.deleteOne({_id: req.params.id});
        
        else throw new Error('Você precisa estar logado para deletar o usuário.')

        if (result != undefined && result.n > 0) res.status(200).send({message: 'Deletado com sucesso.'});

        else res.status(400).send({error: 'Falha ao remover. Usuário não encontrado.'})

    } catch (e) {
        res.status(400).send({error: 'Falha ao remover. ' + e});
    }
}

exports.getOne = async (req, res) => {
    try {
        let user = await User.findById({_id: req.params.id});

        res.status(200).send(user);
    } catch (e) {
        res.status(400).send({error: e});
    }
}

exports.getAll = async (req, res) => {
    try {
        let users = await User.find({});

        res.status(200).send(users);
    } catch (e) {
        res.status(400).send({error: e});
    }
}

module.exports = exports;