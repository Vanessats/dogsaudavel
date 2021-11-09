import React, { useState, useEffect } from "react";

import Patinha from "../assets/patinha.png";

import "./History.css";

const History = ({ backAction }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("history")));
  }, []);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const handleRemove = (index) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
  };

  return (
    <section id="id-body">
      <div className="container">
        <div className="card-native mt-5">
          <div className="text-center mt-5">
            <img src={Patinha} alt="patinha" className="patinha-img" />
          </div>
          <div className="text-center mb-5 mt-3">
            <strong>Hístorico de Pesagem do seu companheiro animal!</strong>
          </div>
          <div>
            <div className="row text-center">
              <div className="col-3">
                <strong>Peso</strong>
              </div>
              <div className="col-3">
                <strong>Raça</strong>
              </div>
              <div className="col-3">
                <strong>Situação</strong>
              </div>
              <div className="col-3">
                <strong>Remover</strong>
              </div>
            </div>
            <hr />
            <div className="content-infos">
              {history?.map((dog, index) => (
                <div className="row text-center">
                  <div className="col-3">
                    <span>{dog.peso} Kg</span>
                  </div>
                  <div className="col-3">
                    <span>{dog.race}</span>
                  </div>
                  <div className="col-3">
                    <span>{dog.situacao}</span>
                  </div>
                  <div className="col-3">
                    <span
                      className="text-danger outlined"
                      onClick={() => handleRemove(index)}
                    >
                      Remover
                    </span>
                  </div>
                  <hr className="mt-4" />
                </div>
              ))}
            </div>
            <button
              className="btn btn-primary w-100 "
              onClick={() => backAction()}
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
