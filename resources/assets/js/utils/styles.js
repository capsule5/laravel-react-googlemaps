import { injectGlobal } from 'styled-components';

injectGlobal`
  @font-face {
  font-family: 'CircularStd-Bold';
  src: url('./fonts/CircularStd-Bold.eot?#iefix') format('embedded-opentype'),  url('./fonts/CircularStd-Bold.otf')  format('opentype'),
	     url('./fonts/CircularStd-Bold.woff') format('woff'), url('./fonts/CircularStd-Bold.ttf')  format('truetype'), url('./fonts/CircularStd-Bold.svg#CircularStd-Bold') format('svg');
  font-weight: normal;
  font-style: normal;
  }

  @font-face {
    font-family: 'CircularStd-Book';
    src: url('./fonts/CircularStd-Book.eot?#iefix') format('embedded-opentype'),  url('./fonts/CircularStd-Book.otf')  format('opentype'),
        url('./fonts/CircularStd-Book.woff') format('woff'), url('./fonts/CircularStd-Book.ttf')  format('truetype'), url('./fonts/CircularStd-Book.svg#CircularStd-Book') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Circular-Black';
    src: url('./fonts/Circular-Black.eot?#iefix') format('embedded-opentype'),  url('./fonts/Circular-Black.woff') format('woff'), url('./fonts/Circular-Black.ttf')  format('truetype'), url('./fonts/Circular-Black.svg#Circular-Black') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
      font-family: 'Roboto';
      src: url('./fonts/robotomono-regular-webfont.woff2') format('woff2'),
          url('./fonts/robotomono-regular-webfont.woff') format('woff'),
          url('./fonts/robotomono-regular.ttf')  format('truetype');
      font-weight: normal;
      font-style: normal;
  }
`;
