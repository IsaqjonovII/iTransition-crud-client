import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

import { BASE_URI } from "constants";
import "./style.css";


const Register = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    axios.post(`${BASE_URI}user/auth/register`, values).then(({ data }) => {
      if ("user" in data) {
        toast.success(data.message);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        location.reload();
      } else {
        toast.error(data.message);
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="auth__container">
      <div className="form__container">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          onSubmitCapture={(e) => e.preventDefault()}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <p className="auth__link">
          Already have an account?
          <Link to="/"> Login </Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
