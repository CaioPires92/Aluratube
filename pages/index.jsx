import config from '../config.json'
import styled from 'styled-components'
import { CSSReset } from '../src/components/CSSReset'
import Menu from '../src/components/Menu'
import { StyledTimeline } from '../src/components/Timeline'

// console.log(config.playlists)

function HomePage() {
  // const estiloZuado = { background: 'red' }
  return (
    <>
      <CSSReset />
      <div>
        <Menu />
        <Header />
        <Timeline playlists={config.playlists}>Counteudo</Timeline>
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
    margin-top: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`
function Header() {
  return (
    <StyledHeader>
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

function Timeline(props) {
  // console.log('dentro do component', props.playlists)
  const playlistNames = Object.keys(props.playlists)
  return (
    <StyledTimeline>
      {playlistNames.map(playlistName => {
        const videos = props.playlists[playlistName]
        console.log(playlistName)
        console.log(videos)
        return (
          <section>
            <h2>{playlistName}</h2>
            <div>
              {videos.map(video => {
                return (
                  <a href={video.url}>
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
