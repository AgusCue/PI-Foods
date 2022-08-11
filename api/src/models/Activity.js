const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "activity",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      difficulties: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },

      duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      category: {
        type: DataTypes.ENUM(
          "sports",
          "sightseeing",
          "foods",
          "dances",
          "other"
        ),
        allowNull: false,
      },

      season: {
        type: DataTypes.ARRAY(
          DataTypes.ENUM("Summer", "Autumn", "Winter", "Spring")
        ),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
