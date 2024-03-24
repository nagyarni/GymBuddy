import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { cyclesActions } from '../../features/cycles/cycles-slice';
import { useDeleteCycleByUserIdAndCycleIdMutation } from '../../features/cycles/cyclesApi-slice';
import { useParams } from 'react-router-dom';
import { useSnackbar } from './SnackBarContext';


export default function AlertDialog(props) {

  const dispatch = useDispatch()
  const { setSnackbarMessage } = useSnackbar()
  
  const open = props.open
  const setOpen = props.setOpen
  const cycleid = props.id

  // Extract userid from params
  const { clientid } = useParams()

  // Using Delete cycle mutation
  const [deleteCycleByUserIdAndCycleId, deleteCycleByUserIdAndCycleIdResult] = useDeleteCycleByUserIdAndCycleIdMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setOpen(false)
    //console.log("Deleting cycle!")
    //dispatch(cyclesActions.removeCycle({id: id}))
    try {
      const { data, error } = await deleteCycleByUserIdAndCycleId({ id: clientid, cycleid: cycleid })
      setSnackbarMessage({ message: "Successfully deleted cycle!", isError: false });
    } catch (error) {
      console.log(error)
      const errorMessage = error.data ? error.data.message : 'Unexpected error occured while deleting cycle!';
      setSnackbarMessage({ message: errorMessage, isError: true });
    }
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete Cycle
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action is irreversible
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}