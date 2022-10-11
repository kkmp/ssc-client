import jwtDecode from "jwt-decode";

const getToken = () => {
    // var excetpions = ["/login", "/changePassword/useCode/:code"];
    // if (excetpions.indexOf(window.location.pathname) > -1) {
    //   return;
    // }

    const tokenRead = localStorage.getItem("token");

    if (tokenRead == null || tokenRead === "") {
      window.location = "/login"
    }
    else {
      var dateNow = new Date();
      var decodedToken = jwtDecode(tokenRead, { complete: true });
      if (decodedToken.exp >= dateNow.getTime()) {
        localStorage.removeItem("token");
        window.location = "/login"
      }
      return tokenRead
    }
}

export default getToken;