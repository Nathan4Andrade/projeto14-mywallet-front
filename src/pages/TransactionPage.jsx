import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export default function TransactionsPage() {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useContext(AuthContext);
  const URL = import.meta.env.VITE_API_URL;

  const { tipo } = useParams();
  console.log(tipo);

  function newTransaction(e) {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      value: Number(value),
      description,
      deposit: tipo === "entrada",
    };
    axios
      .post(`${URL}/nova-transacao/${tipo}`, body, config)
      .then((resp) => {
        console.log(resp);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  }
  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={newTransaction}>
        <input
          placeholder="Valor"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <input
          placeholder="Descrição"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
