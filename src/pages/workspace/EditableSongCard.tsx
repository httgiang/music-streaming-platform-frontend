import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { SongProps } from "@/types/song";
import { CSS } from "@dnd-kit/utilities";
import { useNavigate } from "react-router-dom";

const EditableSongCard: React.FC<{
  song: SongProps;
  handleDelete: (songId: string) => void;
}> = ({ song, handleDelete }) => {
  const id = song.id;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const navigate = useNavigate();
  return (
    <>
      <div ref={setNodeRef} style={style}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderRadius={2}
          mr={1}
          p={1}
          sx={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(6px)",
            transition: "background-color 0.3s ease",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton {...listeners} {...attributes} sx={{ p: 0 }}>
              <DragIndicatorIcon sx={{ color: "white" }} />
            </IconButton>
            <img
              src={song.coverImageUrl}
              alt={song.name}
              style={{ width: 50, height: 50, borderRadius: 5 }}
            />
            <Box textAlign="left">
              <Typography fontSize={16} fontWeight="bold" color="white">
                {song.name}
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} gap={1}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/song/${song.id}`, { state: { song } });
              }}
            >
              <RemoveRedEyeIcon sx={{ color: "white" }} />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setOpenConfirmDelete(true);
              }}
            >
              <DeleteIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
        </Box>
      </div>
      <Dialog
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
        sx={{
          zIndex: 9999,
        }}
      >
        <DialogTitle>Delete Song</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this song?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDelete(false)}>Cancel</Button>
          <Button onClick={() => handleDelete(song.id)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditableSongCard;
