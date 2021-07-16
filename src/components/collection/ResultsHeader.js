import React, { useMemo, useState } from 'react'
import { Button, Link, Box, Flex, Heading, Text } from 'theme-ui'
import pluralize from 'pluralize'

const RevealText = ({ children, chars, ...props }) => {
  const [expanded, setExpanded] = useState(false)

  const truncatedText = useMemo(() => {
    const lastSpaceIndex = children.slice(0, chars).lastIndexOf(' ')
    return children.slice(0, lastSpaceIndex)
  }, [children, chars])

  if (children.length < chars) return <Text>{children}</Text>

  if (expanded) return <Text>{children}</Text>

  return (
    <Text {...props}>
      {truncatedText}
      <Link
        pl={1}
        role="button"
        aria-pressed={false}
        onClick={() => setExpanded(true)}
        sx={{ cursor: 'pointer' }}
      >
        ...read more
      </Link>
    </Text>
  )
}

const ResultsHeader = ({ title, description, count, resultType, children }) => (
  <Flex sx={{ flexDirection: 'column ' }}>
    <Box pb={2} ml="auto">
      <Text variant="caps">{pluralize(resultType, count, true)}</Text>
    </Box>
    <Flex sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
      <Box sx={{ flex: 1 }} pr={4}>
        <Heading as="h1">{title}</Heading>
        {description && <RevealText chars={200}>{description}</RevealText>}
      </Box>
      <Box>{children}</Box>
    </Flex>
  </Flex>
)

export default ResultsHeader
