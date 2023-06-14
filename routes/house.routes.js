const router = require("express").Router();
const House = require("../models/house.model");
const { validateToken } = require("../helpers/jwt");

router.post("/create", validateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    const { name } = req.body;

    const house = await House.create({
      name,
      userId,
    });

    res.status(201).json({ house });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Failed to create the house." });
  }
});

router.get("/getAllHouses", validateToken, async (req, res) => {
  try {
    const { userId } = req.user;

    const houses = await House.find({ userId });

    res.json({ houses });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch houses." });
  }
});

router.get("/houses/:houseId", validateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    const { houseId } = req.params;

    const house = await House.findOne({ _id: houseId, userId });

    if (!house) {
      return res.status(404).json({ error: "House not found." });
    }

    res.status(200).json({ house });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve house." });
  }
});

router.delete("/delete/:houseId", validateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    const { houseId } = req.params;

    // Find the house to be deleted and ensure it belongs to the user
    const house = await House.findOne({ _id: houseId, userId });

    if (!house) {
      return res.status(404).json({ error: "House not found." });
    }

    // Delete all devices associated with the house
    // await Device.deleteMany({ houseId });

    // Delete the house
    await House.deleteOne({ _id: houseId });

    res.status(200).json({ message: "House deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the house." });
  }
});

module.exports = router;
