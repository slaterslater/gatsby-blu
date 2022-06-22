import React, { useState, useRef, useContext } from 'react'
import styled from '@emotion/styled'
import { truncate } from 'lodash'
import { Text, Box, Button, Heading } from 'theme-ui'
import { ProductContext } from './ProductContext'

export const DescriptionHtml = styled.div`
  padding: 0 8px;
  color: var(--theme-ui-colors-black);
  font-size: 12px;
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

  img {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
`

// const stripHtml = (str = '') => str.replace(/(<([^>]+)>)/gi, '')

export const ProductDescription = props => {
  // const [open, setOpen] = useState(false)
  const {
    product: { descriptionHtml },
  } = useContext(ProductContext)

  // const previewText = stripHtml(descriptionHtml)

  return (
    <Box>
      <Heading as="h2" variant="caps" pb={4} px={2}>
        The Story
      </Heading>
      <DescriptionHtml dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      {/* {open ? (
        <DescriptionHtml
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
      ) : (
        <>
          <Text as="p" variant="copy" sx={{ textAlign: 'center' }}>
            {truncate(previewText, { length: 220 })}
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
        </>
      )} */}
    </Box>
  )
}
