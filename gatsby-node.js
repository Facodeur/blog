const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "DD MMMM, YYYY")
              slug
            }
            excerpt
          }
        }
      }
    }
  `).then(result => {
    console.log(JSON.stringify(result, null, 2))
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const prev = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node
      createPage({
        path: `${post.node.frontmatter.slug}`,
        component: path.resolve(`src/templates/post.js`),
        context: {
          slug: post.node.frontmatter.slug,
          prev,
          next,
        },
      })
    })
  })
}
