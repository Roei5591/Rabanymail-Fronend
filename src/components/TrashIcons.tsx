import { IconButton, Tooltip } from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';

type fontSize = "default" | "small" | "inherit" | "large" | undefined;

const TrashIcons = ({isTrash ,fontSize , onClickTrash , onClickDelete}: {
  isTrash: boolean,
  fontSize?: fontSize,
  onClickTrash: () => void,
  onClickDelete: () => void,
})  => {
  
  return  isTrash 
  ? 
  <>
    <Tooltip title="Restore" aria-label="Restore">
    <IconButton onClick = {onClickTrash}>
      <RestoreFromTrashIcon fontSize={fontSize}/>
    </IconButton>
  </Tooltip>

  <Tooltip title="Delete" aria-label="Delete">
    <IconButton onClick = {onClickDelete} >
      <DeleteForeverIcon fontSize={fontSize} />
    </IconButton>
  </Tooltip>
  </>
  :
  
  <Tooltip title="move to trash" aria-label="move to trash">
    <IconButton onClick = {onClickTrash}>
      <DeleteIcon fontSize={fontSize} />
   </IconButton>
  </Tooltip>
  

}

export default TrashIcons;