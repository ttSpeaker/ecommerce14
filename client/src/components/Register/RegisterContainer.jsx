import { useState } from "react";
import RegisterComponent from "./RegisterComponent.jsx";
import { BACK_URL } from "../../config/configs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterContainer() {
  const [isSubmitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const submit = async (values) => {
    try {
      setSubmitting(true);
      const result = await axios.post(BACK_URL + "/auth/register", values);
      setSubmitting(false);
      navigate("/login");
    } catch (error) {
      setSubmitting(false);
      alert(error.message);
    }
  };
  return <RegisterComponent submit={submit} isSubmitting={isSubmitting} />;
}
