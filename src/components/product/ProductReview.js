import React, { useState } from 'react'
import { Box, Flex, Image } from 'theme-ui'
import Modal from '../Modal'
import YotpoPost from './YotpoPost'

const ProductReview = ({
  user,
  score,
  title,
  content,
  createdAt,
  imagesData,
  comment,
}) => {
  const starPercentage = (score / 5) * 100
  const [modalImage, setModalImage] = useState(false)
  return (
    <Box>
      <YotpoPost
        avatar={user.socialImage}
        displayName={user.displayName}
        badge="verified buyer"
        date={createdAt}
        starPercentage={starPercentage}
        title={title}
        content={content}
      >
        {imagesData?.length && (
          <Flex pt={4} sx={{ flexWrap: 'wrap' }}>
            {imagesData.map(image => (
              <Image
                mr={3}
                sx={{ height: 100, width: 100, cursor: 'pointer' }}
                src={image.thumbUrl}
                key={image.thumbUrl}
                onClick={() => {
                  setModalImage(image.originalUrl)
                }}
              />
            ))}
          </Flex>
        )}
      </YotpoPost>
      {!!comment && (
        <Box pl={5} pt={5}>
          <Box sx={{ borderLeft: '2px solid', borderColor: 'border' }} pl={5}>
            <YotpoPost
              displayName="Store Owner"
              date={comment.createdAt}
              content={comment.content}
            />
          </Box>
        </Box>
      )}
      {modalImage && (
        <Modal isOpen setOpen={setModalImage} minHeight={false}>
          <Flex sx={{ maxHeight: '75vh' }}>
            <Image src={modalImage} sx={{ objectFit: 'cover' }} />
          </Flex>
        </Modal>
      )}
    </Box>
  )
}

export default ProductReview
