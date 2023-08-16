import { Button, Text } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'

export const HeaderLink = props => (
  <Button
    type="button"
    as={props.to ? GatsbyLink : Button}
    p={0}
    {...props}
    sx={{
      bg: 'transparent',
      color: 'gray',
      textTransform: 'uppercase',
      letterSpacing: 'caps',
      fontSize: 1,
      ...(props.sx || {}),
    }}
  />
)

export const MegaMenuLink = ({
  children,
  path,
  isCurrent,
  color = 'black',
  ...props
}) => (
  <HeaderLink to={path} sx={{ position: 'relative' }} {...props}>
    <Text
      as="span"
      variant="caps"
      sx={{
        color,
        display: 'inline-flex',
        alignItems: 'center',
        height: '100%',
        fontSize: 0,
        borderBottom: '1px solid',
        borderColor: isCurrent ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0)',
        transition: 'border-color .1s',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {children}
    </Text>
  </HeaderLink>
)
