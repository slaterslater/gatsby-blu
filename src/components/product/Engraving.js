import { Box, Input, Select, Text } from 'theme-ui'
import React, { useEffect } from 'react'
import useForm from '../../hooks/useForm'
import FormControlWrap from '../app/formik/FormControlWrap'
import RevealBox from '../RevealBox'

export const useEngraveableChars = (tags = []) => {
  if (tags.includes('5 letter engraving')) {
    return 5
  }
  if (tags.includes('legacy ring Engravable')) return 12
  if (tags.includes('engraveable')) return 1
  return 0
}

const Engraving = ({ tags, onChange }) => {
  const chars = useEngraveableChars(tags)
  const {
    values: { text, font },
    updateValue,
  } = useForm({ font: null, text: null })

  useEffect(() => {
    if (text && font) {
      onChange({ key: `engraving`, value: `"${text}", ${font}` })
    }
  }, [text, font])

  if (!chars) return false
  return (
    <RevealBox title="Add Engraving">
      <Box py={2} px={3} mb={4} sx={{ bg: 'lightGray', borderRadius: 3 }}>
        <Text sx={{ fontSize: 0, color: 'darkerGray' }}>
          Up to {chars} characters
        </Text>
      </Box>
      <FormControlWrap showError={false} label="Text" id="engraving_text">
        <Input
          id="engraving_text"
          name="text"
          value={text}
          onChange={updateValue}
          maxLength={chars}
        />
        <Text sx={{ fontSize: 0, color: 'darkGray' }}>
          characters are engraved exactly as shown
        </Text>
      </FormControlWrap>
      <FormControlWrap showError={false} label="Font" id="engraving_font">
        <Select
          id="engraving_text"
          name="font"
          onChange={updateValue}
          value={font}
        >
          <option value="choose a font style" disabled selected>
            choose a font style
          </option>
          <option value="Trajan Pro">Trajan Pro</option>
          <option value="Petite formal script">Petite formal script</option>
        </Select>
      </FormControlWrap>
    </RevealBox>
  )
}

export default Engraving
