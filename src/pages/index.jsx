import React, { useState, useRef } from "react"
import ReactAudioPlayer from 'react-audio-player';
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";


const IndexPage = ({data}) => {

  const [streamUrl, setStreamUrl] = useState(null)
  const playerRef = useRef(null)
  
  function pickRadio(url) {
    setStreamUrl(url)
    playerRef.current.audioEl.current.load()
  }

  return (
    <main className="max-w-xs mx-auto">
      <ReactAudioPlayer
       className="mt-1 mb-4 mx-auto"
       ref = {playerRef}
       src={streamUrl}
       autoPlay={true}
       controls
      />
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
