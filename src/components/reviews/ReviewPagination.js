import { Box, IconButton, Flex } from 'theme-ui'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const PageButton = ({ isCurrent, ...props }) => (
  <IconButton
    type="button"
    sx={{
      cursor: 'pointer',
      fontFamily: 'body',
      borderRadius: '50%',
      border: '1px solid',
      borderColor: isCurrent ? 'black' : 'transparent',
      textDecoration: 'none',
    }}
    {...props}
  />
)

const ReviewPagination = ({
  currentPage = 1,
  totalPages = 1,
  boundaryPages,
  onPageClick = null,
  getLinkForPage = null,
}) => {
  const handleClick = n => (onPageClick ? onPageClick(n) : false)
  const pagesBefore = Array(boundaryPages)
    .fill()
    .map((_, i) => currentPage - (i + 1))
    .filter(pageNumber => pageNumber > 0)
    .reverse()
  const pagesAfter = Array(boundaryPages)
    .fill()
    .map((_, i) => currentPage + (i + 1))
    .filter(pageNumber => pageNumber <= totalPages)
  const hasDotsBefore = currentPage - boundaryPages > 1
  const hasDotsAfter = currentPage + boundaryPages < totalPages

  const getLinkProps = n => {
    if (!getLinkForPage) return {}
    return {
      as: Link,
      to: getLinkForPage(n),
    }
  }

  return (
    <Flex sx={{ justifyContent: 'center', gap: 2 }}>
      {hasDotsBefore && (
        <PageButton onClick={() => handleClick(1)} {...getLinkProps(1)}>
          ...
        </PageButton>
      )}
      {pagesBefore.map(n => (
        <PageButton onClick={() => handleClick(n)} {...getLinkProps(n)}>
          {n}
        </PageButton>
      ))}
      <PageButton isCurrent disabled>
        {currentPage}
      </PageButton>
      {pagesAfter.map(n => (
        <PageButton onClick={() => handleClick(n)} {...getLinkProps(n)}>
          {n}
        </PageButton>
      ))}
      {hasDotsAfter && (
        <PageButton
          onClick={() => handleClick(totalPages)}
          {...getLinkProps(totalPages)}
        >
          ...
        </PageButton>
      )}
    </Flex>
  )
}

ReviewPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  boundaryPages: PropTypes.number.isRequired,
  onPageClick: PropTypes.func,
  getLinkForPage: PropTypes.func,
}

export default ReviewPagination
