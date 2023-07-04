import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function TransactionsPage() {
  const { type } = useParams();

  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  function newTransaction(e) {
    e.preventDefault();
    const body = {
      value: Number(value),
      description,
      deposit: type === "entrada",
    };
    axios
      .post(`http://localhost:5000/nova-transacao/${type}`, body)
      .then((resp) => {
        console.log(resp);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  }
  return (
    <TransactionsContainer>
      <h1>Nova {type}</h1>
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
        <button>Salvar {type}</button>
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
