import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import { Avatar, List, Divider } from "antd"

const Bio = () => {

  const data = useStaticQuery(graphql`
    query bio {
      site {
        siteMetadata {
          author
          bio
          authorImage
        }
      }
    }
  `)

  const {author,bio,authorImage} = data.site.siteMetadata

  return (
    <>
    <Divider orientation="left">Author</Divider>
    <List.Item>
      <List.Item.Meta
        avatar={
          <Avatar
            size={64}
            src={authorImage}
          />
        }
        title={<Link to="/about">{author}</Link>}
        description={bio}
      />
    </List.Item>
    </>
  )
}

export default Bio
