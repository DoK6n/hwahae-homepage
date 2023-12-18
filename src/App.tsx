import styles from './App.module.css'

function App() {
  return (
    <div style={{ border: '1px solid #000' }}>
      <header id='hwahaeNav' className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.headerTitle}>
            <a href='/'>
              <svg
                viewBox='0 0 58 29'
                xmlns='http://www.w3.org/2000/svg'
                width='58'
                height='29'
                role='img'
              >
                <path
                  d='m28.42 25.337-1.712-.032c-1.554-.086-2.702-.714-3.411-1.866-.66-1.073-.8-2.38-.8-3.285V8.28a.25.25 0 0 0-.25-.25h-2.356a.25.25 0 0 0-.25.25v11.874c0 2.306.646 4.265 1.866 5.664 1.225 1.403 2.997 2.206 5.123 2.322h1.79a.25.25 0 0 0 .249-.25v-2.304a.25.25 0 0 0-.25-.25m-12.021.844h-.16.033zm-8.115-7.45a5.165 5.165 0 0 1-5.158-5.16 5.162 5.162 0 0 1 5.158-5.154 5.159 5.159 0 0 1 5.153 5.155 5.162 5.162 0 0 1-5.153 5.16m8.646 7.467c-.002 0-.267.006-.659.006-.427 0-1.064-.007-1.675-.038-2.057-.107-2.91-.4-3.81-1.307-.691-.699-1.08-1.849-1.156-3.373l-.001-.02.021-.005a8.03 8.03 0 0 0 4.734-2.707 8.001 8.001 0 0 0 1.908-5.183c0-4.418-3.592-8.011-8.008-8.011C3.864 5.56.27 9.153.27 13.57a8.03 8.03 0 0 0 6.474 7.865l.019.003v.019c.083 2.302.738 4.13 1.95 5.386 1.34 1.387 3.318 2.09 5.885 2.09h2.332a.188.188 0 0 0 .188-.187v-2.362a.187.187 0 0 0-.188-.186M4.604 3.067h7.264a.26.26 0 0 0 .26-.26V.613a.26.26 0 0 0-.26-.26H4.604a.26.26 0 0 0-.26.26v2.192a.26.26 0 0 0 .26.261m32.763 21.362a5.055 5.055 0 0 1-5.048-5.051 5.053 5.053 0 0 1 5.048-5.046 5.05 5.05 0 0 1 5.044 5.046 5.053 5.053 0 0 1-5.044 5.05m0-12.952c-4.359 0-7.903 3.545-7.903 7.902 0 4.36 3.544 7.907 7.903 7.907 4.357 0 7.9-3.546 7.9-7.907 0-4.357-3.543-7.902-7.9-7.902m-3.553-2.453h7.263a.26.26 0 0 0 .26-.262V6.57a.26.26 0 0 0-.26-.262h-7.263a.261.261 0 0 0-.26.262v2.19c0 .144.116.262.26.262m18.456 1.395c-2.894 0-5.162 2.326-5.162 5.293v12.263c0 .09.074.164.165.164H49.8c.09 0 .164-.074.164-.164V15.71c0-1.388.991-2.437 2.304-2.437 1.313 0 2.303 1.049 2.303 2.437v12.263c0 .09.073.164.164.164h2.529c.09 0 .164-.074.164-.164V15.71c0-2.967-2.267-5.293-5.16-5.293'
                  fill='#5EDFDF'
                  fillRule='evenodd'
                ></path>
              </svg>
            </a>
          </h1>
          <div className={styles.headerMenu} aria-hidden='false'>
            <nav className={styles.headerNav} id='snMenu' aria-label='메인 네비게이션'>
              <ul className={styles.headerNavList}>
                <li className={`${styles.headerNavItem}`}>
                  <a aria-current='page' href='/'>
                    <span className={styles.headerNavItemLink}>
                      <span className={styles.headerNavItemLinkText}>제품소개</span>
                    </span>
                  </a>
                </li>
                <li className={styles.headerNavItem}>
                  <a href='/about'>
                    <span className={styles.headerNavItemLink}>
                      <span className={styles.headerNavItemLinkText}>회사소개</span>
                    </span>
                  </a>
                </li>
                <li className={styles.headerNavItem}>
                  <a href='/career'>
                    <span className={styles.headerNavItemLink}>
                      <span className={styles.headerNavItemLinkText}>채용</span>
                    </span>
                  </a>
                </li>
                <li className={styles.headerNavItem}>
                  <a href='/news'>
                    <span className={styles.headerNavItemLink}>
                      <span className={styles.headerNavItemLinkText}>뉴스</span>
                    </span>
                  </a>
                </li>
                <li className={styles.headerNavItem}>
                  <a href='/notices'>
                    <span className={styles.headerNavItemLink}>
                      <span className={styles.headerNavItemLinkText}>공지</span>
                    </span>
                  </a>
                </li>
                <li className={styles.headerNavItem}>
                  <a target='_blank' rel='noopener noreferrer' href='#'>
                    <span className={styles.headerNavItemLink}>
                      <span className={styles.headerNavItemLinkText}>블로그</span>
                    </span>
                  </a>
                </li>
                <li className={styles.headerNavItem}>
                  <a target='_blank' rel='noopener noreferrer' href='#'>
                    <span className={styles.headerNavItemLink}>
                      <span className={styles.headerNavItemLinkText}>광고문의</span>
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main>
        <div className={styles.mainVisual} style={{ height: '4365px' }}>
          <div className={styles.topContents} style={{ opacity: 1 }}>
            <div className={styles.topContentsInner} style={{ display: 'block' }}>
              <div style={{ height: '100%', transform: 'scale3d(1, 1, 1)' }}>
                {/* <div
                  style={{
                    background:
                      'url("https://hwahae-homepage.s3.ap-northeast-2.amazonaws.com/images/main_2023-09-11-09-34.jpg") center center / cover no-repeat',
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    bottom: '0px',
                    width: '857px',
                    height: '970px',
                  }}
                /> */}
                <div
                  className={styles.mainVisualBackdrop}
                  style={{ background: 'rgba(0, 0, 0, 0)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
