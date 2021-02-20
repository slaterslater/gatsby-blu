import { useEffect, useState } from 'react'

export default function useSliderConstraint(ref) {
  const [sliderWidth, setSliderWidth] = useState(0)
  const [sliderChildrenWidth, setSliderChildrenWidth] = useState(0)
  const [sliderConstraints, setSliderConstraints] = useState(0)

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
      setSliderConstraints(sliderChildrenWidth - sliderWidth)
    }

    calcSliderConstraints()
    window.addEventListener('resize', calcSliderConstraints)
  }, [ref, sliderChildrenWidth, sliderWidth])

  return sliderConstraints
}

const useSliderPageNavigation = ref => {}
