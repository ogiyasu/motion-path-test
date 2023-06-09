import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const padding = 50

const maxIndex = 7

const positionArray = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100, 112.5]

const Nav1 = styled.li<{ index: number; rectpath: string }>`
  color: #ff0000;
  offset-path: path('${props => `${props.rectpath}`}');
  offset-distance: ${props => `${positionArray[props.index % 8]}`}%;
  position: absolute;
  transition: offset-distance 0.5s ease-in-out;
`

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
`

const Home: NextPage = () => {
  const [index, setIndex] = useState(0)
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })
  const [rectpath, setRectpath] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      window.addEventListener('resize', handleResize)
      handleResize()
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const rect = `M${padding} ${padding}, L${
      windowSize.width - padding
    },${padding}, L${windowSize.width - padding},${
      windowSize.height - padding
    }, L${padding},${windowSize.height - padding}, L${padding},${padding}, L${
      padding + 1
    },${padding}`
    setRectpath(rect)
  }, [windowSize])

  const handleClick = () => {
    setIndex(current => current + 1)
    console.log(index)
  }
  return (
    <div className='page'>
      <svg width='1000px' height='500px' viewBox='0 0 1000 500'>
        <path d={rectpath} stroke='silver' strokeWidth='1' fill='transparent' />
      </svg>
      <div className='inner'>
        <Nav>
          <ul>
            <Nav1 index={index} rectpath={rectpath}>
              CONTACT
            </Nav1>
            <Nav1 index={index + 1} rectpath={rectpath}>
              DAIEI
            </Nav1>
            <Nav1 index={index + 2} rectpath={rectpath}>
              VISION
            </Nav1>
            <Nav1 index={index + 3} rectpath={rectpath}>
              SERVICE
            </Nav1>
            <Nav1 index={index + 4} rectpath={rectpath}>
              RECRUIT
            </Nav1>
            <Nav1 index={index + 5} rectpath={rectpath}>
              WORKS
            </Nav1>
            <Nav1 index={index + 6} rectpath={rectpath}>
              ABOUT
            </Nav1>
            <Nav1 index={index + 7} rectpath={rectpath}>
              BRAND
            </Nav1>
          </ul>
        </Nav>
        <button onClick={handleClick} type='button'>
          Move
        </button>
      </div>
    </div>
  )
}

export default Home
