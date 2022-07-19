const { product, user, category, productCategory } = require("../../models")

exports.addProduct = async (req, res) => {
    try {

        let { categoryId } = req.body;

        if (categoryId) {
            categoryId = categoryId.split(',');
        }

        let data = req.body
        let newProduct = await product.create({
            ...data,
            image: req.file.filename,
            idUser: req.user.id
        })

        if (categoryId) {
            const productCategoryData = categoryId.map((item) => {
                return { idProduct: newProduct.id, idCategory: parseInt(item) };
            });

            await productCategory.bulkCreate(productCategoryData);
        }

        let products = await product.findOne({
            where: {
                id: newProduct.id,
            },
            include: [
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password", "status"],
                    },
                },
                {
                    model: category,
                    as: 'categories',
                    through: {
                        model: productCategory,
                        as: 'bridge',
                        attributes: [],
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
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
            include: [
                {
                    model: category,
                    as: 'categories',
                    through: {
                        model: productCategory,
                        as: 'bridge',
                        attributes: [],
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
            ],
            attributes: {
                exclude: ['updatedAt', 'createdAt']
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
                products: products
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
            include: [
                {
                    model: category,
                    as: 'categories',
                    through: {
                        model: productCategory,
                        as: 'bridge',
                        attributes: [],
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });
        products = JSON.parse(JSON.stringify(products));

        products = {
            ...products,
            image: process.env.PATH_FILE + products.image,
        }

        res.status(200).send({
            status: "success",
            data: { products: products }
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
        const data = req.body

        await product.update(data, {
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

        await productCategory.destroy({
            where: {
                idProduct: id,
            },
        });

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