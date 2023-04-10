import { graphql } from 'gatsby'

export const MEGAMENU_QUERY = graphql`
  {
    allSanityMegaMenu {
      nodes {
        groups {
          title
          subGroup {
            title
            links {
              text
              path
            }
          }
          navFeature {
            title
            link {
              path
            }
            image {
              asset {
                gatsbyImageData(placeholder: BLURRED, height: 280)
              }
            }
          }
          navFeature2 {
            title
            link {
              path
            }
            image {
              asset {
                gatsbyImageData(placeholder: BLURRED, height: 280)
              }
            }
          }
        }
      }
    }
    allShopifyCollection(filter: { image: { originalSrc: { ne: null } } }) {
      nodes {
        handle
        image {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
    allSanityCard {
      nodes {
        collectionHandle
        image {
          asset {
            gatsbyImageData(placeholder: BLURRED, height: 280)
          }
        }
      }
    }
    allSanityCollectionGroupPage {
      nodes {
        slug {
          current
        }
        image {
          asset {
            gatsbyImageData(placeholder: BLURRED, height: 280)
          }
        }
      }
    }
  }
`
