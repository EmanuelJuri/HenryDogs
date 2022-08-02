const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('temperament', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },      
  },
  {
    timestamps: false,
    createdAt: false,    
  }
  );
};

// **---Temperamento con las siguientes propiedades:
// ID
// Nombre