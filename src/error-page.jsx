import { Button, Container, Row, Col } from "react-bootstrap";

export default function ErrorPage() {
  return (
    <Container
      fluid
      className="vh-100 d-flex flex-column justify-content-center align-items-center"
    >
      <Row>
        <Col className="d-flex flex-column align-items-center gap-3">
          <h1 className="text-center">404</h1>
          <p className="text-center">
            Sorry, the page you visited does not exist.
          </p>
          <Button onClick={() => (window.location.href = "/")}>
            Back Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
