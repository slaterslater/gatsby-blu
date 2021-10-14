import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Flex, Button } from 'theme-ui'

const PaginationButton = ({ disabled, ...props }) => (
  <Button
    as={Link}
    disabled={disabled}
    type="button"
    variant="inverted"
    sx={{ opacity: disabled ? 0.5 : 1 }}
    {...props}
  />
)

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  getLinkForPage = () => {},
  ...props
}) => {
  const prevLink = currentPage > 1 ? getLinkForPage(currentPage - 1) : null
  const nextLink =
    currentPage < totalPages ? getLinkForPage(currentPage + 1) : null
  const firstLink = getLinkForPage(1)
  const lastLink = getLinkForPage(totalPages)

  return (
    <Flex sx={{ justifyContent: 'center' }} {...props}>
      <PaginationButton to={prevLink} disabled={!prevLink}>
        prev
      </PaginationButton>
      {currentPage !== 1 && (
        <PaginationButton to={firstLink}>1</PaginationButton>
      )}
      {currentPage > 2 && <Button variant="inverted">...</Button>}
      <Button
        variant="inverted"
        sx={{
          borderColor: 'white',
          borderBottomColor: 'primary',
          borderBottom: '1px solid',
          bg: 'white',
        }}
      >
        {currentPage}
      </Button>
      {currentPage < totalPages - 1 && <Button variant="inverted">...</Button>}
      {currentPage !== totalPages && (
        <PaginationButton to={lastLink}>{totalPages}</PaginationButton>
      )}
      <PaginationButton to={nextLink} disabled={!nextLink}>
        next
      </PaginationButton>
    </Flex>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  getLinkForPage: PropTypes.func,
}

export default Pagination
