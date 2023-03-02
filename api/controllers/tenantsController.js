const Tenant = require("../models/Tenant");

exports.index = async function (req, res) {
  const user = req.user;
  const tenants = await Tenant.find({ userId: user.id }).lean();
  res.json(tenants);
};
exports.getTenant = async function (req, res) {
  //const user = req.user;
  const tenantId = req.params.id;
  try {
    const tenant = await Tenant.findById(tenantId).populate("room").lean();
    res.json(tenant);
  } catch (e) {
    res.json({ error: e.msg });
  }
};
exports.create_tenant_POST = async function (req, res) {
  const tenantNumber = req.body.roomNumber;
  const baseRent = req.body.baseRent;
  const user = req.user;

  const tenant = new Tenant({
    tenantNumber,
    baseRent,
    userId: user.id,
    balance: 0,
  });

  try {
    await tenant.save();
    res.json({ error: null });
  } catch (e) {
    res.json({ error: e.msg });
  }
};
