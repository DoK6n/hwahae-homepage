import { Global, css } from '@emotion/react'

const GlobalStyles = () => (
  <Global
    styles={css`
      @font-face {
        font-family: 'Spoqa Han Sans';
        src: url('/public/fonts/SpoqaHanSansRegular.woff2') format('woff2'),
          url('/public/fonts/SpoqaHanSansRegular.woff') format('woff'),
          url('/public/fonts/SpoqaHanSansRegular.ttf') format('truetype');
        font-weight: 400;
      }
      @font-face {
        font-family: 'Spoqa Han Sans';
        src: url('/public/fonts/SpoqaHanSansBold.woff2') format('woff2'),
          url('/public/fonts/SpoqaHanSansBold.woff') format('woff'),
          url('/public/fonts/SpoqaHanSansBold.ttf') format('truetype');
        font-weight: 700;
      }
      @font-face {
        font-family: 'Montserrat';
        src: url('/public/fonts/Montserrat-Regular.woff') format('woff');
        font-weight: 400;
      }
      @font-face {
        font-family: 'Montserrat';
        src: url('/public/fonts/Montserrat-Medium.woff') format('woff');
        font-weight: 500;
      }
      @font-face {
        font-family: 'Montserrat';
        src: url('/public/fonts/Montserrat-SemiBold.woff') format('woff');
        font-weight: 600;
      }
      @font-face {
        font-family: 'Montserrat';
        src: url('/public/fonts/Montserrat-Bold.woff') format('woff');
        font-weight: 700;
      }
    `}
  />
)

export default GlobalStyles
