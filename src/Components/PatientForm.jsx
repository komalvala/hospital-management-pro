import React, { useState, useEffect } from "react";
import {Container,Form,Button,Row,Col,Card,Alert,Navbar,Nav,} from "react-bootstrap";
import { FaHospitalAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const PatientForm = () => {
  const [formData, setFormData] = useState(initialFormState());
  const [patientList, setPatientList] = useState([]);
  const [error, setError] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null); // for hover style

  function initialFormState() {
    return {
      patientId: "",
      patientName: "",
      gender: "",
      dob: "",
      bloodGroup: "",
      contact1: "",
      email: "",
      emergencyContact: "",
      city: "",
      state: "",
      country: "",
    };
  }

  useEffect(() => {
    const saved = localStorage.getItem("patientList");
    if (saved) setPatientList(JSON.parse(saved));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const required = [
      "patientId",
      "patientName",
      "gender",
      "dob",
      "bloodGroup",
      "contact1",
      "email",
    ];
    for (let key of required)
      if (!formData[key]) return setError("All required fields must be filled");

    let updated;
    if (editingIndex !== null) {
      updated = [...patientList];
      updated[editingIndex] = formData;
    } else {
      updated = [...patientList, formData];
    }

    setPatientList(updated);
    localStorage.setItem("patientList", JSON.stringify(updated));
    setFormData(initialFormState());
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(patientList[index]);
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (index) => {
    const updated = [...patientList];
    updated.splice(index, 1);
    setPatientList(updated);
    localStorage.setItem("patientList", JSON.stringify(updated));
  };

  return (
    <div style={{ background: "#f7f7fa", minHeight: "100vh" }}>
      <Navbar
        expand="lg"
        style={{
          background: "linear-gradient(90deg, #6a11cb,rgb(154, 120, 248))",
          padding: "15px 30px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Navbar.Brand
          style={{
            color: "white",
            fontSize: "26px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaHospitalAlt size={28} /> Sunrise Hospital
        </Navbar.Brand>
        <Nav className="mx-auto">
          <Nav.Link href="#" style={{ color: "white", fontSize: "18px" }}>
            Home
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link
            href="tel:+91234567890"
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <FaPhoneAlt /> +91 23456 7890
          </Nav.Link>
          <Nav.Link
            href="mailto:info@sunrisehospital.com"
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <FaEnvelope /> info@sunrisehospital.com
          </Nav.Link>
        </Nav>
      </Navbar>

      <Container style={{ padding: "40px 0", maxWidth: "1000px" }}>
        <Card
          style={{
            padding: 30,
            borderRadius: 16,
            marginBottom: 30,
            background: "#ffffff",
            boxShadow: "0 0 12px rgba(0,0,0,0.1)",
          }}
        >
          <h4 className="text-center mb-5" style={{ color: "#6a11cb" }}>
            {editingIndex !== null ? "✏️ Edit Patient" : "🏥 Add Patient Details"}
          </h4>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Patient ID *</Form.Label>
                  <Form.Control
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Patient Name *</Form.Label>
                  <Form.Control
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Gender * </Form.Label>
                  {["Male", "Female", "Other"].map((gender) => (
                    <Form.Check
                      inline
                      key={gender}
                      type="radio"
                      name="gender"
                      value={gender}
                      label={gender}
                      checked={formData.gender === gender}
                      onChange={handleChange}
                    />
                  ))}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Date of Birth *</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Contact No. *</Form.Label>
                  <Form.Control
                    name="contact1"
                    value={formData.contact1}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Blood Group *</Form.Label>
                  <Form.Select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option>A+</option>
                    <option>B+</option>
                    <option>AB+</option>
                    <option>O+</option>
                    <option>A-</option>
                    <option>B-</option>
                    <option>AB-</option>
                    <option>O-</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Emergency Contact</Form.Label>
                  <Form.Control
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              type="submit"
              className="mt-4 w-100"
              style={{ backgroundColor: "#6a11cb", border: "none" }}
            >
              {editingIndex !== null ? "Update Patient" : "Save Patient"}
            </Button>
          </Form>
        </Card>

        <h5 className="text-center mb-3" style={{ color: "#6a11cb" }}>
          🧾 Saved Patients
        </h5>
        <Row>
          {patientList.map((p, index) => (
            <Col md={6} key={index} className="mb-4">
              <Card
                style={{
                  borderLeft: "6px solid #6a11cb",
                  padding: 15,
                  borderRadius: 12,
                  background: "#fff9ff",
                  boxShadow: "0 0 10px rgba(0,0,0,0.06)",
                }}
              >
                <h6 style={{ color: "#6a11cb" }}>👤 {p.patientName}</h6>
                <p><strong>ID:</strong> {p.patientId}</p>
                <p><strong>Gender:</strong> {p.gender}</p>
                <p><strong>DOB:</strong> {p.dob}</p>
                <p><strong>Contact:</strong> {p.contact1}</p>
                <p><strong>Email:</strong> {p.email}</p>
                <p><strong>Blood Group:</strong> {p.bloodGroup}</p>

                <div className="d-flex justify-content-between">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEdit(index)}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                    style={{
                      borderColor: "#6a11cb",
                      color: hoverIndex === index ? "#fff" : "#6a11cb",
                      backgroundColor: hoverIndex === index ? "#6a11cb" : "transparent",
                      transition: "all 0.3s ease",
                    }}
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(index)}
                  >
                    🗑 Delete
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default PatientForm;
