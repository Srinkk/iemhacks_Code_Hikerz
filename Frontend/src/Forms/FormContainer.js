import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

export const FormContainer = ({ children }) => {
  return (
    <div>
      <div>
        <Container width="550px" height="650px">
          <Row className="justify-content-md-center">
            <Col sm={10} md={5}>
              <div className="form">{children}</div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
