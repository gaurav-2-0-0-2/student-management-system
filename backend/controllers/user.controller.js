const db = require("../models/index");

async function fetchUsers(_, res) {
  try {
    const users = await db.User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json({ message: "success", users: users });
  } catch (err) {
    console.error(err);
  }
}

async function deleteUserById(req, res) {
  try {
    const { id } = req.params;
    await db.User.destroy({ where: { id: id } });
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
  }
}

async function deleteAllUsers(_, res) {
  try {
    await db.User.destroy({ where: {} });
    res.json({ message: "All users deleted" });
  } catch (err) {
    console.error(err);
  }
}

async function updateUserById(req, res) {
  try {
    const { id } = req.params;
    const { updatedData } = req.body;

    const [rowsUpdated] = await db.User.update(updatedData, {
      where: { id: id },
    });
    if (rowsUpdated === 0) {
      return res
        .status(400)
        .json({ message: "No rows updated. Invalid ID or data." });
    }

    res.json({ message: "User updated successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { fetchUsers, deleteUserById, deleteAllUsers, updateUserById };
