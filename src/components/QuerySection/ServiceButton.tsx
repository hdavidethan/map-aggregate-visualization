import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  setServiceUrl,
  setUsingExternalService,
} from "../../features/serviceConfiguration/serviceConfigurationSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

function ServiceButton() {
  const serviceConfiguration = useAppSelector(
    (state) => state.serviceConfiguration
  );
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [formExternalService, setFormExternalService] = useState(
    serviceConfiguration.usingExternalService
  );
  const [formServiceUrl, setFormServiceUrl] = useState(
    serviceConfiguration.serviceUrl
  );

  const handleClose = () => setShow(false);
  const handleSave = () => {
    dispatch(setUsingExternalService(formExternalService));
    dispatch(setServiceUrl(formServiceUrl));
    handleClose();
  };
  const handleShow = () => setShow(true);

  return (
    <div className="my-3">
      <Button variant="primary" size="sm" onClick={handleShow}>
        Configure Service
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Service Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Check
            type="checkbox"
            label="Enable External Service"
            checked={formExternalService}
            onClick={() => setFormExternalService(!formExternalService)}
            onChange={() => {}}
          />
          <Form.Label className="mt-3">Service URL</Form.Label>
          <Form.Control
            type="text"
            value={formServiceUrl}
            onChange={(e) => setFormServiceUrl(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ServiceButton;
