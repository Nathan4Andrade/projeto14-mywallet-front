import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import axios from "axios";

export default function SignInPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function signin(e) {
    e.preventDefault();
    setLoading(!loading);
    const loginInfo = {
      email,
      password,
    };
    navigate("/home");
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
    <SingInContainer>
      <form onSubmit={signin}>
        <MyWalletLogo />
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
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        <button disabled={loading}>
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
            <span>Entrar</span>
          )}
        </button>
      </form>

      <Link to={`/cadastro`}>Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    div {
      justify-content: center;
    }
  }
`;
