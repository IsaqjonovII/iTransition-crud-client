import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

import "./style.css";
import { BASE_URI } from "constants";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    axios.post(`${BASE_URI}user/auth`, values).then(({ data }) => {
      if (data.status === 200) {
        toast.success(data.message);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        location.reload();
      } else {
        toast.error(data.message);
      }
    });
  };

  return (
    <div className="auth__container">
      <div className="form__container">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
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
          Don&apos;t have an account?
          <Link to="/register"> Create one here</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
