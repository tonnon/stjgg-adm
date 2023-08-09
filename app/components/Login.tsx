import { Button, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AiOutlineLogin } from "react-icons/ai";
import { styled } from "@mui/material";
import { auth } from "../firebase/clientApp";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
type LoginProps = {
  email: string;
  password: string;
};

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  let [emailValid, setEmailValid] = useState(false);
  let [passwordIsValid, setPasswordIsValid] = useState(false);
  let errorMessage;
console.log(errorMessage)
  useEffect(() => {
    let emailValid = false;
    let passwordValid = false;

    if (error) {
      switch (error.code) {
        case "auth/wrong-email":
          emailValid = true;
          errorMessage = "Email incorreto. Por favor, tente novamente.";
          break;
        case "auth/wrong-password":
          passwordValid = true;
          errorMessage = "Senha incorreta. Por favor, tente novamente.";
          break;
        case "auth/user-not-found":
          emailValid = true;
          errorMessage =
            "Usuário não encontrado. Por favor, verifique o email digitado.";
          break;
        default:
          errorMessage =
            "Ocorreu um erro. Por favor, tente novamente mais tarde.";
      }
    }

    setEmailValid(emailValid);
    setPasswordIsValid(passwordValid);
  }, [error]);

  if (user) {
    redirect("/dashboard");
  }

  return (
    <>
      <StyledContainer>
        <SetyledTextField
          color="primary"
          id="outlined-basic"
          label="usuário"
          variant="outlined"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailValid}
        />
        <SetyledTextField
          id="outlined-password-input"
          label="senha"
          type="password"
          autoComplete="current-password"
          size="small"
          color="primary"
          error={passwordIsValid}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ButtonContainer>
          <div>{errorMessage}</div>
          <StyledButton
            variant="contained"
            size="small"
            onClick={() => signInWithEmailAndPassword(email, password)}
          >
            <AiOutlineLogin size="1.5em" />
          </StyledButton>
        </ButtonContainer>
      </StyledContainer>
    </>
  );
};
export default Login;

const StyledContainer = styled(Container)`
  padding: 0 25px !important;
`;

const SetyledTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
`;

const ButtonContainer = styled(Container)`
  display: flex;
  align-items: end;
  justify-content: space-between;
  padding: 0 !important;
  
`;

const StyledButton = styled(Button)`
  border-radius: 100px;
  padding: 0;
  min-width: 10px;
  padding: 5px;
  background-color: #323232;
`;
