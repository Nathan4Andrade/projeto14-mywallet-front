import { useContext, useEffect, useState } from "react";
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

  let config;

  const { tipo } = useParams();
  console.log(tipo);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  function newTransaction(e) {
    e.preventDefault();
    if (!token) {
      const localUserToken = JSON.parse(localStorage.getItem("token"));
      if (localUserToken) {
        setToken(localUserToken);
        config = {
          headers: {
            Authorization: `Bearer ${localUserToken}`,
          },
        };
      }
    } else {
      config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
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
      .catch((err) => {
        console.log(err);
        alert(err.response.data);
      });
  }
  return (
    token && (
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
    )
  );
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0 400px;
  @media screen and (max-width: 1024px) {
    margin: 0;
  }
  form {
    max-width: 327px;
  }

  h1 {
    align-self: center;
    @media screen and (max-width: 600px) {
      align-self: flex-start;
    }
    margin-bottom: 40px;
  }
`;
