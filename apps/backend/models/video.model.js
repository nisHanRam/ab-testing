module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define("Video", {
    url: { type: DataTypes.STRING, allowNull: false, unique: true },
    thumbnail: { type: DataTypes.STRING, allowNull: false, unique: true },
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
    variant: { type: DataTypes.ENUM("male", "female"), allowNull: false },
    lessonId: { type: DataTypes.STRING, allowNull: false },
  });
  return Video;
};
