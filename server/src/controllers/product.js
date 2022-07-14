const { product, user } = require("../../models")

exports.addProduct = async (req, res) => {
    try {
            
        let data = req.body
        let newProduct = await product.create({
            ...data,
            image: req.file.filename,
            idUser: req.user.id
        })

        let products = await product.findOne({
            where: {
                id: newProduct.id,
            },
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password","status"],
                    },
                }
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "idUser"],
            },
        });

        res.status(200).send({
            status: "succes",
            data: {
                products
            }
        })
    } catch (error) {
        res.status(400).send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.getProducts = async (req, res) => {
    try {
        let products = await product.findAll({

            attributes: {
                exclude: ['updatedAt', 'createdAt','idUser']
            }
        })

        products = JSON.parse(JSON.stringify(products))
        products = products.map((item) => {
            return {
                ...item,
                image: process.env.PATH_FILE + item.image
            }
        })

        res.status(200).send({
            status: "succes",
            data: {
                products:products
            }
        })
    } catch (error) {
        res.status(400).send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        let products = await product.findOne({
            where: { id },
            attributes: {
                exclude: ["createdAt", "updatedAt",'idUser'],
            },
        });
        products = JSON.parse(JSON.stringify(products));

        products = {
            ...products,
            image: process.env.PATH_FILE + products.image,
        }

        res.status(200).send({
            status: "success",
            data: {products:products}
        });
    } catch (error) {
        res.status(400).send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const p = req.body

        await product.update(p, {
            where: {
                id
            }
        })

        const products = await product.findOne({
            where: {
                id: id
            },
            attributes: {
                exclude: ['updatedAt', 'createdAt','idUser']
            }
        })

        res.status(200).send({
            status: "success",
            data: {
                products
            }
        })

    } catch (error) {
        res.status(400).send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        await product.destroy({
            where: {
                id
            }
        })

        res.status(200).send({
            status: "success",
            data: {
                id
            }
        })
    } catch (error) {
        res.status(400).send({
            status: "failed",
            message: "server error"
        })
    }
}