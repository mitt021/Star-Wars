import * as React from 'react'
import { Dialog, DialogContent, DialogProps } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import styles from 'components/shared/modal/Modal.module.scss'

const Modal: React.FC<DialogProps> = ({
  open = false,
  onClose,
  children,
  className,
  classes,
  title,
  ...props
}): React.ReactElement => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="draggable-dialog-title"
      maxWidth="xs"
      fullWidth={true}
      classes={{ ...classes, root: `${className} ${styles.root}` }}
      {...props}
    >
      <div className={styles.modalHeader}>
        <h3>{title}</h3>
        <div
          onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => onClose && onClose(event, 'backdropClick')}
        >
          <CloseIcon className={styles.closeIcon} />
        </div>
      </div>
      <DialogContent classes={{ root: styles.dialogContent }}>{children}</DialogContent>
    </Dialog>
  )
}

export default Modal
