"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Flag from "react-country-flag";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import CloudIcon from "@mui/icons-material/Cloud";
import ClearIcon from "@mui/icons-material/WbSunny";
import RainIcon from "@mui/icons-material/Grain";
import SnowIcon from "@mui/icons-material/AcUnit";
import MistIcon from "@mui/icons-material/CloudQueue";
import FogOutlinedIcon from '@mui/icons-material/CloudOutlined';

const Home = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const [emptyFieldError, setEmptyFieldError] = useState(false);

  const handleSearch = async () => {
    try {
      if (location.trim() === "") {
        setEmptyFieldError(true);
        setWeatherData(null);
        setError(false);
        return;
      } else {
        setEmptyFieldError(false);
      }

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=pt&appid=0ae9acb4a1642e32b0c13c4336766592`;

      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Erro ao obter dados de previsão do tempo:", error);
      setError(true);
    }
  };

  const clearWeatherData = () => {
    if (location.trim() === "") {
      setWeatherData(null);
    }
  };

  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clear":
        return <ClearIcon style={{ marginRight: "5px" }} />;
      case "Clouds":
        return <CloudIcon style={{ marginRight: "5px" }} />;
      case "Drizzle":
      case "Rain":
        return <RainIcon style={{ marginRight: "5px" }} />;
      case "Snow":
        return <SnowIcon style={{ marginRight: "5px" }} />;
      case "Mist":
        return <MistIcon style={{ marginRight: "5px" }} />;
      case "Fog": 
        return <FogOutlinedIcon style={{ marginRight: "5px" }} />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #314755, #26a0da)",
      }}
    >
      <Typography
        variant="h3"
        style={{ textAlign: "center", marginBottom: "20px", color: "#fff" }}
      >
        Previsão do Tempo
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={6}
            style={{ padding: "20px", background: "#f7f7f7" }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      clearWeatherData();
                    }}
                    name="location"
                    placeholder="Digite a localização (cidade, país)"
                    style={{ background: "#fff" }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    style={{
                      background: "#26a0da",
                      color: "#fff",
                      "&:hover": { background: "#1b6ca8" },
                    }}
                  >
                    Buscar
                  </Button>
                </Grid>
              </Grid>
            </form>
            {emptyFieldError && (
              <Typography
                variant="body2"
                style={{ color: "red", marginTop: "10px" }}
              >
                Por favor, insira uma localização para fazer a pesquisa.
              </Typography>
            )}
            {weatherData && !error && location.trim() !== "" && (
              <div style={{ marginTop: "20px" }}>
                <Typography variant="h6" style={{ marginBottom: "10px" }}>
                  Informações de {weatherData.name}, {weatherData.sys.country}:
                  <Flag
                    countryCode={weatherData.sys.country}
                    style={{ marginLeft: "5px" }}
                    svg
                  />
                </Typography>
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  {getWeatherIcon(weatherData.weather[0].main)} Condição:{" "}
                  {weatherData.weather[0].description}
                </Typography>
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <WbSunnyOutlinedIcon
                    style={{ marginRight: "5px", color: "#ffab40" }}
                  />{" "}
                  Temperatura: {Math.round(weatherData.main.temp)}°C
                </Typography>
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <OpacityOutlinedIcon
                    style={{ marginRight: "5px", color: "#64b5f6" }}
                  />{" "}
                  Umidade: {weatherData.main.humidity}%
                </Typography>
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <AirOutlinedIcon
                    style={{ marginRight: "5px", color: "#4db6ac" }}
                  />{" "}
                  Pressão Atmosférica: {weatherData.main.pressure} hPa
                </Typography>
                {/* Outras informações sobre o clima podem ser exibidas aqui */}
              </div>
            )}
            {error && (
              <Typography
                variant="body2"
                style={{ color: "red", marginTop: "20px" }}
              >
                Localização não encontrada. Por favor, insira uma localização
                válida.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
