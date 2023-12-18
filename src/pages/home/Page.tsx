import { media } from '../../lib/media'
import HwahaeLogo from './components/Logo'
import styles from './home.module.scss'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { isMatchingBreakpoint } from '../../lib/isMatchingBreakpoint'
import { useEffect, useState } from 'react'
import HamburgerIcon from './components/HamburgerIcon'
import CloseIcon from './components/CloseIcon'

const navList = [
  { name: '제품소개', path: '#제품소개' },
  { name: '회사소개', path: '#회사소개' },
  { name: '채용', path: '#채용' },
  { name: '뉴스', path: '#뉴스' },
  { name: '공지', path: '#공지' },
  { name: '블로그', path: '#블로그' },
  { name: '광고문의', path: '#광고문의' },
]

export default function Home() {
  const [isTabletHeaderMenuOpen, setIsTabletHeaderMenuOpen] = useState(false)
  const [hasBg, setHasBg] = useState(false)

  // START - 태블릿뷰 헤더 네비 외부영역 클릭감지 관련 로직
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement

    if (target.dataset.area === 'outside') {
      setIsTabletHeaderMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])
  // END - 태블릿뷰 헤더 네비 외부영역 클릭감지 관련 로직

  // START - 태블릿뷰 스크롤 방지 및 태블릿뷰 헤더 네비가 열림 상태일때 요소 색상관련 상태 변경 로직
  const handleTabletHeaderMenuOpen = () => {
    if (isMatchingBreakpoint('tablet')) {
      setIsTabletHeaderMenuOpen(isOpen => !isOpen)
    }
  }
  useEffect(() => {
    if (isMatchingBreakpoint('tablet') && isTabletHeaderMenuOpen) {
      document.body.style.overflow = 'hidden'
      setHasBg(true)
    }
    return () => {
      document.body.style.overflow = 'visible'
      if (isMatchingBreakpoint('tablet') && isTabletHeaderMenuOpen) {
        setHasBg(false)
      }
    }
  }, [isTabletHeaderMenuOpen])
  // END - 태블릿뷰 스크롤 방지 및 태블릿뷰 헤더 네비가 열림 상태일때 요소 색상관련 상태 변경 로직

  // START - 윈도우 리사이징 감지 관련 로직
  // const [, setWindowWidth] = useState(window.innerWidth)

  // const handleResize = () => {
  //   setWindowWidth(window.innerWidth)
  // }

  // useEffect(() => {
  //   window.addEventListener('resize', handleResize)
  //   return () => window.removeEventListener('resize', handleResize)
  // }, [])
  // END - 윈도우 리사이징 감지 관련 로직

  // START - 스크롤 변경 감지 관련 로직
  const [scale, setScale] = useState(1)
  const [bgOpacity, setBgOpacity] = useState(0)
  const [topContentsMainTitleOpacity, setTopContentsMainTitleOpacity] = useState(1)
  const [topContentsSubDescFrist, setTopContentsSubDescFrist] = useState({ opacity: 0, y: 0 })
  const [topContentsSubDescSecond, setTopContentsSubDescSecond] = useState({ opacity: 0, y: 0 })
  const [topContentsSubDescThird, setTopContentsSubDescThird] = useState({ opacity: 0, y: 0 })
  const [topContentsOpacity, setTopContentsOpacity] = useState(1)

  const handleScroll = () => {
    if (window.scrollY > 0) {
      /**
       * 최대 스크롤 값(2038)에 도달했을 때의 scale 값(1.5)과 시작 scale 값(1.0)의 차이를 계산
       * 이 차이는 0.5. 그런 다음, 스크롤 값에 대한 scale 값의 증가 비율을 계산
       * 이 비율은 scale 변화량 / 스크롤 변화량
       */

      const image = {
        maxScrollY: 1981, // 최대 스크롤 값
        startScale: 1.0, // 시작 스케일 값
        endScale: 1.5, // 최대 스케일 값
      }
      // scale 변화량
      const scaleChange = image.endScale - image.startScale // 1.5 - 1.0 = 0.5
      // 스크롤 당 scale 증가 비율
      const scalePerScroll = scaleChange / image.maxScrollY // 0.5 / 2038

      const imageScrollY = Math.min(window.scrollY, image.maxScrollY)
      const newScale = image.startScale + imageScrollY * scalePerScroll

      // 스케일 값이 최대 1.5를 넘지 않도록
      const resultScale = Math.min(newScale, image.endScale)
      setScale(resultScale)

      // 메인 컨텐츠 배경 스크롤 값에 따라 투명도(opacity) 값을 계산
      const backdrop = {
        maxScrollY: 683,
        maxOpacity: 0.4,
      }

      const backdropScrollY = Math.min(window.scrollY, backdrop.maxScrollY)
      const resultOpacity = (backdropScrollY / backdrop.maxScrollY) * backdrop.maxOpacity
      setBgOpacity(resultOpacity)

      // TopContentsTitle opacity 감소
      const topContentsTitle = {
        maxScrollY: 342,
      }

      const topContentsTitleScrollY = Math.min(window.scrollY, topContentsTitle.maxScrollY)
      const resultTopContentsMainTitleOpacity =
        1 - topContentsTitleScrollY / topContentsTitle.maxScrollY
      setTopContentsMainTitleOpacity(resultTopContentsMainTitleOpacity)

      // TopContentsSubDesc opacity 감소 및 y축 위로 이동
      const SUB_DESC_ANIMATION_SCALES = {
        first: { start: 1.10325, end: 1.19008 },
        second: { start: 1.258, end: 1.3458 },
        third: { start: 1.413, end: 1.5 },
      } as const

      const calculateOpacityAndY = (range: { start: number; end: number }) => {
        const MAX_Y = -20
        const isBeforeStart = resultScale < range.start
        const isInProgress = resultScale >= range.start && resultScale <= range.end
        const isAfterEnd = resultScale > range.end

        switch (true) {
          case isBeforeStart:
            return { opacity: 0, y: 0 } // 초기 상태
          case isInProgress: {
            const progress = (resultScale - range.start) / (range.end - range.start)
            return { opacity: progress, y: MAX_Y * progress }
          }
          case isAfterEnd:
            return { opacity: 1, y: MAX_Y } // 최종 상태
          default:
            return { opacity: 0, y: 0 } // 기본값
        }
      }

      setTopContentsSubDescFrist(calculateOpacityAndY(SUB_DESC_ANIMATION_SCALES.first))
      setTopContentsSubDescSecond(calculateOpacityAndY(SUB_DESC_ANIMATION_SCALES.second))
      setTopContentsSubDescThird(calculateOpacityAndY(SUB_DESC_ANIMATION_SCALES.third))

      // Top Contents Opacity 0
      const TOP_CONTENTS_SCROLL_RANGE = {
        startScrollY: 2388,
        endScrollY: 2733,
      } as const

      const calculateOpacity = (scrollY: number, range: typeof TOP_CONTENTS_SCROLL_RANGE) => {
        if (scrollY < range.startScrollY) {
          return 1 // 스크롤 시작 전
        } else if (scrollY > range.endScrollY) {
          return 0 // 스크롤 끝난 후
        } else {
          const progress = (scrollY - range.startScrollY) / (range.endScrollY - range.startScrollY)
          return 1 - progress // 스크롤 중
        }
      }

      const newOpacity = calculateOpacity(scrollY, TOP_CONTENTS_SCROLL_RANGE)
      setTopContentsOpacity(newOpacity)
    }

    // TOP Contents 종료시 투명화 하는 계산 로직
    const TOP_CONTENTS_OPASITY_RANGE = {
      endScrollY: 3880,
    } as const

    if (window.scrollY >= TOP_CONTENTS_OPASITY_RANGE.endScrollY) {
      setTopContentsOpacity(0)
      if (!hasBg) {
        setHasBg(true)
      }
    } else {
      const opacity = 1 - scrollY / TOP_CONTENTS_OPASITY_RANGE.endScrollY
      setTopContentsOpacity(Math.max(opacity, 0)) // opacity가 0보다 작아지지 않도록
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  // END - 스크롤 변경 감지 관련 로직

  const handleAppDownloadClick = () => {
    window.open('https://play.google.com/store/apps/details?id=kr.co.company.hwahae', '_blank')
  }

  return (
    <PageBlock>
      <Header>
        <HeaderInner>
          {isTabletHeaderMenuOpen && <LayerDemmend data-area='outside' />}
          <HeaderTitle hasBg={hasBg}>
            <a href='#'>
              <HeaderTitleLink>
                <HwahaeLogo pathFill={hasBg ? '#5edfdf' : '#fff'} />
              </HeaderTitleLink>
            </a>
          </HeaderTitle>
          <HeaderMenu isOpen={isTabletHeaderMenuOpen} isHidden={false}>
            <HeaderNav isOpen={isTabletHeaderMenuOpen} hasDrawer={isMatchingBreakpoint('tablet')}>
              <HeaderNavList>
                {navList.map(({ name, path }, key) => (
                  <HeaderNavItem hasBg={hasBg} selected={name === '제품소개'} key={key}>
                    <a href={path}>
                      <HeaderNavItemLink>
                        <HeaderNavItemLinkText
                          hasBg={hasBg}
                          selected={name === '제품소개'}
                          data-text='linkText'
                        >
                          {name}
                        </HeaderNavItemLinkText>
                      </HeaderNavItemLink>
                    </a>
                  </HeaderNavItem>
                ))}
              </HeaderNavList>
            </HeaderNav>
          </HeaderMenu>
          {isMatchingBreakpoint('tablet') && (
            <HeaderTabletMenuButton
              type='button'
              onClick={handleTabletHeaderMenuOpen}
              data-button='headerTabletMenu'
            >
              {isTabletHeaderMenuOpen ? (
                <CloseIcon />
              ) : (
                <HamburgerIcon pathFill={hasBg ? '#222' : '#fff'} />
              )}
            </HeaderTabletMenuButton>
          )}
        </HeaderInner>
      </Header>
      <main>
        <main className={styles.main}>
          <ProductBlock>
            <MainVisual style={{ height: '4477.5px' }}>
              {/* top contents의 opacity를 1 -> 0 으로 */}
              {/* 0이 되는 순간 setHasBg(true) */}
              <TopContents opacity={topContentsOpacity}>
                <TopContentsInner style={{ display: 'block' }}>
                  <div
                    style={{ height: '100%', transform: `scale3d(${scale}, ${scale}, ${scale})` }}
                  >
                    <div
                      style={{
                        background:
                          'url("https://hwahae-homepage.s3.ap-northeast-2.amazonaws.com/images/main_2023-09-11-09-34.jpg") center center / cover no-repeat',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </div>
                  <MainVisualBackdrop bgOpacity={bgOpacity} />
                  <TopContentsMain
                    style={{ opacity: '1', transform: 'translate3d(0px, -50%, 0px)' }}
                  >
                    <div style={{ opacity: topContentsMainTitleOpacity }}>
                      <TopContentsTitle>
                        모든 뷰티의
                        <LineBreak />
                        시작
                      </TopContentsTitle>
                      <TopContentsDesc parent='main'>대한민국 1등 뷰티 앱 화해</TopContentsDesc>
                    </div>
                  </TopContentsMain>
                  <TopContentsSub>
                    <TopContentsDesc
                      parent='sub'
                      opacity={topContentsSubDescFrist.opacity}
                      y={topContentsSubDescFrist.y}
                    >
                      스킨케어부터 메이크업
                      <LineBreak />
                      그리고 이너뷰티까지
                    </TopContentsDesc>
                    <TopContentsDesc
                      parent='sub'
                      opacity={topContentsSubDescSecond.opacity}
                      y={topContentsSubDescSecond.y}
                    >
                      화해를 통해 세상 모든 뷰티를
                      <LineBreak />
                      쉽고 편리하게 시작해보세요.
                    </TopContentsDesc>
                    <TopContentsDesc
                      parent='sub'
                      opacity={topContentsSubDescThird.opacity}
                      y={topContentsSubDescThird.y}
                    >
                      나에게 꼭 맞는 뷰티를 찾을 수 있도록
                      <LineBreak />그 시작에서 늘 함께할게요.
                    </TopContentsDesc>
                  </TopContentsSub>

                  <TopContentsScroll>
                    <ScrollButton type='button'>
                      <ScrollText>컨텐츠 스크롤</ScrollText>
                    </ScrollButton>
                  </TopContentsScroll>
                  <TopContentsDownload>
                    <TopContentsDownloadLink type='button' onClick={handleAppDownloadClick}>
                      앱다운로드
                    </TopContentsDownloadLink>
                  </TopContentsDownload>
                </TopContentsInner>
              </TopContents>
            </MainVisual>

            <section className='product-info'>
              <InfoInner>
                <InfoTitle>화해는 지금</InfoTitle>
                <InfoDesc>
                  대한민국 20·30 여성의 1/2 이상 사용하는 서비스로,
                  <br />
                  내가 찾는 모든 뷰티 정보를 제공합니다.
                </InfoDesc>
                <InfoContent>
                  <InfoCounting>
                    <InfoCountingList>
                      <InfoCountingItem style={{ transform: 'none' }}>
                        <CountingTitle aria-hidden='true'>
                          <CountingIcon
                            aria-hidden='true'
                            style={{
                              width: '12px',
                              height: '12px',
                              borderWidth: '2px',
                              backgroundColor: 'white',
                              transform: 'none',
                            }}
                          />
                          <CountingText
                            style={{
                              color: 'rgb(200, 200, 200)',
                              transform: 'translate3d(45px, 0px, 0px)',
                            }}
                          >
                            함께하는 브랜드
                          </CountingText>
                        </CountingTitle>
                        <CountingIndex>
                          <div
                            style={{ height: '0px', transform: 'translate3d(0px, -100px, 0px)' }}
                          >
                            <div />
                          </div>
                        </CountingIndex>
                      </InfoCountingItem>
                      <InfoCountingItem style={{ transform: 'translate3d(0px, 100px, 0px)' }}>
                        <CountingTitle selected={true} aria-hidden='true'>
                          <CountingIcon
                            aria-hidden='true'
                            style={{
                              width: '130px',
                              height: '130px',
                              borderWidth: '0px',
                              backgroundColor: 'rgb(94, 223, 223)',
                              transform: 'translate3d(-60px, -30px, 0px)',
                            }}
                          ></CountingIcon>
                          <CountingText
                            style={{
                              color: 'rgb(33, 37, 41)',
                              transform: 'translate3d(30px, 0px, 0px)',
                            }}
                          >
                            누적 다운로드
                          </CountingText>
                        </CountingTitle>
                        <CountingIndex>
                          <div style={{ height: '100px', transform: 'none' }}>
                            <div>11,067,713</div>
                          </div>
                        </CountingIndex>
                      </InfoCountingItem>
                      <InfoCountingItem style={{ transform: 'translate3d(0px, 220px, 0px)' }}>
                        <CountingTitle className='counting-title next-selected' aria-hidden='true'>
                          <CountingIcon
                            aria-hidden='true'
                            style={{
                              width: '12px',
                              height: '12px',
                              borderWidth: '2px',
                              backgroundColor: 'white',
                              transform: 'none',
                            }}
                          ></CountingIcon>
                          <CountingText
                            style={{
                              color: 'rgb(200, 200, 200)',
                              transform: 'translate3d(45px, 0px, 0px)',
                            }}
                          >
                            사용자 리뷰
                          </CountingText>
                        </CountingTitle>
                        <CountingIndex>
                          <div
                            style={{ height: '0px', transform: 'translate3d(0px, -100px, 0px)' }}
                          >
                            <div></div>
                          </div>
                        </CountingIndex>
                      </InfoCountingItem>
                      <InfoCountingItem style={{ transform: 'translate3d(0px, 300px, 0px)' }}>
                        <CountingTitle aria-hidden='true'>
                          <CountingIcon
                            aria-hidden='true'
                            style={{
                              width: '12px',
                              height: '12px',
                              borderWidth: '2px',
                              backgroundColor: 'white',
                              transform: 'none',
                            }}
                          ></CountingIcon>
                          <CountingText
                            style={{
                              color: 'rgb(200, 200, 200)',
                              transform: 'translate3d(45px, 0px, 0px)',
                            }}
                          >
                            등록된 제품
                          </CountingText>
                        </CountingTitle>
                        <CountingIndex>
                          <div
                            style={{ height: '0px', transform: 'translate3d(0px, -100px, 0px)' }}
                          >
                            <div />
                          </div>
                        </CountingIndex>
                      </InfoCountingItem>
                      <InfoCountingItem style={{ transform: 'translate3d(0px, 400px, 0px)' }}>
                        <CountingTitle aria-hidden='true'>
                          <CountingIcon
                            aria-hidden='true'
                            style={{
                              width: '12px',
                              height: '12px',
                              borderWidth: '2px',
                              backgroundColor: 'white',
                              transform: 'none',
                            }}
                          ></CountingIcon>
                          <CountingText
                            style={{
                              color: 'rgb(200, 200, 200)',
                              transform: 'translate3d(45px, 0px, 0px)',
                            }}
                          >
                            함께하는 브랜드
                          </CountingText>
                        </CountingTitle>
                        <CountingIndex>
                          <div style={{ height: '0px, transform: translate3d(0px, -100px, 0px)' }}>
                            <div></div>
                          </div>
                        </CountingIndex>
                      </InfoCountingItem>
                    </InfoCountingList>
                  </InfoCounting>
                  <InfoImage
                    aria-hidden='true'
                    style={{
                      opacity: 0,
                      backgroundImage:
                        'url("https://hwahae-homepage.s3.ap-northeast-2.amazonaws.com/public/images/product-ranking/this-hwahae01.jpg")',
                      transform: ' none',
                    }}
                  />
                  <InfoImage
                    className='info-image next-image'
                    aria-hidden='true'
                    style={{
                      opacity: 1,
                      backgroundImage:
                        'url("https://hwahae-homepage.s3.ap-northeast-2.amazonaws.com/public/images/product-ranking/this-hwahae01.jpg")',
                      transform: 'none',
                    }}
                  />
                </InfoContent>
                <InfoDate>누적 다운로드: 2022년 9월 기준</InfoDate>
              </InfoInner>
            </section>
          </ProductBlock>
        </main>
      </main>
      <footer className={styles.footer}></footer>
    </PageBlock>
  )
}

const PageBlock = styled.div``

const Header = styled.header<{ hasBg?: boolean }>`
  ${media.tablet} {
    height: 80px;
  }
  margin: 0 auto;
  position: fixed;
  z-index: 500;
  width: 100%;
  height: 64px;
  box-sizing: border-box;
  opacity: 1;
`

const HeaderInner = styled.div`
  ${media.tablet} {
    display: flex;
    justify-content: flex-end;
    max-width: 1070px;
    margin: 0 auto;
    height: 100%;
  }
  transform: translateX(0);
`

const LayerDemmend = styled.div`
  position: fixed;
  top: 64px;
  left: 0;
  width: 100%;
  height: calc(100vh - 64px);
  background: rgba(0, 0, 0, 0.3);
`

const HeaderTitle = styled.h1<{ hasBg?: boolean }>`
  position: relative;
  z-index: 5;
  ${media.tablet} {
    position: absolute;
    left: 0;
    margin: 0;
    padding: 0;
  }
  ${({ hasBg }) =>
    hasBg &&
    css`
      background-color: #fff;
    `}
`

const HeaderTitleLink = styled.span<{ hasBg?: boolean }>`
  ${media.tablet} {
    width: 58px;
    height: 29px;
    padding: 22px;
  }
  display: block;
  width: 48px;
  height: 24px;
  padding: 20px 24px;
`

const HeaderMenu = styled.div<{ isOpen?: boolean; isHidden?: boolean }>`
  ${media.tablet} {
    pointer-events: all;
    position: static;
    width: auto;
    height: auto;
    background: none;
  }
  display: ${({ isHidden }) => (!isHidden ? 'block' : 'none')};
  position: relative;
  pointer-events: none;
  ${({ isOpen }) =>
    isOpen
      ? css`
          content: '';
          pointer-events: all;
        `
      : css`
          &::before {
            content: none;
          }
        `}
`

const HeaderNav = styled.nav<{ isOpen?: boolean; hasDrawer?: boolean }>`
  ${media.tablet} {
    padding-bottom: 12px;
    transform: none;
  }
  transition: transform 0.5s;
  padding-bottom: 10px;
  transform: ${({ isOpen }) => (isOpen ? 'translateZ(0)' : 'translate3d(0, -411px, 0)')};

  ${({ hasDrawer }) =>
    hasDrawer &&
    css`
      background: #fff;
    `}
`

const HeaderNavList = styled.ul`
  ${media.tablet} {
    display: flex;
    text-align: center;
  }
`

const selectedHeaderMenuItem = css`
  color: #22d3d6;
  font-weight: 700;
`

const HeaderNavItem = styled.li<{ selected?: boolean; hasBg?: boolean }>`
  ${media.tablet} {
    padding: 0 10px;
  }
  ${media.desktop} {
    padding: 0 22px;
  }
  padding: 0 22px;
  height: 100%;

  ${({ selected }) =>
    selected &&
    css`
      font-weight: bold;
    `}

  &:hover {
    cursor: pointer;
    ${({ hasBg }) =>
      hasBg &&
      css`
        span[data-text='linkText'] {
          ${selectedHeaderMenuItem}
        }
      `}

    ${media.tablet} {
      span > span:after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: -2px;
        right: -2px;
        height: 2px;
        background-color: ${({ hasBg }) => (hasBg ? '#22d3d6' : '#fff')};
      }
    }
  }
`

const HeaderNavItemLink = styled.span`
  ${media.tablet} {
    display: block;
    padding: 24px 8px;
  }
  display: block;
  padding: 13px 30px;
  font-size: 15px;
  color: #212529;
`

const HeaderNavItemLinkText = styled.span<{ selected?: boolean; hasBg?: boolean }>`
  color: inherit;
  ${media.tablet} {
    position: relative;
    color: #fff;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: -1px;
  }

  ${({ hasBg, selected }) =>
    hasBg
      ? selected &&
        css`
          ${selectedHeaderMenuItem}
        `
      : css`
          line-height: 22px;
        `}
`

const HeaderTabletMenuButton = styled.button<{ isOpen?: boolean; hasBg?: boolean }>`
  box-sizing: content-box;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  width: 24px;
  height: 24px;
  padding: 20px 16px;

  ${({ isOpen, hasBg }) =>
    isOpen &&
    css`
      svg > path {
        fill: ${hasBg ? '#fff' : '#222'};
      }
    `}
`

const ProductBlock = styled.div`
  overflow: hidden;
`

const MainVisual = styled.div`
  height: 100vh;
  pointer-events: none;
`

const MainVisualBackdrop = styled.div<{ bgOpacity?: number }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: ${({ bgOpacity }) => `rgba(0, 0, 0, ${bgOpacity || 0})`};
`

const TopContents = styled.div<{ opacity?: number }>`
  position: relative;
  height: 100vh;
  z-index: 2;

  overflow: hidden;
  background: #51ced3;
  opacity: ${({ opacity = 1 }) => opacity};
`

const TopContentsInner = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`

const TopContentsMain = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  text-align: center;
  transform: translateY(-50%);
`

const TopContentsTitle = styled.strong`
  ${media.tablet} {
    font-size: 85px;
    line-height: 150%;
    letter-spacing: -2px;
  }
  color: #fff;
  font-size: 54px;
  letter-spacing: -3px;
  line-height: 68px;
`

const LineBreak = styled.br``

const TopContentsSub = styled.div`
  ${media.tablet} {
    transform: translateY(-50%);
  }
  position: absolute;
  width: 100%;
  top: 50%;
  text-align: center;
  transform: translateY(-70%);
`

const TopContentsDesc = styled.p<{ parent: 'main' | 'sub'; opacity?: number; y?: number }>`
  ${({ parent, opacity = 0, y = 0 }) =>
    parent === 'main'
      ? css`
          ${media.tablet} {
            padding-top: 30px;
            font-size: 30px;
          }
          padding-top: 20px;
          color: #fff;
          font-size: 19px;
          font-weight: 700;
          letter-spacing: -1px;
        `
      : css`
          ${media.tablet} {
            padding: 15px 0;
            font-size: 30px;
            letter-spacing: -0.5px;
          }
          opacity: ${opacity};
          padding: 10px 0;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          transform: translate3d(0px, ${y}px, 0px);
        `}
`

const TopContentsScroll = styled.div`
  ${media.tablet} {
    display: none;
  }
  ${media.mobile} {
    height: 88px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 72px;
`

const ScrollButton = styled.button`
  ${media.mobile} {
    background-size: 40px auto;
  }
  width: 40px;
  height: 40px;
  background: url(https://hwahae-homepage.s3.ap-northeast-2.amazonaws.com/images/icon_down.png)
    no-repeat 50% 50%;
  background-size: 30px auto;
`

const ScrollText = styled.span`
  overflow: hidden;
  display: inline-block;
  font-size: 1px;
  line-height: 0;
  text-indent: -9999px;
  text-align: left;
`

const TopContentsDownload = styled.div`
  ${media.mobile} {
    bottom: 88px;
  }
  ${media.tablet} {
    display: none;
  }
  position: absolute;
  bottom: 72px;
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
  transition-duration: 0.8s;
  pointer-events: all;
`

const TopContentsDownloadLink = styled.button`
  display: block;
  width: 100%;
  height: 58px;
  margin: 0 auto;
  border-radius: 6px;
  background-color: #5edfdf;
  color: #fff;
  z-index: 10;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  line-height: 58px;
`

// TODO product-info
const InfoInner = styled.div`
  ${media.desktop} {
    max-width: 1070px;
    margin-left: auto;
    margin-right: auto;
  }
`
const InfoTitle = styled.h3`
  ${media.desktop} {
    max-width: 1070px;
    padding-left: 60px;
    margin: 0 auto;
    text-align: left;
    box-sizing: border-box;
    font-size: 52px;
    /* line-height: 70px; */
    line-height: 1.35;
    letter-spacing: -2.89px;
    text-align: left;
  }
  ${media.tablet} {
    font-size: 32px;
    line-height: 1.31;
    letter-spacing: -1px;
  }
  ${media.mobile} {
    font-size: 32px;
    line-height: 42px;
    letter-spacing: -1px;
  }
  line-height: 1.48;
  color: #212529;
  text-align: center;
  font-size: 27px;
  line-height: 40px;
  letter-spacing: -1.5px;
  transition: font-size 1s, line-height 1s, letter-spacing 1s;
`
const InfoDesc = styled.p`
  ${media.desktop} {
    max-width: 1070px;
    padding-left: 60px;
    margin: 0 auto;
    text-align: left;
    box-sizing: border-box;
    padding-top: 30px;
    font-size: 18px;
    /* line-height: 29px; */

    /* margin-top: 0; */
    font-size: 18px;
    line-height: 1.61;
    letter-spacing: -1px;
    text-align: left;

    padding-top: 30px;
  }
  margin-top: 19px;
  line-height: 1.6;

  color: #212529;
  text-align: center;
  padding-top: 15px;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: -1px;
`
const InfoContent = styled.div`
  ${media.desktop} {
    margin-top: 80px;
  }
  position: relative;
  margin-top: 42px;
`
const InfoCounting = styled.div`
  ${media.desktop} {
    margin-top: 80px;
  }
  overflow-y: hidden;
  padding-left: 50px;
  margin-left: -50px;
`
const InfoCountingList = styled.ul`
  ${media.desktop} {
    padding: 50px 0;
    height: 600px;
  }
  ${media.mobile} {
    &::after,
    &::before {
      content: none;
    }
  }
  position: relative;
  padding: 50px 0;
  height: 440px;
  box-sizing: border-box;
`
const InfoCountingItem = styled.li`
  ${media.desktop} {
    left: 60px;
  }
  ${media.mobile} {
    left: 0;
  }
  position: absolute;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  &:first-of-type {
    padding-top: 0;
    & div {
      // CountingIcon
      top: 3px;
    }
  }
`
const CountingTitle = styled.div<{ selected?: boolean }>`
  display: inline-flex;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.76;
  letter-spacing: -1.94px;
  color: #c8c8c8;
  ${({ selected }) =>
    selected &&
    css`
      letter-spacing: -1.61px;
      color: #212529;
    `}
`
const CountingIcon = styled.div<{ selected?: boolean }>`
  ${media.desktop} {
    left: 0;
    width: 20px;
    height: 20px;
  }
  position: absolute;
  top: 3px;
  left: 14px;
  content: '';
  display: inline-flex;
  width: 12px;
  height: 12px;
  border-style: solid;
  border-color: #c8c8c8;
  box-sizing: border-box;
  border-radius: 50%;
  z-index: -1;

  ${({ selected }) =>
    selected &&
    css`
      top: 30px;
      left: -45px;
      width: 130px;
      height: 130px;
      border: 0;
      background-color: #5edfdf;
    `}
`
const CountingText = styled.span<{ countingTitleSelected?: boolean }>`
  ${media.desktop} {
    margin: 0;
  }
  ${media.mobile} {
    vertical-align: -1px;
    margin-top: -5px;
    margin-left: -10px;
    ${({ countingTitleSelected }) =>
      countingTitleSelected &&
      css`
        vertical-align: -1px;
        margin-left: 0;
      `}
  }
  vertical-align: -1px;
`
const CountingIndex = styled.div`
  ${media.desktop} {
    font-size: 85px;
    line-height: 1.12;
  }
  overflow: hidden;
  padding-left: 25px;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.25;
  color: #212529;
  pointer-events: none;
  & > span {
    display: inline-block;
  }
`
const InfoImage = styled.div`
  ${media.desktop} {
    left: 280px;
    border-radius: 290px;
    width: 940px;
  }
  position: absolute;
  top: 0;
  left: 140px;
  width: 100%;
  height: 100%;
  z-index: -2;
  background-size: cover;
  background-position: 50%;
  border-top-left-radius: 290px;
  border-bottom-left-radius: 290px;
`
const InfoDate = styled.div`
  ${media.desktop} {
    padding-left: 60px;
    font-size: 16px;
    line-height: 1.81;
    letter-spacing: -0.89px;
    text-align: left;
  }
  margin-top: 28px;
  font-size: 15px;
  line-height: 1.93;
  letter-spacing: -0.83px;
  text-align: center;
  color: #c8c8c8;
`

const ProductReview = styled.div`
  padding: 100px 0 0;
`

const ReviewDesc = styled.div`
  ${media.desktop} {
    max-width: 1070px;
    padding-left: 60px;
    margin: 0 auto;
    text-align: left;
    box-sizing: border-box;
    padding-top: 30px;
    font-size: 18px;
    line-height: 29px;
  }
  color: #212529;
  text-align: center;
  padding-top: 15px;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: -1px;
`

// const Footer = styled.footer`
//   background: #f4f8f8;
//   padding: 60px 20px 50px;
//   color: #212529;
//   font-size: 13px;
//   letter-spacing: -0.72px;

//   ${media.tablet} {
//     padding: 75px 20px;
//     letter-spacing: -0.83px;
//   }
// `;

// const FooterLogo = styled.div`
//   display: block;
//   width: 110px;
//   height: 13px;
//   background: url(https://hwahae-homepage.s3.ap-northeast-2.amazonaws.com/images/ftr_logo.png) no-repeat 0 0;
//   background-size: cover;
// `;

// const FooterAddress = styled.div`
//   margin-top: 27px;

//   ${media.tablet} {
//     display: flex;
//   }
// `;

// const FooterAddressDesc = styled.div`
//   margin-top: 7px;

//   ${media.tablet} {
//     margin-top: 0;

//     &:before {
//       content: '';
//       display: inline-block;
//       width: 1px;
//       height: 10px;
//       margin: 0 20px;
//       background: #c9cccc;
//     }
//   }
// `;

// const FooterAddressTxt = styled.span`
//   padding-right: 9px;
//   color: #727777;
// `;

// const FooterContentsList = styled.div`
//   display: flex;
//   align-items: center;
//   padding-top: 7px;

//   &:last-child {
//     padding-top: 47px;
//   }

//   ${media.tablet} {
//     padding-top: 0 !important;
//   }
// `;

// const FooterContentsItem = styled.div`
//   display: flex;
//   align-items: center;

//   &:not(:last-child):after {
//     content: '';
//     display: inline-block;
//     width: 1px;
//     height: 10px;
//     margin: 0 20px;
//     background: #c9cccc;
//   }

//   ${media.tablet} {
//     font-weight: 400;
//   }
// `;

// const FooterInfoTxt = styled.span`
//   padding-right: 9px;
//   color: #727777;
// `;

// const FooterPrivacyLink = styled.a`
//   display: inline-block;
//   margin-top: 7px;
//   color: #212529;

//   &:hover {
//     text-decoration: none;
//   }
// `;

// const FooterPrivacyDesc = styled.div`
//   padding-top: 8px;
// `;
