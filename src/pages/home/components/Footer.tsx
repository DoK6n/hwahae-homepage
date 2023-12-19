import styled from '@emotion/styled'
import { media } from '../../../lib/media'

export default function Footer() {
  return (
    <FooterBlock style={{ marginTop: 100 }}>
      <FooterInner>
        <FooterLogo>
          <span className='blind'>BIRD VIEW</span>
        </FooterLogo>
        <FooterAddress>
          <address>서울특별시 서초구 서초대로 396, 19층(서초동, 강남빌딩)</address>
          <FooterAddressDesc>
            <FooterAddressText>사업자등록번호</FooterAddressText>232-81-00912
          </FooterAddressDesc>
        </FooterAddress>
        <FooterContents>
          <FooterContentsList>
            <FooterContentsItem>
              <FooterInfoText>대표</FooterInfoText>이웅
            </FooterContentsItem>
            <FooterContentsItem>
              <FooterInfoText>대표번호</FooterInfoText>1811-4472
            </FooterContentsItem>
          </FooterContentsList>
          <FooterContentsList>
            <FooterContentsItem>문의하기</FooterContentsItem>
            <FooterContentsItem>광고/제휴문의</FooterContentsItem>
            <FooterContentsItem>파트너센터</FooterContentsItem>
          </FooterContentsList>
        </FooterContents>
        <FooterPrivacy className='footer-privacy privacy'>
          <a
            href='https://static.hwahae.co.kr/docs/terms/homepage/privacy-policy.html'
            target='_blank'
            rel='noopener noreferrer'
            style={{ fontWeight: 'bold' }}
          >
            개인정보 처리방침
          </a>

          {/* <b>개인정보 처리방침</b> */}
          <a
            href='https://static.hwahae.co.kr/docs/terms/homepage/video.html'
            target='_blank'
            rel='noopener noreferrer'
            style={{ fontWeight: 'bold' }}
          >
            CCTV 영상정보 처리기기 관리 방침
          </a>
          {/* <b>CCTV 영상정보 처리기기 관리 방침</b> */}
          <a>윤리경영</a>
          <FooterPrivacyDesc>© BIRDVIEW. ALL RIGHTS RESERVED.</FooterPrivacyDesc>
        </FooterPrivacy>
        <div>
          <ul style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <li>
              <a
                href='https://www.youtube.com/channel/UCGaUG5MIsJ7VtlTTNS774gA'
                target='_blank'
                rel='noopener noreferrer'
                style={{ display: 'block', width: '36px', height: '36px' }}
                data-link-name='youtube'
              >
                <svg
                  width={36}
                  height={36}
                  viewBox='0 0 36 36'
                  fill='#c6cfcf'
                  xmlns='http://www.w3.org/2000/svg'
                  role='img'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M36 18c0 9.941-8.059 18-18 18S0 27.941 0 18 8.059 0 18 0s18 8.059 18 18Zm-17.341-7h-.075l-.289.002h-.076l-.315.001c-1.167.007-4.023.04-6.07.19l-.105.01c-.4.037-1.131.105-1.787.79-.567.567-.75 1.873-.75 1.873S9 15.394 9 16.923v1.427c0 1.528.192 3.056.192 3.056s.183 1.306.749 1.872c.597.622 1.347.715 1.828.774.098.012.186.022.258.036.603.057 1.75.1 2.91.13l.497.012c1.399.032 2.704.048 2.964.051h.126c.573-.002 4.109-.025 6.531-.192l.104-.01c.4-.037 1.132-.106 1.788-.79.567-.567.75-1.873.75-1.873s.192-1.528.192-3.057v-1.427c0-1.529-.192-3.057-.192-3.057l-.01-.01s-.183-1.306-.75-1.873c-.656-.685-1.388-.753-1.788-.79l-.105-.01a55.745 55.745 0 0 0-1.651-.091l-.494-.019a135.342 135.342 0 0 0-3.926-.08L18.659 11Zm-2.103 9.669v-5.891l5.666 2.957-5.666 2.934Z'
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href='https://www.instagram.com/hwahae_official'
                target='_blank'
                rel='noopener noreferrer'
                data-link-name='instagram'
              >
                <svg
                  width={36}
                  height={36}
                  viewBox='0 0 36 36'
                  fill='#c6cfcf'
                  xmlns='http://www.w3.org/2000/svg'
                  role='img'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M18 0C8.059 0 0 8.059 0 18s8.059 18 18 18 18-8.059 18-18S27.941 0 18 0Zm0 8c-2.716 0-3.056.012-4.123.06-1.064.049-1.791.218-2.427.465a4.901 4.901 0 0 0-1.772 1.153 4.901 4.901 0 0 0-1.153 1.772c-.247.636-.416 1.363-.465 2.427C8.011 14.944 8 15.284 8 18s.011 3.056.06 4.123c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 0 0 1.153 1.772 4.902 4.902 0 0 0 1.772 1.153c.636.247 1.363.416 2.427.465 1.067.048 1.407.06 4.123.06s3.056-.012 4.123-.06c1.064-.049 1.791-.218 2.427-.465a4.902 4.902 0 0 0 1.772-1.153 4.902 4.902 0 0 0 1.153-1.772c.247-.636.416-1.363.465-2.427.048-1.067.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.049-1.064-.218-1.791-.465-2.427a4.901 4.901 0 0 0-1.153-1.772 4.902 4.902 0 0 0-1.772-1.153c-.636-.247-1.363-.416-2.427-.465C21.056 8.012 20.716 8 18 8Zm0 1.802c2.67 0 2.986.01 4.04.058.976.045 1.505.208 1.858.344.466.182.8.398 1.15.748.35.35.566.684.748 1.15.137.353.3.882.344 1.857.048 1.055.058 1.37.058 4.041 0 2.67-.01 2.986-.058 4.04-.045.976-.207 1.505-.344 1.858-.182.466-.398.8-.748 1.15-.35.35-.683.566-1.15.748-.353.137-.882.3-1.857.344-1.054.048-1.37.058-4.041.058-2.67 0-2.986-.01-4.04-.058-.976-.045-1.505-.207-1.858-.344a3.097 3.097 0 0 1-1.15-.748 3.098 3.098 0 0 1-.748-1.15c-.136-.353-.3-.882-.344-1.857-.048-1.055-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.045-.976.208-1.505.344-1.858.182-.466.399-.8.748-1.15.35-.35.684-.566 1.15-.748.353-.136.882-.3 1.857-.344 1.055-.048 1.37-.058 4.041-.058Zm0 11.531a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666Zm0-8.468a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27Zm6.538-.203a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z'
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href='https://twitter.com/hwahae_official'
                target='_blank'
                rel='noopener noreferrer'
                data-link-name='twitter'
              >
                <svg
                  width={36}
                  height={36}
                  viewBox='0 0 36 36'
                  fill='#c6cfcf'
                  xmlns='http://www.w3.org/2000/svg'
                  role='img'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M36 18c0 9.941-8.059 18-18 18S0 27.941 0 18 8.059 0 18 0s18 8.059 18 18Zm-11.137-5.477c.787-.062 1.462-.308 2.137-.615-.506.8-1.125 1.477-1.8 2.092v.492C25.2 19.846 21.488 26 14.681 26c-2.081 0-4.05-.615-5.681-1.785.281.062.619.062.9.062 1.744 0 3.375-.616 4.612-1.723-1.575-.062-2.98-1.23-3.43-2.83.224.06.45.06.674.06.295 0 .547-.046.83-.1l.127-.023c-1.688-.369-2.982-1.969-2.982-3.938v-.062a3.212 3.212 0 0 0 1.688.493c-.957-.739-1.632-1.97-1.632-3.385 0-.738.17-1.415.507-2.03 1.8 2.461 4.5 4.061 7.593 4.246-.056-.308-.112-.616-.112-.923 0-2.277 1.688-4.062 3.713-4.062 1.012 0 1.968.492 2.643 1.292.844-.184 1.631-.492 2.363-.984-.282.923-.844 1.723-1.631 2.215Z'
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href='https://kr.linkedin.com/company/birdview-kr'
                target='_blank'
                rel='noopener noreferrer'
                data-link-name='linkedin'
              >
                <svg
                  width={36}
                  height={36}
                  viewBox='0 0 36 36'
                  fill='#c6cfcf'
                  xmlns='http://www.w3.org/2000/svg'
                  role='img'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M36 18c0 9.941-8.059 18-18 18S0 27.941 0 18 8.059 0 18 0s18 8.059 18 18Zm-21.395-6.194a1.803 1.803 0 1 0-3.604 0 1.803 1.803 0 1 0 3.604 0ZM14.36 25h-3.113V14.98h3.113V25Zm5.927-10.02h-2.979V25h3.105v-4.956c0-1.307.247-2.573 1.864-2.573 1.595 0 1.615 1.494 1.615 2.657V25H27v-5.495c0-2.699-.582-4.773-3.73-4.773-1.511 0-2.525.831-2.94 1.619h-.043v-1.37Z'
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href='https://post.naver.com/my.naver?memberNo=23854098'
                target='_blank'
                rel='noopener noreferrer'
                data-link-name='naver'
              >
                <svg
                  width={36}
                  height={36}
                  viewBox='0 0 36 36'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='#c6cfcf'
                  role='img'
                >
                  <path
                    d='M18 0c9.941 0 18 8.059 18 18s-8.059 18-18 18S0 27.941 0 18 8.059 0 18 0zm2.302 11v7.332L15.698 11H11v14h4.698v-7.047L20.302 25H25V11h-4.698z'
                    fillRule='evenodd'
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </FooterInner>
    </FooterBlock>
  )
}

const FooterBlock = styled.footer`
  background: #f4f8f8;
  padding: 60px 20px 50px;
  color: #212529;
  font-size: 13px;
  letter-spacing: -0.72px;

  ${media.tablet} {
    padding: 75px 20px;
    letter-spacing: -0.83px;
  }
`

const FooterInner = styled.div`
  ${media.tablet} {
    position: relative;
    max-width: 1070px;
    margin: 0 auto;
    font-size: 15px;
  }
`

const FooterLogo = styled.em`
  display: block;
  width: 110px;
  height: 13px;
  background: url(https://hwahae-homepage.s3.ap-northeast-2.amazonaws.com/images/ftr_logo.png)
    no-repeat 0 0;
  background-size: cover;
`

const FooterAddress = styled.div`
  margin-top: 27px;

  ${media.tablet} {
    display: flex;
  }
`

const FooterAddressDesc = styled.p`
  margin-top: 7px;

  ${media.tablet} {
    margin-top: 0;

    &:before {
      content: '';
      display: inline-block;
      width: 1px;
      height: 10px;
      margin: 0 20px;
      background: #c9cccc;
    }
  }
`

const FooterAddressText = styled.i`
  padding-right: 9px;
  color: #727777;
`

const FooterContents = styled.div`
  ${media.tablet} {
    display: flex;
    padding-top: 7px;
  }
`

const FooterContentsList = styled.ul`
  display: flex;
  align-items: center;
  padding-top: 7px;

  ${media.tablet} {
    padding-top: 0 !important;

    &:last-child {
      padding-top: 47px;
      & div[data-component='footer-contents-item'] {
        font-weight: 400;
      }
    }
  }
`

const FooterContentsItem = styled.li`
  display: flex;
  align-items: center;

  &:not(:last-child):after {
    content: '';
    display: inline-block;
    width: 1px;
    height: 10px;
    margin: 0 20px;
    background: #c9cccc;
  }

  ${media.tablet} {
    font-weight: 400;
  }
`

const FooterInfoText = styled.i`
  padding-right: 9px;
  color: #727777;
`

// const FooterPrivacyLink = styled.a`
//   display: inline-block;
//   margin-top: 7px;
//   color: #212529;

//   &:hover {
//     text-decoration: none;
//   }
// `

const FooterPrivacy = styled.div`
  ${media.tablet} {
    padding-top: 20px;
  }
`

const FooterPrivacyDesc = styled.div`
  padding-top: 8px;
`
