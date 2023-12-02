import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import RestaurantIcon from '@mui/icons-material/Restaurant';

const tableStyle = {
  minWidth: 650,
  margin: "auto",
  marginTop: "20px",
};

const headerCellStyle = {
  backGroundColor: "#f5f5f5",
  fontWeight: "bold",
};

function AvaliacoesTable({ avaliacoes, handleDeleteAvaliacao, setShowForm }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [avaliacaoToDelete, setAvaliacaoToDelete] = useState(null);

  const handleConfirmDelete = () => {
    if (avaliacaoToDelete) {
      handleDeleteAvaliacao(avaliacaoToDelete.id);
      setAvaliacaoToDelete(null);
    }
    setOpenDialog(false);
  };

  const handleOpenDialog = (avaliacao) => {
    setAvaliacaoToDelete(avaliacao);
    setOpenDialog(true);
  };

  return (
    <div>
      <Box display="flex" justifyContent={"space-between"} alignItems="center">
        <Typography variant="h6">
          Lista de avaliações dos restaurantes
        </Typography>
        <RestaurantIcon color="warning"/>
        
        <Button
          variant="contained"
          color="warning"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setShowForm(true)}
        >
          Adicionar Avaliação
        </Button>
      </Box>
      <TableContainer component={Paper} style={tableStyle}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={headerCellStyle} align="center">
                Nome do Restaurante
              </TableCell>
              <TableCell style={headerCellStyle} align="center">
                Comentário
              </TableCell>
              <TableCell style={headerCellStyle} align="center">
                Avaliação
              </TableCell>
              <TableCell style={headerCellStyle} align="center">
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {avaliacoes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography variant="subtitle1">
                    Não há avaliações a serem exibidas.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              avaliacoes.map((avaliacao) => (
                <TableRow key={avaliacao.id}>
                  <TableCell align="center">{avaliacao.nome}</TableCell>
                  <TableCell align="center">{avaliacao.comentario}</TableCell>
                  {/* <TableCell align="center">{avaliacao.avaliacao}</TableCell> */}
                  <TableCell>
                    <Rating name="read-only" value={avaliacao.avaliacao} readOnly  align="center" />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleOpenDialog(avaliacao)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle> Confirmar Exclusão </DialogTitle>
        <DialogContent>
          Tem certeza que deseja deletar a avaliação do restaurante "
          {avaliacaoToDelete?.nome}" ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AvaliacoesTable;
