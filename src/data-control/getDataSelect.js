import request from "../components/Request";

const getDataSelect = async (url) => {
  var arr = [];
  const callback = (response) => {
    response.data.map((item) => arr.push({ value: item.id, label: item.name }));
  };
  await request({ url: url, type: "GET" }, callback);
  return arr;
};

export default getDataSelect;
