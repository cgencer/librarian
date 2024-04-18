* for styled components:

const StyledButton = styled('button')<Partial<{isRed: boolean}>>`

${ ({isRed}) => isRed && 'color: red;' }