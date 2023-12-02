import React, { useState, useEffect } from "react";
import axios from "axios";
import AvaliacoesForm from "./components/AvaliacoesForm";
import AvaliacoesTable from "./components/AvaliacoesTable";
import {
  CssBaseline,
  Container,
  Typography,
  AppBar,
  Toolbar
} from "@mui/material";
import API_URL from "./config";

const appBarStyle = {
  marginBottom: "20px"
};

const pageTitleStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "20px"
};

function App() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAvaliacoes();
  }, []);

  const fetchAvaliacoes = async () => {
    try {
      const response = await axios.get(`${API_URL}/avaliacoes-restaurantes`);
      setAvaliacoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar as avaliações!", error);
    }
  };

  const handleAddAvaliacao = async (newAvaliacao) => {
    try {
      await axios.post(`${API_URL}/avaliacoes-restaurantes`, newAvaliacao);
      fetchAvaliacoes();
      setShowForm(false);
    } catch (error) {
      console.error("Erro ao adiciona avaliação!", error);
    }
  };

  const handleDeleteAvaliacao = async (avaliacaoId) => {
    try {
      console.log(avaliacaoId);
      await axios.delete(`${API_URL}/avaliacoes-restaurantes/${avaliacaoId}`);
      fetchAvaliacoes();
    } catch (error) {
      console.error("Erro ao excluir avaliação!", error);
    }
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="static" style={appBarStyle} variant="elevation" color="warning">
        <Toolbar>
          <Typography variant="h4"> Avaliações de Restaurantes </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
       
        {showForm ? (
          <AvaliacoesForm
            handleAddAvaliacao={handleAddAvaliacao}
            setShowForm={setShowForm}
          />
        ) : (
          <AvaliacoesTable
            avaliacoes={avaliacoes}
            handleDeleteAvaliacao={handleDeleteAvaliacao}
            setShowForm={setShowForm}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
