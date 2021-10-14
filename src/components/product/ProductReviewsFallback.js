import { useMemo, useContext } from 'react'
import { parse } from 'node-html-parser'
import camelCaseRecursive from 'camelcase-keys-recursive'
import { ProductContext } from './ProductContext'

const getSelectorText = (node, selector) => node.querySelector(selector)?.text

const parseRating = (str = '') => (str ? parseInt(str) : null)

const parseDate = (str = '') => {
  if (!str) return null
  return new Date(str).toISOString()
}

export const useProductReviewsFallback = () => {
  const {
    product: { metafields },
  } = useContext(ProductContext)
  const { value: reviewsHtml } =
    metafields.find(field => field.key === '1000') || {}

  return useMemo(() => {
    if (!reviewsHtml) return { data: { response: { reviews: [] } } }
    const parsedReviews = parse(reviewsHtml).querySelectorAll('.yotpo-review')
    const reviews = parsedReviews.map(r => {
      const data = { user: {}, comment: {} }
      data.user.display_name = getSelectorText(r, '.yotpo-user-name')
      data.title = getSelectorText(r, '.content-title')
      data.content = getSelectorText(r, '.content-review')
      data.score = parseRating(
        getSelectorText(r, '.yotpo-review-stars .sr-only')
      )
      data.created_at = parseDate(getSelectorText(r, '.yotpo-review-date'))
      data.comment.created_at = parseDate(
        getSelectorText(r, '.yotpo-comment .yotpo-review-date')
      )
      data.comment.content = getSelectorText(
        r,
        '.yotpo-comment .content-review'
      )
      return camelCaseRecursive(data)
    })
    return { data: { response: { reviews } } }
  }, [reviewsHtml])
}
