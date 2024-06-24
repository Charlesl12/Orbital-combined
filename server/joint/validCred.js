module.exports = (request, resp, next) => {
    const {email, name, password} = request.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (request.path === "/register") {
      if (![email, name, password].every(Boolean)) {
        return resp.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return resp.status(401).json("Invalid Email");
      }
    } else if (request.path === "/login") {
      if (![email, password].every(Boolean)) {
        return resp.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return resp.status(401).json("Invalid Email");
      }
    }
    
    next();
  };