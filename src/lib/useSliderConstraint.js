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

  return { left: sliderLeftConstraint, sliderWidth, sliderChildrenWidth }
}

// const useSliderPageNavigation = ref => {}
//
export const useSlider = (ref, x) => {
  const { left, sliderWidth } = useSliderDimensions(ref)
  const [localX, setLocalX] = useState(0)

  return useMemo(() => {
    const hasNextPage = left - x.get() > -sliderWidth
    const hasPrevPage = x.get() < -sliderWidth

    const goToNextPage = () => {
      const nextPageXPosition = Math.max(left - sliderWidth, left)
      x.set(nextPageXPosition)
      setLocalX(nextPageXPosition)
    }

    const goToPrevPage = () => {
      const prevPageXPosition = Math.min(left + sliderWidth, 0)
      x.set(prevPageXPosition)
      setLocalX(prevPageXPosition)
    }

    console.log({ x: x.get(), hasNextPage, hasPrevPage })
    return {
      left: -left,
      sliderWidth,
      hasNextPage,
      hasPrevPage,
      goToNextPage,
      goToPrevPage,
      updatePageMeta: () => setLocalX(x.get()),
    }
  }, [left, localX])
}
