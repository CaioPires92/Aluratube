import React from 'react'
import config from '../config.json'
import styled from 'styled-components'
import { CSSReset } from '../src/components/CSSReset'
import Menu from '../src/components/Menu'
import { StyledTimeline } from '../src/components/Timeline'

// console.log(config.playlists)

function HomePage() {
  const [valorDoFiltro, setValorDoFiltro] = React.useState('')

  return (
    <>
      <CSSReset />
      <div>
        <Menu
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>
          Counteudo
        </Timeline>
      </div>
    </>
  )
}

export default HomePage

const StyledHeader = styled.div`
  img {
    margin-top: 20px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`
const StyledBanner = styled.div`
  height: 230px;
  background-image: url(${({ bg }) => bg});
  /* background-image: url(${config.bg}); */
`
function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  )
}

function Timeline({ searchValue, ...props }) {
  // console.log('dentro do component', props.playlists)
  const playlistNames = Object.keys(props.playlists)
  return (
    <StyledTimeline>
      {playlistNames.map(playlistName => {
        const videos = props.playlists[playlistName]
        // console.log(playlistName)
        // console.log(videos)
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter(video => {
                  const titleNormalized = video.title.toLowerCase()
                  const searchValueNormalized = searchValue.toLowerCase()
                  return titleNormalized.includes(searchValueNormalized)
                })
                .map(video => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  )
                })}
            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}
