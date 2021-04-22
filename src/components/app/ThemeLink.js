import React from 'react'
import { Link } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'

const ThemeLink = props => <Link as={GatsbyLink} {...props} />

export default ThemeLink
