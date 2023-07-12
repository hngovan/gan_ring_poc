import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      navigate("/"); 
      try {
        const response = await fetch("api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          navigate("/home");
          console.log("Submit success");
        } else {
          console.error("Submit error");
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
            <Form
              id="login-form"
              className="needs-validation"
              noValidate
              onSubmit={handleSubmit}
              validated={validated}
            >
              <Form.Group className="mb-3 text-base">
                <Form.Label htmlFor="code">企業コード</Form.Label>
                <Form.Control
                  type="text"
                  className="custom-input"
                  id="code"
                  name="code"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  企業コード 入力してください
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 text-base">
                <Form.Label htmlFor="user-id">ユーザーID</Form.Label>
                <Form.Control
                  type="text"
                  className="custom-input"
                  id="user-id"
                  name="user-id"
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
