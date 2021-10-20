import React from 'react'
import styled from '@emotion/styled'

export const ShopifyHtml = styled.div`
  font-size: 12px;
  line-height: 1.5;

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
  p {
    line-height: 1.5;
    margin-bottom: 1.6em;
  }

  img {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
`
