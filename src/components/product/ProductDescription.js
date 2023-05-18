import React, { useState, useRef, useContext } from 'react'
import styled from '@emotion/styled'
import { truncate } from 'lodash'
import { Text, Box, Button, Heading } from 'theme-ui'
import { ProductContext } from './ProductContext'

export const DescriptionHtml = styled.div`
  padding: 0 8px;
  color: var(--theme-ui-colors-black);
  font-size: 10px;
  font-weight: medium;
  line-height: 1.5;
  text-align: left;

  h3 {
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-weight: 400;
    margin: 1em 0 2em;
  }

  ul {
    list-style-type: none;
    line-height: 1.5;
    padding-left: 24px;
  }
  li {
    padding-bottom: 5px;
    letter-spacing: 0.1em;
  }
  p,
  div,
  span {
    font-family: var(--theme-ui-font-body);
    line-height: 2.5;
    margin: 0 0 1em;
    letter-spacing: 0.1em;
  }
  a {
    color: var(--theme-ui-colors-black);
  }
  img {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
  a {
    color: #14191f;
  }
`

const stripHtml = (str = '') => str.replace(/(<([^>]+)>)/gi, '')

export const ProductDescription = props => {
  const {
    product: { descriptionHtml },
  } = useContext(ProductContext)
  const previewText = stripHtml(descriptionHtml)

  // hide text if length greater than 500
  const [open, setOpen] = useState(previewText.length < 500)
  if (!descriptionHtml) return null
  return (
    <Box>
      <Heading as="h2" variant="caps" pb={4} px={2}>
        The Story
      </Heading>
      {open && (
        <DescriptionHtml
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
      )}
      {!open && (
        <Text as="p" variant="copy" sx={{ fontSize: 0 }} px={2}>
          {truncate(previewText, { length: 310 })}
          <Button
            variant="link"
            type="button"
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 0,
            }}
            pl={2}
            onClick={() => setOpen(true)}
          >
            Read More
          </Button>
        </Text>
      )}
    </Box>
  )
}
