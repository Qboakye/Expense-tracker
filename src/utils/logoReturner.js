import { overviewSvgArray, reportsSvgArray } from "../assets/svgArray";

export const overviewLogo = (data) => {
  return data.map((item) => {
    for (let i = 0; i < overviewSvgArray.length; i++) {
      if (item.category === overviewSvgArray[i].name) {
        return { ...item, img: overviewSvgArray[i].img[0] };
      }
    }
    return { ...item, img: overviewSvgArray[0].img[0] };
  });
};

export const reportsLogo = (data) => {
  return data.map((item) => {
    for (let i = 0; i < reportsSvgArray.length; i++) {
      if (item.category === reportsSvgArray[i].name) {
        return { ...item, img: reportsSvgArray[i].img[0] };
      }
    }
    return { ...item, img: reportsSvgArray[0].img[0] };
  });
};
