import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
/* import dotenv from "dotenv"; */
import { useEffect, useState } from "react";
import axios from "axios";
/* 
dotenv.config();
 */
export default function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    /* const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }; */
    axios
      .get(`http://localhost:5000/transactions`)
      .then((resp) => {
        console.log(resp.data);
        setTransactions(resp.data);

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
  }, []);

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, Fulano</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map((transaction) => (
            <ListItemContainer key={transaction.id}>
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
        <button>
          <Link to={`/nova-transacao/entrada`}>
            <AiOutlinePlusCircle />
            <p>
              Nova <br /> entrada
            </p>
          </Link>
        </button>
        <button>
          <Link to={`/nova-transacao/saida`}>
            <AiOutlineMinusCircle />
            <p>
              Nova <br />
              saída
            </p>
          </Link>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
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
  article {
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
