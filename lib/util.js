const removeExt = name => {
  return name.substring(0, name.lastIndexOf("."));
};

const getExt = name => {
  return name.substring(name.lastIndexOf("."), name.length);
};

const zip = (keys, values) => {
  let json = {};
  for (let i = 0; i < keys.length; i++) {
    json[keys[i]] = values[i];
  }
  return json;
};

module.exports = {
  removeExt,
  zip,
  getExt
};
