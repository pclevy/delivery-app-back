const { Product, Type } = require('../models')
const ProductService = require('../services/ProductService')

class ProductController {
  async index (req, res) {
    const types = await Product.findAll()

    return res.json(types)
  }

  async listTypes (req, res) {
    const types = await Type.findAll({
      where: { product_id: req.params.id },
      attributes: ['id', 'name', 'image']
    })

    return res.json(types)
  }

  async show (req, res) {
    const product = await Product.findByPk(req.params.id)

    if (!product) {
      return res.status(404).json({
        error: 'Product not found'
      })
    }

    return res.json(product)
  }

  async store (req, res) {
    try {
      const product = await ProductService.upsert(req.body)

      return res.json(product)
    } catch (e) {
      return res.status(e.status || 500).json({ error: e.message })
    }
  }
}

module.exports = new ProductController()
