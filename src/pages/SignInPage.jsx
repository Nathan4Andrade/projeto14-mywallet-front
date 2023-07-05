import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import MyWalletLogo from "../components/MyWalletLogo";
import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export default function SignInPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useContext(AuthContext);

  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;

  function signin(e) {
    e.preventDefault();
    setLoading(!loading);
    const signInInfo = {
      email,
      password,
    };
    axios
      .post(`${URL}/sign-in`, signInInfo)
      .then((resp) => {
        console.log(resp);
        setToken(resp.data);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data);
        setLoading(false);
      });
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
