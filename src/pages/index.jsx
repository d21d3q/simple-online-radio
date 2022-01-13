import React, { useState } from "react"
import ReactAudioPlayer from 'react-audio-player';
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";


const IndexPage = ({data}) => {

  const [streamUrl, setStreamUrl] = useState(null)
  
  function pickRadio(url) {
    setStreamUrl(url)
  }

  return (
    <main className="max-w-xs mx-auto">
      <ReactAudioPlayer
       className="mb-4 mx-auto"
       src={streamUrl}
       autoPlay={true}
       controls
      />
      <ul>
        {data.allRadiosJson.nodes.map((radio) => (
          <li 
            key={radio.name}
            className="flex flex-row my-1 h-16 border border-2 border-gray-200 rounded"
            onClick={() => pickRadio(radio.stream)}
          >
            <div className="mr-3 h-14 w-14 my-auto">
              <GatsbyImage
                className="rounded"
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
