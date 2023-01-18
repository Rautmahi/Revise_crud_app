const express = require("express");
const { ClientModel } = require("../models/Client.model");

const clientRouter = express.Router();

clientRouter.get("/", (req, res) => {
  res.send("All Clients Data");
});

clientRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const newclient = new ClientModel(payload);
    await newclient.save();
    res.send("client Data Save Successfully");
  } catch (e) {
    res.send({ msg: "Something missing" });
    console.log(e);
  }
});

clientRouter.patch("/edit/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const client = await ClientModel.findOne({ _id: id });
  const userId_in_client = client.userId;
  const user_id_makingreq = req.body.userId;

  try {
    if (user_id_makingreq != userId_in_client) {
      res.send({ msg: "You are Not Authorized" });
    } else {
      await ClientModel.findByIdAndUpdate({ _id: id }, payload);
      res.send("Updated the client data");
    }
  } catch (e) {
    res.send({ msg: "something wrong" });
    console.log(e);
  }
});

clientRouter.delete("/delete/:id", async(req, res) => {
    const id = req.params.id;
    const client = await ClientModel.findOne({ _id: id });
    const userId_in_client = client.userId;
    const user_id_makingreq = req.body.userId;
  
    try {
      if (user_id_makingreq != userId_in_client) {
        res.send({ msg: "You are Not Authorized" });
      } else {
        await ClientModel.findByIdAndDelete({ _id: id });
        res.send("Deleted the client data");
      }
    } catch (e) {
      res.send({ msg: "something wrong" });
      console.log(e);
    }
});

module.exports = {
  clientRouter,
};
