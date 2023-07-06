import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export default function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const URL = import.meta.env.VITE_API_URL;
  const [token, setToken] = useContext(AuthContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  let config;

  useEffect(() => {
    if (!token) {
      const localUserToken = JSON.parse(localStorage.getItem("token"));
      if (localUserToken) {
        setToken(localUserToken);
        config = {
          headers: {
            Authorization: `Bearer ${localUserToken}`,
          },
        };
      } else {
        navigate("/");
      }
    } else {
      config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
    //if (token) {
    axios
      .get(`${URL}/logged-user`, config)
      .then((resp) => {
        console.log(resp.data);
        setName(resp.data.name);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data);
      });
    axios
      .get(`${URL}/transactions`, config)
      .then((resp) => {
        console.log(resp.data);
        setTransactions(resp.data.reverse());

        const deposits = resp.data.filter(
          (transaction) => transaction.deposit === true
        );
        const drafts = resp.data.filter(
          (transaction) => transaction.deposit === false
        );

        const totalDeposits = deposits.reduce(
          (total, deposit) => total + deposit.value,
          0
        );
        const totalDrafts = drafts.reduce(
          (total, draft) => total + draft.value,
          0
        );

        console.log("Total de depósitos:", totalDeposits);
        console.log("Total de saques:", totalDrafts);

        setBalance(totalDeposits - totalDrafts);
      })
      .catch((err) => {
        console.log(err);
      });
    //}
  }, []);

  function signout() {
    console.log("deslogando");
    localStorage.clear();
    navigate("/");
  }
  function entrada() {
    navigate(`/nova-transacao/entrada`);
  }
  function saida() {
    navigate(`/nova-transacao/saida`);
  }

  return (
    token && (
      <HomeContainer>
        <Header>
          <h1>Olá, {name}</h1>
          <BiExit onClick={signout} />
        </Header>

        <TransactionsContainer>
          <ul>
            {transactions.map((transaction) => (
              <ListItemContainer key={transaction._id}>
                <div>
                  <span>{transaction.date}</span>
                  <strong>{transaction.description}</strong>
                </div>
                <Value color={transaction.deposit ? "positivo" : "negativo"}>
                  {transaction.value.toFixed(2).replace(".", ",")}
                </Value>
              </ListItemContainer>
            ))}
          </ul>

          <article>
            <strong>Saldo</strong>
            <Value color={balance > 0 ? "positivo" : "negativo"}>
              {balance.toFixed(2).replace(".", ",")}
            </Value>
          </article>
        </TransactionsContainer>

        <ButtonsContainer>
          <button onClick={entrada}>
            <AiOutlinePlusCircle />
            <p>
              Nova <br /> entrada
            </p>
          </button>
          <button onClick={saida}>
            <AiOutlineMinusCircle />
            <p>
              Nova <br />
              saída
            </p>
          </button>
        </ButtonsContainer>
      </HomeContainer>
    )
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 400px;
  height: calc(100vh - 50px);
  @media screen and (max-width: 1024px) {
    margin: 0 200px;
  }
  @media screen and (max-width: 600px) {
    margin: 0;
  }
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  ul {
    overflow: scroll;
  }

  article {
    padding-top: 10px;
    display: flex;

    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;
