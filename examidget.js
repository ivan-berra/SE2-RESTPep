function examidget(ID){
  let examID = parseInt(ID);
  console.log("examidget received ID: ", examID);
  console.log("is it a number? ",Number.isInteger(examID));
  if(typeof examID === "number" && Number.isInteger(examID)){
    return 200;
  }
  else return 400;
}

module.exports = examidget;
