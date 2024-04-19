import { Button } from "antd";
import axios from "axios";

import { BASE_URI } from "constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { customToast } from "utils";

const Home = () => {
  const navigate = useNavigate();

  function handleUserDelete() {
    try {
      const { _id } = JSON.parse(sessionStorage.getItem("user"));
      axios
        .delete(`${BASE_URI}user?id=${_id}`)
        .then(({ data }) => {
          if (data.status === 404) {
            toast.error(data.message);
          } else {
            customToast("ok", data.message);
            navigate("/register");
            sessionStorage.removeItem("user");
            setTimeout(() => location.reload(), 1000);
          }
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button onClick={handleUserDelete} type="primary" danger>
        Delete
      </Button>
    </div>
  );
};

export default Home;
