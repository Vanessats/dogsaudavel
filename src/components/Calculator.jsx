import React, { useState } from "react";

import Patinha from "../assets/patinha.png";

import "./Calculator.css";

import { macho, femea, racas } from "./Calculator.types";

const Calculator = ({ confirmAction }) => {
  const [peso, setPeso] = useState();
  const [race, setRace] = useState();
  const [sexo, setSexo] = useState();

  const handleConfirm = () => {
    let actualHistory = JSON.parse(localStorage.getItem("history"));

    const animalInfo = {
      peso: peso,
      race: race,
      sexo: sexo,
      situacao: fetchSituation(peso, race, sexo),
    };

    if (!actualHistory) {
      actualHistory = [];
    }

    actualHistory.unshift(animalInfo);

    localStorage.setItem("history", JSON.stringify(actualHistory));

    confirmAction();
  };

  const fetchSituation = (peso, race, sexo) => {
    let bichano;

    if (sexo === "Macho") {
      bichano = macho.find((dog) => dog.nome === race);
    } else {
      bichano = femea.find((dog) => dog.nome === race);
    }

    if (peso > bichano.pesoMax) {
      return "Obeso";
    } else if (peso < bichano.pesoMin) {
      return "Abaixo do Peso";
    }
    return "Saudável";
  };

  return (
    <section id="id-body">
      <div className="container">
        <div className="card-native mt-5">
          <div className="text-center mt-5">
            <img src={Patinha} alt="patinha" className="patinha-img" />
          </div>
          <div className="mb-4 mt-4 text-center">
            <span>
              <b>Descubra se seu amigo de patinhas está no peso certo!</b>
            </span>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Peso</label>
            <div class="input-group mb-3">
              <input
                type="number"
                className="form-control"
                id="peso"
                aria-describedby="peso"
                placeholder="0.00"
                onChange={(evt) => setPeso(evt.target.value)}
                value={peso}
              />
              <div class="input-group-append">
                <span class="input-group-text">Kg</span>
              </div>
            </div>

            <label for="exampleInputEmail1 ">Raça</label>
            <select
              className="form-select mb-3"
              aria-label="Raça"
              onChange={(evt) => setRace(evt.target.value)}
              value={race}
            >
              <option selected disabled>
                Raça
              </option>
              {racas.map((raca) => (
                <option value={raca}>{raca}</option>
              ))}
            </select>
            <label for="exampleInputEmail1 ">Sexo</label>
            <select
              className="form-select mb-3"
              aria-label="Sexo"
              onChange={(evt) => setSexo(evt.target.value)}
              value={sexo}
            >
              <option selected disabled>
                Sexo
              </option>
              <option value="Macho">Macho</option>
              <option value="Femea">Femea</option>
            </select>
            <div className="container-right mt-4 mb-2">
              <button
                type="button"
                class="btn btn-primary w-100"
                onClick={() => handleConfirm()}
                disabled={!(peso && race && sexo)}
              >
                Confirmar
              </button>
            </div>
            <button
              type="button"
              class="btn btn-outline-primary w-100 mb-2"
              onClick={() => confirmAction()}
            >
              Histórico
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
