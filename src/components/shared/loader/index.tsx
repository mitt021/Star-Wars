import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { PRIMARY_BLUE, WHITE } from 'constant/color'

const Loader = () => {
  return (
    <Backdrop
      sx={{ color: WHITE, zIndex: (theme) => theme.zIndex.drawer + 1, background: 'rgba(0, 0, 0, 0.10)' }}
      open={true}
    >
      <CircularProgress sx={{ color: PRIMARY_BLUE }} />
    </Backdrop>
  )
}

export default Loader
