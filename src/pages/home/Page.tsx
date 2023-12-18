import { media } from '../../lib/media'
import HwahaeLogo from './components/Logo'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { isMatchingBreakpoint } from '../../lib/isMatchingBreakpoint'
import { useEffect, useState } from 'react'
import HamburgerIcon from './components/HamburgerIcon'
import CloseIcon from './components/CloseIcon'
import '../../assets/origin-hwahae.css'
import Footer from './components/Footer'

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

  useEffect(() => {
    if (topContentsOpacity > 0) {
      setHasBg(false)
    } else {
      setHasBg(true)
    }
  }, [topContentsOpacity])

  return (
    <PageBlock>
      <Header hasBg={hasBg}>
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
        <main>
          <ProductBlock>
            <MainVisual style={{ height: '4365px' }}>
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

            <ProductReview>
              <ReviewInner>
                <ReviewTagSection>
                  <ReviewTitle>
                    나만의 뷰티를 찾는
                    <br />내 피부 맞춤 리뷰
                  </ReviewTitle>
                  <ReviewDesc>
                    화해 사용자들이 작성한 솔직하고 균형있는 리뷰 중<br />
                    나에게 꼭 맞는 '내 피부 맞춤 리뷰'를 만나보세요.
                  </ReviewDesc>
                  <ReviewTagViewport>
                    <ReviewTagArea>
                      <ReviewTagList>
                        {/* <ReviewTagIndicator
                          style={{
                            width: 100,
                            transform: 'translate3d(390px, 0px, 0px)',
                          }}
                        /> */}
                        <ReviewTag aria-selected='false'>중성</ReviewTag>
                        <ReviewTag aria-selected='false'>40대 이상</ReviewTag>
                        <ReviewTag aria-selected='false'>지성</ReviewTag>
                        <ReviewTag aria-selected='true'>30대</ReviewTag>
                      </ReviewTagList>
                      <ReviewTagList>
                        {/* <ReviewTagIndicator
                          style={{
                            width: 122,
                            transform: 'translate3d(127px, 0px, 0px)',
                          }}
                        /> */}
                        <ReviewTag aria-selected='false'>아토피</ReviewTag>
                        <ReviewTag aria-selected='true'>여드름</ReviewTag>
                        <ReviewTag aria-selected='false'>20대</ReviewTag>
                        <ReviewTag aria-selected='false'>복합성</ReviewTag>
                      </ReviewTagList>
                      <ReviewTagList>
                        {/* <ReviewTagIndicator
                          style={{
                            width: 126,
                            transform: 'translate3d(154px, 0px, 0px)',
                          }}
                        /> */}
                        <ReviewTag aria-selected='false'>해당없음</ReviewTag>
                        <ReviewTag aria-selected='true'>민감성</ReviewTag>
                        <ReviewTag aria-selected='false'>10대</ReviewTag>
                        <ReviewTag aria-selected='false'>건성</ReviewTag>
                      </ReviewTagList>
                    </ReviewTagArea>
                  </ReviewTagViewport>
                </ReviewTagSection>
                <ReviewCardSection>
                  <ReviewCardViewport>
                    <ReviewCardWrap style={{ transform: 'none' }}>
                      <ReviewCardInner>
                        <ReviewCardVideo preload='auto' autoPlay loop muted playsInline>
                          <source
                            src='https://hwahae-homepage.s3.ap-northeast-2.amazonaws.com/public/images/home/service-review-01.mp4'
                            type='video/mp4'
                          />
                          <source
                            src='https://hwahae-homepage.s3.ap-northeast-2.amazonaws.com/public/images/home/service-review-01.webm'
                            type='video/webm'
                          />
                        </ReviewCardVideo>
                      </ReviewCardInner>
                      <ReviewCardInner>
                        <ReviewCardVideo preload='auto' playsInline>
                          <source
                            src='https://hwahae-homepage.s3.ap-northeast-2.amazonaws.com/public/images/home/service-review-02.mp4'
                            type='video/mp4'
                          />
                          <source
                            src='https://hwahae-homepage.s3.ap-northeast-2.amazonaws.com/public/images/home/service-review-02.webm'
                            type='video/webm'
                          />
                        </ReviewCardVideo>
                      </ReviewCardInner>
                      <ReviewCardInner>
                        <ReviewCardVideo preload='auto' playsInline>
                          <source
                            src='https://hwahae-homepage.s3.ap-northeast-2.amazonaws.com/public/images/home/service-review-03.mp4'
                            type='video/mp4'
                          />
                          <source
                            src='https://hwahae-homepage.s3.ap-northeast-2.amazonaws.com/public/images/home/service-review-03.webm'
                            type='video/webm'
                          />
                        </ReviewCardVideo>
                      </ReviewCardInner>
                    </ReviewCardWrap>
                  </ReviewCardViewport>
                </ReviewCardSection>
              </ReviewInner>
            </ProductReview>
            <ProductShopping>
              <ShoppingTitle>
                탐색부터 구매까지
                <br />
                인생템 찾는 화해 쇼핑
              </ShoppingTitle>
              <ShoppingInner>
                <ShoppingController>
                  <ControllerLink role='button' selected={true}>
                    1
                  </ControllerLink>
                  <ControllerLink role='button'>2</ControllerLink>
                  <ControllerLink role='button'>3</ControllerLink>
                </ShoppingController>
                <ShoppingViewport>
                  <ShoppingViewportInner>
                    <ShoppingViewportTitle>
                      화해 유저의 호평을 받은 제품들을 소개드려요.
                    </ShoppingViewportTitle>
                    <ShoppingThumbWrap aria-hidden='true'>
                      <ShoppingThumbSection style={{ width: 1080, transform: 'none' }}>
                        <ShoppingThumb>
                          <ShoppingThumbInner bgImageUrl='https://hwahae-homepage.s3.ap-northeast-2.amazonaws.com/public/images/home/buy-01.jpg' />
                        </ShoppingThumb>
                        <ShoppingThumb>
                          <ShoppingThumbInner bgImageUrl='https://hwahae-homepage.s3.ap-northeast-2.amazonaws.com/public/images/home/buy-02.jpg' />
                        </ShoppingThumb>
                        <ShoppingThumb>
                          <ShoppingThumbInner bgImageUrl='https://hwahae-homepage.s3.ap-northeast-2.amazonaws.com/public/images/home/buy-03.jpg' />
                        </ShoppingThumb>
                      </ShoppingThumbSection>
                    </ShoppingThumbWrap>
                  </ShoppingViewportInner>
                </ShoppingViewport>
              </ShoppingInner>
            </ProductShopping>
            <ProductRanking>
              <RankingHgroup>
                <RankingTitle>
                  가장 믿을 만한
                  <br />
                  화해 랭킹
                </RankingTitle>
                <RankingDesc>
                  업계 최대 실 사용자 데이터가 보여주는
                  <br />
                  화해 랭킹에서 다양한 카테고리별 랭킹을 찾아보세요.
                </RankingDesc>
              </RankingHgroup>
              <RankingInner>
                <RankingTab>
                  {/* <CategoryList>
                    <CategoryItem selected={true}>
                      <CategoryLink type='button' category={1}>
                        <CategoryText selected={true}>카테고리별</CategoryText>
                      </CategoryLink>
                    </CategoryItem>
                    <CategoryItem>
                      <CategoryLink type='button' category={2} />
                    </CategoryItem>
                    <CategoryItem>
                      <CategoryLink type='button' category={3} />
                    </CategoryItem>
                    <CategoryItem>
                      <CategoryLink type='button' category={4} />
                    </CategoryItem>
                    <CategoryItem>
                      <CategoryLink type='button' category={5} />
                    </CategoryItem>
                    <CategoryItem>
                      <CategoryLink type='button' category={6} />
                    </CategoryItem>
                  </CategoryList> */}
                  <RankingContents>
                    <RankingViewport>
                      <RankingList>
                        <RankingItem style={{ opacity: 1, transform: 'none' }}>
                          <RankingLink>
                            <RankingImg
                              src='/images/product-ranking/categoryImage1.jpg'
                              width={100}
                              height={100}
                              alt=''
                            />
                            <RankingLinkInner>
                              <RankingLinkTitle>토리든 (TORRIDEN)</RankingLinkTitle>
                              <RankingLinkDesc>다이브인 저분자 히알루론산 세럼</RankingLinkDesc>
                            </RankingLinkInner>
                          </RankingLink>
                        </RankingItem>
                        <RankingItem style={{ opacity: 1, transform: 'none' }}>
                          <RankingLink>
                            <RankingImg
                              src='/images/product-ranking/categoryImage2.jpg'
                              width={100}
                              height={100}
                              alt=''
                            />
                            <RankingLinkInner>
                              <RankingLinkTitle>아로마티카 (AROMATICA)</RankingLinkTitle>
                              <RankingLinkDesc>수딩 알로에 베라 젤</RankingLinkDesc>
                            </RankingLinkInner>
                          </RankingLink>
                        </RankingItem>
                        <RankingItem style={{ opacity: 1, transform: 'none' }}>
                          <RankingLink>
                            <RankingImg
                              src='/images/product-ranking/categoryImage3.jpg'
                              width={100}
                              height={100}
                              alt=''
                            />
                            <RankingLinkInner>
                              <RankingLinkTitle>비플레인 (beplain)</RankingLinkTitle>
                              <RankingLinkDesc>캐모마일 약산성 토너</RankingLinkDesc>
                            </RankingLinkInner>
                          </RankingLink>
                        </RankingItem>
                      </RankingList>
                    </RankingViewport>
                  </RankingContents>
                </RankingTab>
              </RankingInner>
            </ProductRanking>
            <ProductDiscovery>
              <DiscoveryInner>
                <DiscoveryTitle>
                  제품별로 쉽게 찾는
                  <br />
                  화장품 성분 정보
                </DiscoveryTitle>
                <DiscoveryDesc>
                  다양한 성분 정보를 통해 좋은 성분, 나쁜 성분이 아닌
                  <br />내 피부에 꼭 맞는 성분을 찾아보세요.
                </DiscoveryDesc>
              </DiscoveryInner>
              <DiscoveryVideo>
                <Video loop playsInline>
                  <source
                    src='https://hwahae-homepage.s3.ap-northeast-2.amazonaws.com/public/images/home/info-img.mp4'
                    type='video/mp4'
                  />
                  <source
                    src='https://hwahae-homepage.s3.ap-northeast-2.amazonaws.com/public/images/home/info-img.webm'
                    type='video/webm'
                  />
                </Video>
              </DiscoveryVideo>
            </ProductDiscovery>
          </ProductBlock>
        </main>
      </main>
      <Footer />
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
  ${({ hasBg }) =>
    hasBg &&
    css`
      background: #fff;
    `}
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
  display: block;
  width: 48px;
  height: 24px;
  padding: 20px 24px;
  ${media.tablet} {
    width: 58px;
    height: 29px;
    padding: 22px;
  }
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
        & span[data-text='linkText'] {
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
    ${({ hasBg, selected }) =>
      hasBg
        ? selected
          ? css`
              ${selectedHeaderMenuItem}
            `
          : css`
              color: #222;
            `
        : null}
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
  position: relative;

  ${media.mobile} {
    padding-bottom: 150px;
  }
  ${media.desktop} {
    position: relative;
    padding-bottom: 170px;
  }
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

// product-info
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
  vertical-align: -1px;
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
  ${media.desktop} {
    margin: 0;
  }
`
const CountingIndex = styled.div`
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
  ${media.desktop} {
    font-size: 85px;
    line-height: 1.12;
  }
`
const InfoImage = styled.div`
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
  ${media.desktop} {
    left: 280px;
    border-radius: 290px;
    width: 940px;
  }
`
const InfoDate = styled.div`
  margin-top: 28px;
  font-size: 15px;
  line-height: 1.93;
  letter-spacing: -0.83px;
  text-align: center;
  color: #c8c8c8;
  ${media.desktop} {
    padding-left: 60px;
    font-size: 16px;
    line-height: 1.81;
    letter-spacing: -0.89px;
    text-align: left;
  }
`

// SECTION product-info

const ReviewDesc = styled.div`
  color: #212529;
  text-align: center;
  padding-top: 15px;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: -1px;
  ${media.desktop} {
    max-width: 1070px;
    padding-left: 60px;
    margin: 0 auto;
    text-align: left;
    box-sizing: border-box;
    font-size: 18px;
    line-height: 29px;
    padding: 30px 0 0;
  }
`

const ProductReview = styled.section`
  padding: 100px 0 0;
  ${media.desktop} {
    position: relative;
    max-width: 1070px;
    margin: 0 auto;
    padding: 310px 0 210px;
  }
`

const ReviewInner = styled.div`
  overflow: hidden;
  ${media.desktop} {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    padding-top: 30px;
    padding-left: 50px;
    padding-bottom: 100px;
  }
`

const ReviewTagSection = styled.div`
  ${media.desktop} {
    width: 490px;
    padding-left: 40px;
  }
`

const ReviewTitle = styled.h3`
  color: #212529;
  text-align: center;
  font-size: 27px;
  line-height: 40px;
  letter-spacing: -1.5px;
  transition: font-size 1s, line-height 1s, letter-spacing 1s;
  ${media.mobile} {
    font-size: 32px;
    line-height: 42px;
    letter-spacing: -1px;
  }
  ${media.desktop} {
    padding: 50px 0 0;
    font-size: 52px;
    transition: font-size 1s;

    line-height: 70px;
    letter-spacing: -2.89px;

    max-width: 1070px;
    margin: 0 auto;
    text-align: left;
    box-sizing: border-box;
  }
`

const ReviewTagViewport = styled.div`
  overflow: hidden;
  ${media.mobile} {
    overflow: visible;
  }
`

const ReviewTagArea = styled.div`
  position: relative;
  left: 50%;
  width: 100%;
  padding-top: 30px;
  text-align: center;
  transform: translate(-50%);
  ${media.mobile} {
    display: block;
    position: static;
    max-width: 580px;
    margin: 0 auto;
    padding-top: 20px;
    transform: translate(0);
  }
  ${media.desktop} {
    width: 100%;
    padding-top: 40px !important;
    margin-left: -19px !important;
    text-align: left;
  }
`

const ReviewTagList = styled.div`
  display: inline;
  ${media.mobile} {
    display: inline;
  }
  ${media.desktop} {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-top: 20px;
    white-space: nowrap;
  }
`

// const ReviewTagIndicator = styled.span`
//   ${media.desktop} {
//     position: absolute;
//     top: 1px;
//     display: block;
//     width: 126px;
//     height: 50px;
//     background: #22d3d6;
//     border-radius: 30px;
//   }
//   display: none;
//   transition-duration: 1s;
// `

const ReviewTag = styled.span`
  display: inline-block;
  height: 40px;
  margin: 15px 0 0 -4px;
  padding: 0 18px;
  border-radius: 30px;
  color: #c8c8c8;
  font-size: 21px;
  line-height: 40px;
  &[aria-selected='true'] {
    background: #22d3d6;
    color: #fff;
  }
  ${media.desktop} {
    position: relative;
    height: 50px;
    margin-top: 0;
    font-size: 34px;
    line-height: 51px;
    letter-spacing: -1.89px;

    &[aria-selected='true'] {
      background: none;
    }
  }
`

const ReviewCardSection = styled.div`
  overflow: hidden;
  width: 250px;
  height: 472px;
  margin: 55px auto 98px;
  border-radius: 20px;
  box-shadow: 0 30px 60px 12px rgba(0, 0, 33, 0.05), 0 4px 24px 0 rgba(0, 0, 33, 0.05),
    0 0 1px 0 rgba(0, 0, 33, 0.05);
  ${media.mobile} {
    margin-bottom: 150px;
  }
  ${media.desktop} {
    min-width: 360px;
    height: 680px;
    margin: 0 !important;
  }
`

const ReviewCardViewport = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  border-radius: 20px;
  -webkit-mask-image: -webkit-radial-gradient(#fff, #000);
`

const ReviewCardWrap = styled.div`
  width: 100%;
  white-space: nowrap;
  transition-duration: 1s;
`

const ReviewCardInner = styled.div`
  display: inline-block;
`

const ReviewCardVideo = styled.video`
  width: 100%;
`

// SECTION product-shopping
const ProductShopping = styled.section`
  ${media.tablet} {
    height: 1010px;
  }
  overflow: hidden;
  height: 685px;
  background-color: #51ced3;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;
`

const ShoppingTitle = styled.h3`
  ${media.mobile} {
    font-size: 32px;
    line-height: 42px;
    letter-spacing: -1px;
  }
  ${media.tablet} {
    padding: 0;
    text-align: center;
  }
  color: #fff;
  flex: none;
  width: 100%;
  text-align: center;
  transition: font-size 1s, line-height 1s, letter-spacing 1s;
`

const ShoppingInner = styled.div`
  flex: none;
  width: 100%;
`

const ShoppingController = styled.div`
  ${media.tablet} {
    margin-top: 45px;
  }
  display: flex;
  justify-content: center;
  margin-top: 30px;
`

const ControllerLink = styled.a<{ selected?: boolean }>`
  ${media.tablet} {
    width: 40px;
    height: 40px;
    margin: 0 20px;
    font-size: 16px;
    line-height: 38px;
    ${({ selected }) =>
      selected &&
      css`
        line-height: 36px;
      `}
  }
  display: block;
  width: 34px;
  height: 34px;
  margin: 0 13px;
  border: 1px solid #fff;
  border-radius: 50%;
  box-sizing: border-box;
  opacity: 0.5;
  color: #fff;
  cursor: pointer;
  font-family: Montserrat;
  font-weight: 600;
  text-align: center;
  line-height: 32px;
  ${({ selected }) =>
    selected &&
    css`
      opacity: 1;
      font-weight: 700;
      border-width: 2px;
      line-height: 30px;
    `}
`

const ShoppingViewport = styled.div`
  overflow: hidden;
  overflow-x: auto;
  display: flex;
  margin-top: 15px;
  ${media.tablet} {
    margin-top: 25px;
  }
`

const ShoppingViewportInner = styled.div`
  min-width: 100%;
  text-align: center;
`

const ShoppingViewportTitle = styled.p`
  color: #fff;
  font-size: 15px;
  ${media.tablet} {
    margin-top: 7px;
    font-size: 18px;
  }
`

const shoppingThumbWrapSection = css`
  display: flex;
  position: relative;
  width: 250px;
  height: 363px;
  margin: 0 auto;
  border-radius: 20px 20px 0 0;
  border-bottom: 1px solid #f2f2f2;
  box-shadow: 0 30px 60px 12px rgba(0, 0, 33, 0.05), 0 4px 24px 0 rgba(0, 0, 33, 0.05),
    0 0 1px 0 rgba(0, 0, 33, 0.05);
  transition: height 1s;
`
const ShoppingThumbWrap = styled.div`
  ${shoppingThumbWrapSection}
  overflow: hidden;
  margin-top: 55px;
  z-index: 0;
  ${media.tablet} {
    width: 360px;
    height: 507px;
  }
`

const ShoppingThumbSection = styled.div`
  ${shoppingThumbWrapSection}
  transition: transform 1s;
  ${media.tablet} {
    width: 360px;
    height: 507px;
  }
`

const ShoppingThumb = styled.span`
  display: inline-flex;
  min-width: 100%;
`

const ShoppingThumbInner = styled.div<{ bgImageUrl: string }>`
  width: 100%;
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  border-radius: 0;
  box-shadow: none;
  background-image: ${({ bgImageUrl }) => `url("${bgImageUrl}")`};
`

// SECTION product-ranking
const ProductRanking = styled.section`
  padding: 100px 0 0;
  ${media.desktop} {
    display: flex;
    align-items: center;
    max-width: 1240px;
    margin: 0 auto;
    padding-top: 250px;
  }
`

const RankingHgroup = styled.div`
  ${media.desktop} {
    width: 39%;
    margin-top: -34px;
    padding-left: 110px;
  }
`

const RankingTitle = styled.h3`
  color: #212529;
  text-align: center;
  font-size: 27px;
  line-height: 40px;
  letter-spacing: -1.5px;
  transition: font-size 1s, line-height 1s, letter-spacing 1s;
  ${media.mobile} {
    font-size: 32px;
    line-height: 42px;
    letter-spacing: -1px;
  }
  ${media.desktop} {
    font-size: 52px;
    transition: font-size 2s;
    max-width: 1070px;
    padding-left: 60px;
    margin: 0 auto;
    text-align: left;
    box-sizing: border-box;

    line-height: 70px;
    letter-spacing: -2.89px;
  }
`

const RankingDesc = styled.p`
  color: #212529;
  text-align: center;
  padding-top: 15px;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: -1px;
  ${media.desktop} {
    padding-top: 30px;
    font-size: 18px;
    line-height: 29px;
    max-width: 1070px;
    padding-left: 60px;
    margin: 0 auto;
    text-align: left;
    box-sizing: border-box;
  }
`

const RankingInner = styled.div`
  ${media.desktop} {
    overflow: hidden;
    width: 61%;
  }
`

const RankingTab = styled.div`
  overflow: auto;
  margin-top: 40px;
  ${media.mobile} {
    margin-top: 50px;
  }
  ${media.desktop} {
    overflow: visible;
  }
`

const CategoryList = styled.ul`
  ${media.mobile} {
    justify-content: center;
  }
  overflow-x: auto;
  display: flex;
  padding-left: 24px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  ${media.desktop} {
    padding-left: 112px;
  }
`

const CategoryItem = styled.li<{ selected?: boolean }>`
  padding-right: 10px;
`

const CategoryLink = styled.button<{ category: number; selected?: boolean }>`
  display: block;
  width: 45px;
  height: 45px;
  padding: 0 18px;
  border: 1px solid #999;
  border-radius: 30px;
  line-height: 43px;
  box-sizing: border-box;
  cursor: pointer;
  background-image: ${({ category = 1 }) =>
    `https://hwahae-homepage.s3.ap-northeast-2.amazonaws.com/images/rank_cate0${category}.png`};
  background-repeat: no-repeat;
  background-position: 0 50%;
  background-size: 45px;
  opacity: 0.3;
  transition: all 0.8s ease;

  ${({ selected }) =>
    selected &&
    css`
      width: auto;
      padding-left: 48px;
      background-color: #22d3d6;
      background-position: 7px 50%;
      border-color: #22d3d6;
      opacity: 1;
    `}
  ${media.desktop} {
    width: 60px;
    height: 60px;
    background-size: 60px;
    line-height: 58px;
    ${({ selected }) =>
      selected &&
      css`
        padding: 0 30px 0 66px;
        letter-spacing: -0.94px;
      `}
  }
`

const CategoryText = styled.span<{ selected?: boolean }>`
  display: block;
  white-space: nowrap;
  color: #000;
  font-size: 15px;
  font-weight: 700;
  text-indent: -9999px;
  ${({ selected }) =>
    selected &&
    css`
      text-indent: 0;
    `}
  ${media.desktop} {
    font-size: 17px;
  }
`

const RankingContents = styled.div``

const RankingViewport = styled.div`
  overflow: auto;
  display: flex;
`

const RankingList = styled.ol`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100%;
  padding: 0 24px 100px;
  box-sizing: border-box;
  overflow: hidden;
  ${media.mobile} {
    padding-bottom: 135px;
  }
  ${media.desktop} {
    padding: 0 10px 80px 56px;
  }
`

const RankingItem = styled.li`
  overflow: hidden;
  width: 100%;
  max-width: 350px;
  margin-top: 15px;
  padding: 0 10px;
  background: #fff;
  box-shadow: 0 30px 60px 12px rgba(0, 0, 33, 0.05), 0 4px 19px 0 rgba(0, 0, 33, 0.05);
  border-radius: 10px;
  z-index: 1;
  box-sizing: border-box;

  &:first-of-type {
    margin-top: 40px;
  }
  ${media.desktop} {
    max-width: 430px;
  }
`

const RankingLink = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  ${media.desktop} {
    padding-left: 10px;
  }
`

const RankingImg = styled.img`
  width: 100px;
`

const RankingLinkInner = styled.div`
  ${media.desktop} {
    padding-left: 20px;
  }
`

const RankingLinkTitle = styled.span`
  color: #9da2aa;
  font-size: 13px;
  ${media.desktop} {
    font-size: 14px;
  }
`

const RankingLinkDesc = styled.p`
  color: #000;
  font-size: 15px;
  ${media.desktop} {
    font-size: 18px;
    letter-spacing: -1px;
  }
`

// SECTION product-contents
const ProductContents = styled.section`
  ${media.desktop} {
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    position: relative;
    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      bottom: 540px;
      z-index: -1;
      width: 99vw;
      height: 1px;
      background: #e3e3e3;
    }
  }
`

const ContentsInner = styled.div`
  ${media.desktop} {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: space-between;
    position: relative;
    max-width: 1140px;
    margin: 0 auto;
    overflow: hidden;
  }
`

const ContentsHgroup = styled.div`
  ${media.desktop} {
    width: 45%;
    padding-bottom: 335px;
    padding-left: 0;
  }
`

const ContentsTitle = styled.h3`
  color: #212529;
  text-align: center;
  font-size: 27px;
  line-height: 40px;
  letter-spacing: -1.5px;
  transition: font-size 1s, line-height 1s, letter-spacing 1s;
  ${media.mobile} {
    font-size: 32px;
    line-height: 42px;
    letter-spacing: -1px;
  }
  ${media.desktop} {
    max-width: 1070px;
    padding-left: 60px;
    margin: 0 auto;
    text-align: left;
    box-sizing: border-box;
    font-size: 52px;
    line-height: 70px;
    letter-spacing: -2.89px;

    transition: font-size 1s;
    padding-left: 0;
  }
`

const ContentsDesc = styled.p`
  color: #212529;
  text-align: center;
  padding-top: 15px;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: -1px;
  ${media.desktop} {
    max-width: 1070px;
    padding-left: 60px;
    margin: 0 auto;
    text-align: left;
    box-sizing: border-box;
    padding-top: 30px;
    font-size: 18px;
    line-height: 29px;

    padding-left: 0;
  }
`

const ContentsSlides = styled.div`
  overflow: hidden;
  ${media.desktop} {
    position: relative;
    z-index: 30;
    width: 49%;
    padding: 290px 0 370px 90px;
  }
`

// const SwiperContainer = styled.div``
const ProductContentsSwiper = styled.div`
  overflow: hidden;
  padding: 0 18%;
  border-radius: 20px;
  -webkit-mask-image: -webkit-radial-gradient(#fff, #000);
  ${media.tablet} {
    padding: 0 25%;
  }
  ${media.desktop} {
    display: flex;
    width: 360px;
    padding: 0;
  }
`

const SwiperWrapper = styled.div`
  display: flex;
`

// const SwiperSlide = styled.div``

const ProductContentsSwiperItem = styled.div`
  overflow: hidden;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100% !important;
  padding: 70px 10% 98px;
  -webkit-mask-image: -webkit-radial-gradient(#fff, #000);
  ${media.tablet} {
    padding: 70px 15% 98px;
  }
  ${media.desktop} {
    padding: 0;
  }
`

const ProductContentsSwiperImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  ${media.desktop} {
    border-radius: 0;
  }
`

const ContentsListArea = styled.div`
  ${media.desktop} {
    display: block;
    position: absolute;
    bottom: 430px;
    width: 100%;
    height: 213px;
    box-sizing: border-box;
    padding-left: 53%;
  }
  display: none;
`

const ContentsList = styled.ul`
  ${media.desktop} {
    display: flex;
    position: relative;
    height: 100%;
  }
`

const ContentsItem = styled.li`
  ${media.desktop} {
    overflow: hidden;
    position: absolute;
    padding: 0 30px;
  }
`

const ContentsImg = styled.img`
  ${media.desktop} {
    width: 210px;
    height: 210px;
    border-radius: 50%;
  }
`

// SECTION product-discovery
const ProductDiscovery = styled.section`
  display: block;
  ${media.mobile} {
    margin-top: 35px;
  }
  ${media.desktop} {
    display: flex;
    position: relative;
    height: 410px;
    margin-top: 95px;
    /* margin-bottom: -100px; */
    padding: 0;
    background-size: auto 410px;
  }
`

const DiscoveryInner = styled.div`
  ${media.desktop} {
    width: 100%;
    max-width: 1040px;
    margin: 0 auto;
    margin-top: 250px;
  }
`

const DiscoveryTitle = styled.h3`
  color: #212529;
  text-align: center;
  font-size: 27px;
  line-height: 40px;
  letter-spacing: -1.5px;
  transition: font-size 1s, line-height 1s, letter-spacing 1s;
  ${media.mobile} {
    font-size: 32px;
    line-height: 42px;
    letter-spacing: -1px;
  }
  ${media.desktop} {
    max-width: 1070px;
    padding-left: 60px;
    margin: 0 auto;
    text-align: left;
    box-sizing: border-box;
    font-size: 52px;
    line-height: 70px;
    letter-spacing: -2.89px;
  }
`

const DiscoveryDesc = styled.p`
  color: #212529;
  text-align: center;
  padding-top: 15px;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: -1px;
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
`

const DiscoveryVideo = styled.div`
  overflow: hidden;
  position: relative;
  left: 0;
  height: 266px;
  margin-top: 50px;
  padding-left: 20px;
  transition: height 1s;
  ${media.mobile} {
    height: 328px;
    padding-left: 135px;
  }
  ${media.desktop} {
    overflow: hidden;
    position: absolute;
    top: 100px;
    /* top: -150px; */
    display: flex;
    width: 100%;
    height: 410px;
    padding-left: 50%;
    box-sizing: border-box;
    text-align: right;
    justify-content: flex-start;
  }
`

const Video = styled.video`
  height: 266px;
  position: absolute;
  left: 20px;
  height: 100%;
  -webkit-filter: brightness(100%);
  ${media.mobile} {
    height: 328px;
    position: absolute;
    left: 135px;
  }
  ${media.desktop} {
    position: static;
    height: 410px;
    -webkit-filter: none;
  }
  ${media.xwide} {
    position: static;
  }
`
