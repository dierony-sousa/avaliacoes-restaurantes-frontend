import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";

const formStyle = {
  padding: "16px",
  maxWidth: "400px",
  margin: "auto"
};

const buttonStyle = {
  marginRight: "8px"
};

const avaliacaoStyle = {
  marginTop: "20px"
};

function AvaliacoesForm({ handleAddAvaliacao, setShowForm }) {
  const [newAvaliacao, setNewAvaliacao] = useState({
    nome: "",
    comentario: "",
    avaliacao: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAvaliacao({ ...newAvaliacao, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddAvaliacao(newAvaliacao);
    setNewAvaliacao({ nome: "", comentario: "", avaliacao: 0 });
  };

  return (
    <Paper elevation={3} style={formStyle}>
      <Typography variant="h6">
        Adicionar Avaliação
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nome do restaurante"
            name="nome"
            value={newAvaliacao.nome}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Comentário"
            name="comentario"
            value={newAvaliacao.comentario}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Avaliação"
            name="avaliacao"
            value={newAvaliacao.avaliacao}
            onChange={handleInputChange}
            type="number"
            inputProps={{
              min: 1, // Valor mínimo permitido
              max: 5, // Valor máximo permitido
              step: 1
            }}
            style={avaliacaoStyle}
          />
        </Grid>

        <div style={{ marginTop: "16px" }}>
          <Button
            variant="contained"
            color="warning"
            type="submit"
            style={buttonStyle}
          >
            Adicionar
          </Button>
          <Button color="error" onClick={() => setShowForm(false)} style={buttonStyle}>
            Cancelar
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default AvaliacoesForm;
