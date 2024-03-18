// Import necessary packages
import { Sequelize, DataTypes } from 'sequelize';

// Define the connection configuration
const sequelize = new Sequelize('user', 'postgres', 'bsc16190', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
  });
// Define the model structure and properties
const User = sequelize.define('pdf2Image', {
  // Define attributes
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  account_number: {
    unique: true,
    type: DataTypes.STRING,
    allowNull: false
  },
  pdfData1: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  pdfData2: {
    type: DataTypes.ARRAY(DataTypes.STRING), 
    allowNull: false
  }
});

// Synchronize the model with the database
(async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();

export { User };
