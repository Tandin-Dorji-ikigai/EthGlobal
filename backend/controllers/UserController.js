const User = require('./../models/User')

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ data: users, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json({ data: user, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json({ data: user, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};



exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.json({ data: user, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
