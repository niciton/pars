const { Sequelize, Op, Model, DataTypes } = require("sequelize");
// const DataTypes = require('sequelize/lib/data-types');
const env = require('dotenv').config().parsed;

(async () =>
{
  const sequelize = new Sequelize(env.MYSQL_DB_NAME, env.MYSQL_USER, env.MYSQL_PASSWORD, {
    dialect: "mariadb",
    host: "localhost",
    port: env.MYSQL_PORT,
  });

  const tableNames = {
    product: "Products",
    merchant: "Merchants",
  };

  const queryInterface = sequelize.getQueryInterface();
  // await queryInterface.createTable(tableNames.product, {
  //   id: {
  //     type: DataTypes.NUMBER,
  //     autoIncrement: true,
  //     primaryKey: true,
  //   },
  //   offerId: {
  //     type: DataTypes.NUMBER,
  //     defaultValue: 0,
  //   },
  //   goodsId: {
  //     type: DataTypes.TEXT,
  //     defaultValue: ""
  //   },
  //   name: {
  //     type: DataTypes.STRING,
  //     defaultValue: ""
  //   },
  //   description: {
  //     type: DataTypes.TEXT,
  //     defaultValue: "",
  //   },
  //   slug: {
  //     type: DataTypes.TEXT,
  //     defaultValue: "",
  //   },
  //   price: {
  //     type: DataTypes.NUMBER,
  //     defaultValue: 0,
  //   },
  //   bonusPercent: {
  //     type: DataTypes.NUMBER,
  //     defaultValue: 0,
  //   },
  //   bonusAmount: {
  //     type: DataTypes.NUMBER,
  //     defaultValue: 0,
  //   },
  //   primeBonusPercent: {
  //     type: DataTypes.NUMBER,
  //     defaultValue: 0,
  //   },
  //   primeBonusAmount: {
  //     type: DataTypes.NUMBER,
  //     defaultValue: 0,
  //   },
  //   merchantId: {
  //     type: DataTypes.NUMBER,
  //     defaultValue: 0,
  //   },
  //   delivery: {
  //     type: DataTypes.TEXT,
  //     defaultValue: '{"type": 0, "text": "завтра или позже"}',
  //     get()
  //     {
  //       let data = '{"type": 0, "text": "завтра или позже"}';

  //       try
  //       {
  //         data = JSON.parse(this.getDataValue("delivery"));
  //       } catch (e)
  //       {
  //         console.log(e);
  //       }

  //       data.type = data?.type || 0;
  //       data.text = data?.text || "завтра или позже";

  //       return data;
  //     },
  //     set(val)
  //     {
  //       val = val || {};

  //       const data = {
  //         type: val.type || 0,
  //         text: val.text || "завтра или позже",
  //       };

  //       this.setDataValue("delivery", JSON.stringify(data));
  //     },
  //   },
  // });

  // запись в таблицу
  // await queryInterface.bulkInsert("Person", [{
  //   name: "lkjsfh",
  // }], {});

  const Product = sequelize.define(tableNames.product, {
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    offerId: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },
  },{ tableNames: tableNames.product });

  await Product.sync();

  // await queryInterface.addColumn(tableNames.product, "delivery", {
  //   type: DataTypes.TEXT,
  //   defaultValue: '{"type": 0, "text": "завтра или позже"}',
  //   get()
  //   {
  //     let data = '{"type": 0, "text": "завтра или позже"}';

  //     try
  //     {
  //       data = JSON.parse(this.getDataValue("delivery"));
  //     } catch (e)
  //     {
  //       console.log(e);
  //     }

  //     data.type = data?.type || 0;
  //     data.text = data?.text || "завтра или позже";

  //     return data;
  //   },
  //   set(val)
  //   {
  //     val = val || {};

  //     const data = {
  //       type: val.type || 0,
  //       text: val.text || "завтра или позже",
  //     };

  //     this.setDataValue("delivery", JSON.stringify(data));
  //   },
  // },)

  sequelize.close();
})()

