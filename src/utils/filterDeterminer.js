export const filterDeterminer = (category, categories) => {
  for (let value in categories) {
    for (let i = 0; i < categories[value].length; i++) {
      if (categories[value][i] === category) {
        return value;
      }
    }
  }
};
