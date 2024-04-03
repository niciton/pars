const { Sequelize, Op, Model, DataTypes } = require("sequelize");
// const DataTypes = require('sequelize/lib/data-types');
const env = require('dotenv').config().parsed;

module.exports = async function() 
{
  // const queryInterface = sequelize.getQueryInterface();

  const ProductType = sequelize.define('Njhsdj', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    price: {
      type: DataTypes.MEDIUMINT,
      defaultValue: 0,
    },
  });

  // const ProductTable = queryInterface.createTable('Product', {
  //   id: {
  //     type: DataTypes.INTEGER,
  //     primaryKey: true,
  //     autoIncrement: true,
  //   },
  //   name: {
  //     type: DataTypes.TEXT,
  //     defaultValue: "",
  //   },
  //   price: {
  //     type: DataTypes.MEDIUMINT,
  //     defaultValue: 0,
  //   },
  //   // analogs: {
  //   //   type: DataTypes.ARRAY,
  //   //   defaultValue: [],
  //   // },
  //   // bestAnalog: {
  //   //   type: DataTypes.JSON,
  //   //   defaultValue: [{}],
  //   // },
  //   // titleImage: {
  //   //   type: DataTypes.TEXT,
  //   //   defaultValue: "",
  //   // },
  //   // images: {
  //   //   type: DataTypes.ARRAY,
  //   //   defaultValue: [],
  //   // },
  // });

  await ProductType.create({
    // createdAt: "11.11.11",
    name: 'Видеокарта Palit NVIDIA GeForce RTXds 4060 DUAL (NE64060019P1-1070D)',
    price: 35575,
  });

  await sequelize.sync({ alter: true });

  // const Products = await Product.findAll();

  sequelize.close();
}

