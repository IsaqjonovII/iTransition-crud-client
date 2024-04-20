import axios from "axios";
import { useState, useEffect } from "react";

import Table from "components/Table";
import { BASE_URI } from "constants";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(BASE_URI + "user").then(({ data }) => setUsers(data.users));
  }, []);

  return (
    <div>
      <Table data={users} />
    </div>
  );
};

export default Home;
