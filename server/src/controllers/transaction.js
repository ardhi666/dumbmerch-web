const {transaction, user, product} = require("../../models")

exports.addTransaction = async (req, res) => {

    try {
        let data = req.body

        let newTransaction = await transaction.create({
            ...data,
            idBuyer: req.user.id,
            status:"success"
        })

        let transactions = await transaction.findOne({
            where:{
                id: newTransaction.id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt",'status'],
            }
        })

        res.send({
            status: 'success',
            data:{
                transactions
            }
            
        })
    } catch (error) {
        res.status(400).send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.getTransactions = async (req, res) => {
    try {
        let transactions = await transaction.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idBuyer', 'idSeller', 'idProduct']
            },
            include: [
                {
                    model: product,
                    as: 'product',  
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'idUser', 'qty', 'price']
                    }
                },
                {
                    model: user,
                    as: 'buyer',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status']
                    }
                },
                {
                    model: user,
                    as: 'seller',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status']
                    }
                }
            ]
        })

        res.status(200).send({
            status: 'success',
            data:{
                transactions
            }
        })
    } catch (error) {
        res.status(400).send({
            status: "failed",
            message: "server error"
        })
    }
}