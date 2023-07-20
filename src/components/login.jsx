import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ADMIN_AUTH_TOKEN_KEY } from "../constants/authentication";
import AxiosClient from "../utils/axios";

function Login() {
  const [validated, setValidated] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Gan Ring Poc - Login";
    const token = localStorage.getItem(ADMIN_AUTH_TOKEN_KEY);
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      try {
        const response = await AxiosClient.post("/login", payload);
        const { message, token } = response.data;
        if (response.status === 201) {
          localStorage.setItem(ADMIN_AUTH_TOKEN_KEY, token);
          setShow(false);
          navigate("/");
        }
        if (response.status === 200) {
          setShow(true);
          setMessageError(message);
        }
      } catch (error) {
        console.error("Submit error", error);
      }
    }

    setValidated(true);
  };

  return (
    <Container className="vh-100 d-flex flex-column justify-content-between">
      <Row className="h-100 justify-content-center align-items-center">
        <Col lg={6}>
          <div className="form-container">
            {show ? (
              <Alert
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
              >
                {messageError}
              </Alert>
            ) : (
              <></>
            )}
            <Form
              id="login-form"
              className="needs-validation"
              noValidate
              onSubmit={handleSubmit}
              validated={validated}
            >
              <Form.Group className="mb-3 text-base">
                <Form.Label htmlFor="company_code">企業コード</Form.Label>
                <Form.Control
                  type="text"
                  className="custom-input"
                  id="company_code"
                  name="company_code"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  企業コード 入力してください
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 text-base">
                <Form.Label htmlFor="user_name">ユーザーID</Form.Label>
                <Form.Control
                  type="text"
                  className="custom-input"
                  id="user_name"
                  name="user_name"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  ユーザーID 入力してください
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 text-base">
                <Form.Label htmlFor="password">パスワード</Form.Label>
                <Form.Control
                  type="password"
                  className="custom-input"
                  id="password"
                  name="password"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  パスワード 入力してください
                </Form.Control.Feedback>
              </Form.Group>
              <div className="mb-5 text-end text-base">
                <a href="#" className="custom-link">
                  パスワードを忘れた方はこちら
                </a>
              </div>
              <div className="text-center">
                <Button type="submit" className="btn gradient-button w-100">
                  ログイン
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col lg={6}>
          <div className="form-container d-flex flex-md-row justify-content-center justify-content-sm-end gap-5 align-items-center text-base">
            <a href="#" className="custom-link">
              利用規約
            </a>
            <a href="#" className="custom-link">
              プライバシーポリシー
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
