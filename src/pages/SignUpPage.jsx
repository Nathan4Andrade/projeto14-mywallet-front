import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function signup(e) {
    e.preventDefault();
    setLoading(!loading);
    const loginInfo = {
      name,
      email,
      password,
    };
    navigate("/");
    /*  axios
      .post(`${BASE_URL}auth/login`, loginInfo)
      .then((resp) => {
        setToken(resp.data.token);
        setUser(resp.data);
        persistUser(resp.data);
        navigate("/home");
      })
      .catch(() => {
        alert("Usuário não encontrado");
        setLoading(false);
      }); */
  }
  return (
    <SingUpContainer>
      <form onSubmit={signup}>
        <MyWalletLogo />
        <input
          placeholder="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          required
        />
        <input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (e.target.value !== confirmPassword) {
              console.log("senhas diferentes");
              setDisable(true);
            }
          }}
          disabled={loading}
          required
        />
        <input
          placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (e.target.value !== password) {
              console.log("senhas diferentes");
              setDisable(true);
            } else {
              setDisable(false);
            }
          }}
          disabled={loading}
          required
        />
        {disable ? <p>Senhas incompatíveis</p> : ""}
        <button disabled={loading || disable}>
          {loading ? (
            <ThreeDots
              height="25"
              width="30"
              radius="9"
              color="#ffffff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            <span>Cadastrar</span>
          )}
        </button>
      </form>

      <Link to={`/`}>Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    > p {
      color: #ff7676;
    }
  }
  button {
    :disabled {
      background-color: grey;
    }
  }
`;
