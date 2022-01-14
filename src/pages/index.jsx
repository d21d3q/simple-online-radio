import React, { useState, useRef } from "react"
import AudioPlayer from 'react-h5-audio-player';
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import 'react-h5-audio-player/lib/styles.css';


const IndexPage = ({data}) => {

  const [streamUrl, setStreamUrl] = useState(null)
  const playerRef = useRef(null)
  
  function pickRadio(url) {
    playerRef.current.audio.current.pause()
    playerRef.current.audio.current.currentTime = 0;
    setStreamUrl(url)
    playerRef.current.audio.current.load()
    console.log("player", playerRef.current.audio.current)
  }

  return (
    <main className="max-w-xs mx-auto">
      <div className="mx-1 mt-1 mb-4 ">
        <AudioPlayer
        ref = {playerRef}
        src={streamUrl}
        autoPlay={true}
        preoad="none"
        showJumpControls={false}
        hasDefaultKeyBindings={false}
        customAdditionalControls={[]}
        customProgressBarSection={[]}
        customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
        />
      </div>
      <ul className="mx-1">
        {data.allRadiosJson.nodes.map((radio) => (
          <li 
            key={radio.name}
            className={`flex flex-row my-1 h-16 border border-2 border-gray-200 rounded cursor-pointer ${radio.stream === streamUrl ? "border-red-200" : ""}`}
            onClick={() => pickRadio(radio.stream)}
          >
            <div className="w-16 h-full mr-2 flex items-center">
              <GatsbyImage
                className="rounded m-1 border "
                image={getImage(radio.image.src)}
                alt={radio.name}
              />
            </div>
            <div className="text-lg font-semibold my-auto" >
            {radio.name}
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default IndexPage

export const query = graphql`
query {
	allRadiosJson {
    nodes {
			name
      stream
      image {
        src {
          childImageSharp {
						gatsbyImageData (
              layout: CONSTRAINED,
              width: 100,
              height: 100,
              placeholder: BLURRED
            )
          }
        }
      }
    }
  }
}
`
