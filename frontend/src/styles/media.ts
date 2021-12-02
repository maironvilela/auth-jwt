const screenSizes = {
  desktop: 1170,
  tablet: 1023,
  smartphone: 767,
};

/**
 *
 * @param labelSize Define o tamanho do dispositivo (large, desktop, tablet, mobile)
 * @returns dimensão do dispositivo em rem
 */
export const media = (labelSize: string) => {
  return `${screenSizes[labelSize] / 16}rem`;
};
