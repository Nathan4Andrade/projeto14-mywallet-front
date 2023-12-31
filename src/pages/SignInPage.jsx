import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import MyWalletLogo from "../components/MyWalletLogo";
import logo from "../assets/logo.png";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

export default function SignInPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useContext(AuthContext);

  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const localToken = JSON.parse(localStorage.getItem("token"));
    if (localToken) {
      navigate("/home");
    }
  }, []);

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
        localStorage.setItem("token", JSON.stringify(resp.data));
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
      <img src={logo} alt="logo" />
      <form onSubmit={signin}>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          data-test="email"
          required
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          data-test="password"
          required
        />
        <button disabled={loading} data-test="sign-in-submit">
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
  img {
    width: 100px;
    margin-bottom: 20px;
  }
  form {
    max-width: 327px;
  }
  button {
    div {
      justify-content: center;
    }
  }
`;
