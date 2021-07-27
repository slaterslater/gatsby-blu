import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const NewsletterSignUpPrompt = props => {
  const [isOn, setOn] = useState(false)

  return  <AnimatePresence>
    {isOn && <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%'}}
      style={{ zIndex: 10, position: 'fixed', left: 0, right: 0, bottom: 0 }}
      }>
      newsletter
    </motion.div>
    }
    </AnimatePresence>
}

export default NewsletterSignUpPrompt
