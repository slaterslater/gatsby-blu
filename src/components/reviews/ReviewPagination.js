import { Box, IconButton, Flex } from 'theme-ui'
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
    }}
    {...props}
  />
)

const ReviewPagination = ({
  currentPage = 1,
  totalPages = 1,
  boundaryPages,
  onPageClick = () => {},
}) => {
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

  return (
    <Flex sx={{ justifyContent: 'center', gap: 2 }}>
      {hasDotsBefore && (
        <PageButton onClick={() => onPageClick(1)}>...</PageButton>
      )}
      {pagesBefore.map(n => (
        <PageButton onClick={() => onPageClick(n)}>{n}</PageButton>
      ))}
      <PageButton isCurrent disabled>
        {currentPage}
      </PageButton>
      {pagesAfter.map(n => (
        <PageButton onClick={() => onPageClick(n)}>{n}</PageButton>
      ))}
      {hasDotsAfter && (
        <PageButton onClick={() => onPageClick(totalPages)}>...</PageButton>
      )}
    </Flex>
  )
}

export default ReviewPagination
