import { useSpring } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

export default function useSliderDimensions(ref) {
  const [sliderWidth, setSliderWidth] = useState(0)
  const [sliderChildrenWidth, setSliderChildrenWidth] = useState(0)
  const [sliderLeftConstraint, setSliderLeftConstraint] = useState(0)

  useEffect(() => {
    const calcSliderChildrenWidth = () => {
      setSliderChildrenWidth(
        Array.from(ref.current.childNodes).reduce(
          (acc, node) => acc + node.clientWidth,
          0
        )
      )
    }

    calcSliderChildrenWidth()

    const calcSliderWidth = () => {
      setSliderWidth(ref.current.clientWidth)
    }

    calcSliderWidth()
    window.addEventListener('resize', calcSliderWidth)

    const calcSliderConstraints = () => {
      setSliderLeftConstraint(sliderChildrenWidth - sliderWidth)
    }

    calcSliderConstraints()
    window.addEventListener('resize', calcSliderConstraints)

    return () => {
      window.removeEventListener('resize', calcSliderConstraints)
      window.removeEventListener('resize', calcSliderWidth)
    }
  }, [ref, sliderChildrenWidth, sliderWidth])

  return { left: -sliderLeftConstraint, sliderWidth }
}

// const useSliderPageNavigation = ref => {}
//
export const useSlider = (ref, x, controls) => {
  const { left, sliderWidth } = useSliderDimensions(ref)
  // const [hasNextPage, setHasNextPage] = useState(true)
  // const [hasPrevPage, setHasPrevPage] = useState(false)

  //   const prevPositionSpring = useSpring(
  //   const nextPositionSpring = useSpring(

  return useMemo(
    () => ({
      left,
      sliderWidth,
      goToNextPage: () => {
        // const nextXPosition = Math.max(left, x.get() - sliderWidth)
        // x.set(nextXPosition)
        controls.start({ x: Math.max(left, x.get() - sliderWidth) })
      },
      goToPrevPage: () => {
        // const nextXPosition = Math.min(0, x.get() + sliderWidth)
        // x.set(nextXPosition)
        controls.start({ x: Math.min(0, x.get() + sliderWidth) })
      },
    }),
    [left, sliderWidth, x]
  )
}
